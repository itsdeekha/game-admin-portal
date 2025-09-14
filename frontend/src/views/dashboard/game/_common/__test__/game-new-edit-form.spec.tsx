import { useNavigate } from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockedFunction,
} from 'vitest';
import { paths } from '~/routes/paths';
import { createGame, updateGame } from '~/services/game';
import { mockGameResDto } from '~/services/game/__test__/game.service.fixture';
import { genUploadPresignedUrl, uploadFileToS3 } from '~/services/upload';
import { mockPresignedData } from '~/services/upload/__test__/upload.service.fixture';
import { validateImageFile } from '~/utils/file.util';
import GameNewEditForm from '../game-new-edit-form';
import { CustomFile } from '../use-create-edit-game';

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('~/services/game', () => ({
  createGame: vi.fn(),
  updateGame: vi.fn(),
}));

vi.mock('~/services/upload', () => ({
  genUploadPresignedUrl: vi.fn(),
  uploadFileToS3: vi.fn(),
}));

vi.mock('~/utils/file.util', () => ({
  validateImageFile: vi.fn(),
}));

vi.mock('~/components/button', () => ({
  Button: ({ children, loading, type, ...props }: any) => (
    <button type={type} disabled={loading} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  ),
}));

vi.mock('~/components/container', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock URL.createObjectURL and revokeObjectURL
const mockCreateObjectURL = vi.fn();
const mockRevokeObjectURL = vi.fn();
Object.defineProperty(window.URL, 'createObjectURL', {
  value: mockCreateObjectURL,
});
Object.defineProperty(window.URL, 'revokeObjectURL', {
  value: mockRevokeObjectURL,
});

// Mock alert
vi.stubGlobal('alert', vi.fn());

const mockedNavigate = useNavigate as MockedFunction<typeof useNavigate>;
const mockedCreateGame = createGame as MockedFunction<typeof createGame>;
const mockedUpdateGame = updateGame as MockedFunction<typeof updateGame>;
const mockedGenUploadPresignedUrl = genUploadPresignedUrl as MockedFunction<
  typeof genUploadPresignedUrl
>;
const mockedUploadFileToS3 = uploadFileToS3 as MockedFunction<
  typeof uploadFileToS3
>;
const mockedValidateImageFile = validateImageFile as MockedFunction<
  typeof validateImageFile
>;

describe('GameNewEditForm', () => {
  const mockNavigate = vi.fn();

  const createMockFile = (
    name = 'test.jpg',
    type = 'image/jpeg'
  ): CustomFile => {
    const file = new File(['test content'], name, { type }) as CustomFile;
    file.preview = `blob:mock-url-${name}`;
    return file;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedNavigate.mockReturnValue(mockNavigate);
    mockCreateObjectURL.mockReturnValue('blob:mock-url');
    mockedValidateImageFile.mockReturnValue(null); // No validation error by default
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Rendering', () => {
    it('should render form in create mode when no game provided', () => {
      render(<GameNewEditForm />);

      expect(screen.getByTestId('input-name')).toBeInTheDocument();
      expect(screen.getByTestId('input-title')).toBeInTheDocument();
      expect(screen.getByTestId('input-category')).toBeInTheDocument();
      expect(screen.getByTestId('input-provider')).toBeInTheDocument();
      expect(screen.getByTestId('input-description')).toBeInTheDocument();
      expect(screen.getByTestId('input-gameUrl')).toBeInTheDocument();
      expect(screen.getByLabelText('Game Image')).toBeInTheDocument();
      expect(screen.getByText('Create Game')).toBeInTheDocument();
    });

    it('should display existing image preview when editing game with image', () => {
      render(<GameNewEditForm game={mockGameResDto} />);

      const imagePreview = screen.queryByAltText('Game preview');

      expect(imagePreview).toBeInTheDocument();
    });
  });

  describe('File Upload Handling', () => {
    it('should clear file input when validation fails', async () => {
      const user = userEvent.setup();
      mockedValidateImageFile.mockReturnValue('Invalid file');

      render(<GameNewEditForm />);

      const mockFile = createMockFile();
      const fileInput = screen.getByLabelText('Game Image') as HTMLInputElement;

      await user.upload(fileInput, mockFile);

      await waitFor(() => {
        expect(fileInput.value).toBe('');
      });
    });
  });

  describe('Form Submission - Create Game', () => {
    it('should create game successfully with image upload', async () => {
      const user = userEvent.setup();

      mockedGenUploadPresignedUrl.mockResolvedValue(mockPresignedData);
      mockedUploadFileToS3.mockResolvedValue(mockPresignedData.fileUrl);
      mockedCreateGame.mockResolvedValue(mockGameResDto);

      render(<GameNewEditForm />);

      // Fill form fields
      await user.type(screen.getByTestId('input-name'), 'New Game');
      await user.type(screen.getByTestId('input-title'), 'New Game Title');
      await user.type(screen.getByTestId('input-category'), 'Action');
      await user.type(screen.getByTestId('input-provider'), 'Provider');
      await user.type(screen.getByTestId('input-description'), 'Description');
      await user.type(
        screen.getByTestId('input-gameUrl'),
        'https://example.com/game'
      );

      // Upload image
      const mockFile = createMockFile();
      const fileInput = screen.getByLabelText('Game Image');
      await user.upload(fileInput, mockFile);

      // Submit form
      const submitButton = screen.getByText('Create Game');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockedGenUploadPresignedUrl).toHaveBeenCalledWith({
          filename: mockFile.name,
          mimetype: mockFile.type,
          filesize: mockFile.size,
        });
      });

      expect(mockedUploadFileToS3).toHaveBeenCalledWith(
        mockFile,
        mockPresignedData
      );

      expect(mockedCreateGame).toHaveBeenCalledWith({
        name: 'New Game',
        title: 'New Game Title',
        category: 'Action',
        provider: 'Provider',
        description: 'Description',
        gameUrl: 'https://example.com/game',
        imageUrl: mockPresignedData.fileUrl,
      });

      expect(window.alert).toHaveBeenCalledWith('Create success!');
      expect(mockNavigate).toHaveBeenCalledWith({
        to: paths.dashboard.game.root,
      });
    });
  });

  describe('Form Submission - Update Game', () => {
    it('should update game successfully with new image', async () => {
      const user = userEvent.setup();

      mockedGenUploadPresignedUrl.mockResolvedValue(mockPresignedData);
      mockedUploadFileToS3.mockResolvedValue(mockPresignedData.fileUrl);
      mockedUpdateGame.mockResolvedValue({
        ...mockGameResDto,
        imageUrl: mockPresignedData.fileUrl,
      });

      render(<GameNewEditForm game={mockGameResDto} />);

      // Upload new image
      const mockFile = createMockFile('new-image.jpg');
      const fileInput = screen.getByLabelText('Game Image');
      await user.upload(fileInput, mockFile);

      // Submit form
      const submitButton = screen.getByText('Save Changes');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockedUpdateGame).toHaveBeenCalledWith({
          id: mockGameResDto.id,
          name: mockGameResDto.name,
          title: mockGameResDto.title,
          category: mockGameResDto.category,
          provider: mockGameResDto.provider,
          description: mockGameResDto.description,
          gameUrl: mockGameResDto.gameUrl,
          imageUrl: mockPresignedData.fileUrl,
        });
      });

      expect(window.alert).toHaveBeenCalledWith('Update success!');
    });

    it('should update game without changing image when no new file selected', async () => {
      const user = userEvent.setup();
      mockedUpdateGame.mockResolvedValue(mockGameResDto);

      render(<GameNewEditForm game={mockGameResDto} />);

      const submitButton = screen.getByText('Save Changes');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockedUpdateGame).toHaveBeenCalledWith({
          id: mockGameResDto.id,
          name: mockGameResDto.name,
          title: mockGameResDto.title,
          category: mockGameResDto.category,
          provider: mockGameResDto.provider,
          description: mockGameResDto.description,
          gameUrl: mockGameResDto.gameUrl,
          imageUrl: mockGameResDto.imageUrl,
        });
      });

      expect(mockedGenUploadPresignedUrl).not.toHaveBeenCalled();
      expect(mockedUploadFileToS3).not.toHaveBeenCalled();
    });
  });
});
