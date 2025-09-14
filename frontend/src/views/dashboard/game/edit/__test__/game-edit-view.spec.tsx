import { useNavigate, useParams } from '@tanstack/react-router';
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
import { getGame } from '~/services/game';
import { mockGameResDto } from '~/services/game/__test__/game.service.fixture';
import GameEditView from '../view';

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('~/services/game', () => ({
  getGame: vi.fn(),
}));

vi.mock('~/components/container', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
const mockedUseNavigate = useNavigate as MockedFunction<typeof useNavigate>;
const mockedUseParams = useParams as MockedFunction<typeof useParams>;
const mockedGetGame = getGame as MockedFunction<typeof getGame>;

describe('GameEditView', () => {
  const mockNavigate = vi.fn();
  const mockUseBoolean = {
    value: true,
    onToggle: vi.fn(),
    onTrue: vi.fn(),
    onFalse: vi.fn(),
    setValue: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseNavigate.mockReturnValue(mockNavigate);
    mockedUseParams.mockReturnValue({ id: 1 });
    vi.doMock('~/hooks/use-boolean', () => ({
      useBoolean: () => mockUseBoolean,
    }));
  });

  afterEach(() => {
    consoleSpy.mockClear();
  });

  describe('Error State', () => {
    it('should show error message when API call fails', async () => {
      const errorMessage = 'Failed to fetch game';
      mockedGetGame.mockRejectedValue(new Error(errorMessage));

      render(<GameEditView />);

      await waitFor(() => {
        expect(screen.getByText('Failed to load game')).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    it('should show generic error message for non-Error exceptions', async () => {
      mockedGetGame.mockRejectedValue('String error');

      render(<GameEditView />);

      await waitFor(() => {
        expect(
          screen.getByText('Failed to fetch game data')
        ).toBeInTheDocument();
      });
    });

    it('should show error when game ID is missing', async () => {
      mockedUseParams.mockReturnValue({ id: undefined });

      render(<GameEditView />);

      await waitFor(() => {
        expect(screen.getByText('Game ID is required')).toBeInTheDocument();
      });
    });

    it('should log error to console when fetch fails', async () => {
      const error = new Error('API Error');
      mockedGetGame.mockRejectedValue(error);

      render(<GameEditView />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching game:', error);
      });
    });

    it('should show Try again and Back to list buttons on error', async () => {
      mockedGetGame.mockRejectedValue(new Error('API Error'));

      render(<GameEditView />);

      await waitFor(() => {
        expect(screen.getByText('Try again')).toBeInTheDocument();
        expect(screen.getByText('Back to list')).toBeInTheDocument();
      });
    });
  });

  describe('Success State', () => {
    it('should render game form when game data is loaded successfully', async () => {
      mockedGetGame.mockResolvedValue(mockGameResDto);

      render(<GameEditView />);

      await waitFor(() => {
        const nameInputEl = screen.getByTestId('input-name');
        const titleInputEl = screen.getByTestId('input-title');
        const categoryInputEl = screen.getByTestId('input-category');
        const providerInputEl = screen.getByTestId('input-provider');
        const descriptionInputEl = screen.getByTestId('input-description');
        expect(screen.getByTestId('form-provider')).toBeInTheDocument();
        expect(nameInputEl).toBeInTheDocument();
        expect(nameInputEl).toHaveValue(mockGameResDto.name);
        expect(titleInputEl).toBeInTheDocument();
        expect(titleInputEl).toHaveValue(mockGameResDto.title);
        expect(categoryInputEl).toBeInTheDocument();
        expect(categoryInputEl).toHaveValue(mockGameResDto.category);
        expect(providerInputEl).toBeInTheDocument();
        expect(providerInputEl).toHaveValue(mockGameResDto.provider);
        expect(descriptionInputEl).toBeInTheDocument();
        expect(descriptionInputEl).toHaveValue(mockGameResDto.description);
      });
    });
  });

  describe('User Interactions', () => {
    it('should call fetchGame when retry button is clicked', async () => {
      const user = userEvent.setup();
      mockedGetGame
        .mockRejectedValueOnce(new Error('First error'))
        .mockResolvedValueOnce(mockGameResDto);

      render(<GameEditView />);

      // Wait for error state
      await waitFor(() => {
        expect(screen.getByText('Try again')).toBeInTheDocument();
      });

      const retryButton = screen.getByText('Try again');
      await user.click(retryButton);

      // Should call getGame again
      await waitFor(() => {
        expect(mockedGetGame).toHaveBeenCalledTimes(2);
      });
    });

    it('should navigate to game list when header back button clicked', async () => {
      const user = userEvent.setup();
      mockedGetGame.mockResolvedValue(mockGameResDto);

      render(<GameEditView />);

      await waitFor(() => {
        expect(screen.getByText('← Back to list')).toBeInTheDocument();
      });

      const headerBackButton = screen.getByText('← Back to list');
      await user.click(headerBackButton);

      expect(mockNavigate).toHaveBeenCalledWith({
        to: paths.dashboard.game.root,
      });
    });
  });
});
