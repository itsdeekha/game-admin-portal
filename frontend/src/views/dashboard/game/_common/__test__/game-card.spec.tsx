import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Game } from '~/models/game.model';
import GameCard, { GameCardProps } from '../game-card';

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, className }: any) => (
    <a href={to} className={className} data-testid="router-link">
      {children}
    </a>
  ),
}));

vi.mock('~/components/iconify', () => ({
  default: ({ icon, width, 'data-testid': testId }: any) => (
    <div data-testid={testId || `iconify-${icon}`} data-width={width} />
  ),
}));

vi.mock('~/routes/paths', () => ({
  paths: {
    dashboard: {
      game: {
        edit: (id: number) => `/dashboard/game/${id}/edit`,
      },
    },
  },
}));

describe('GameCard', () => {
  const createMockGame = (overrides: Partial<Game> = {}): Game => ({
    id: 1,
    name: 'Candy Crush Saga',
    title: 'Sweet Match-3 Puzzle Adventure',
    category: 'Puzzle',
    provider: 'King Digital Entertainment',
    description: 'Description',
    imageUrl: 'https://placehold.co/400x200?text=Game+Image',
    gameUrl: 'https://king.com/game/candycrushsaga',
    createdAt: '2025-09-13T21:41:16.100Z',
    updatedAt: '2025-09-13T21:41:16.100Z',
    ...overrides,
  });

  const defaultProps: GameCardProps = {
    game: createMockGame(),
    deleting: false,
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Game Information Rendering', () => {
    it('should render all game information correctly', () => {
      const game = createMockGame();
      render(<GameCard {...defaultProps} game={game} />);

      expect(screen.getByText(game.name)).toBeInTheDocument();
      expect(screen.getByText(game.title)).toBeInTheDocument();
      expect(screen.getByText(game.category)).toBeInTheDocument();
      expect(screen.getByText(game.provider)).toBeInTheDocument();
      expect(screen.getByText(game.description)).toBeInTheDocument();

      const image = screen.getByAltText(game.name);
      expect(image).toHaveAttribute('src', game.imageUrl);
    });
  });

  describe('Conditional Rendering Logic', () => {
    it('should show fallback image when imageUrl is falsy', () => {
      const game = createMockGame({
        imageUrl: '',
      });
      render(<GameCard {...defaultProps} game={game} />);

      const image = screen.getByAltText(game.name);
      expect(image).toHaveAttribute(
        'src',
        'https://placehold.co/400x200?text=Game+Image'
      );
    });
  });

  describe('User Interactions', () => {
    it('should render edit button with correct link', () => {
      const game = createMockGame({ id: 123 });
      render(<GameCard {...defaultProps} game={game} />);

      const editLink = screen.getByTestId('router-link');
      expect(editLink).toHaveAttribute('href', '/dashboard/game/123/edit');

      const editButton = screen.getByTitle('Edit Game');
      expect(editButton).toBeInTheDocument();
      expect(editButton.tagName).toBe('BUTTON');
    });

    it('should call onDelete when delete button is clicked', async () => {
      const user = userEvent.setup();
      const onDeleteMock = vi.fn().mockResolvedValue(void 0);
      const game = createMockGame();

      render(
        <GameCard {...defaultProps} game={game} onDelete={onDeleteMock} />
      );

      const deleteButton = screen.getByTitle('Delete Game');
      await user.click(deleteButton);

      expect(onDeleteMock).toHaveBeenCalledWith(game);
      expect(onDeleteMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Component Props Validation', () => {
    it('should handle boolean deleting prop correctly', () => {
      const game = createMockGame();

      const { rerender } = render(<GameCard game={game} deleting={true} />);

      expect(
        screen.getByTestId('button-loading-indicator')
      ).toBeInTheDocument();

      rerender(<GameCard game={game} deleting={false} />);

      expect(
        screen.queryByTestId('button-loading-indicator')
      ).not.toBeInTheDocument();
      expect(
        screen.getByTestId('iconify-solar:trash-bin-2-outline')
      ).toBeInTheDocument();
    });
  });
});
