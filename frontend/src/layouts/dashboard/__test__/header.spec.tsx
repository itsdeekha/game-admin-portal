import { useNavigate } from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authAction } from '~/auth/context';
import { useAuthContext } from '~/auth/hooks';
import { AuthActionType } from '~/auth/types';
import Header, { HeaderProps } from '../header';

vi.mock('~/components/iconify/iconify', () => ({
  default: ({ icon, width, 'data-testid': testId }: any) => (
    <div data-testid={testId || `iconify-${icon}`} data-width={width} />
  ),
}));

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('~/auth/context', () => ({
  authAction: {
    signOut: vi.fn(),
  },
}));

vi.mock('~/auth/hooks', () => ({
  useAuthContext: vi.fn(),
}));

describe('Header Component', () => {
  const mockNavigate = vi.fn();
  const mockDispatch = vi.fn();
  const defaultProps: HeaderProps = {};

  const renderHeader = (props: Partial<HeaderProps> = {}) => {
    return render(<Header {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useAuthContext).mockReturnValue({
      dispatch: mockDispatch,
      user: null,
      authenticated: false,
      initialized: false,
    });
    vi.mocked(authAction.signOut).mockReturnValue({
      type: AuthActionType.SIGN_OUT,
    });
  });

  describe('Component Structure', () => {
    it('renders with correct test IDs', () => {
      renderHeader();

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('header-menu-button')).toBeInTheDocument();
      expect(screen.getByTestId('header-signout-button')).toBeInTheDocument();
      expect(screen.getByTestId('header-menu-icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-header-class';
      renderHeader({ className: customClass });

      const header = screen.getByTestId('header');
      expect(header).toHaveClass(customClass);
    });

    it('has proper ARIA labels', () => {
      renderHeader();

      const menuButton = screen.getByTestId('header-menu-button');
      const signoutBtn = screen.getByTestId('header-signout-button');

      expect(menuButton).toHaveAttribute('aria-label', 'Open navigation menu');
      expect(signoutBtn).toHaveAttribute(
        'aria-label',
        'Signout from application'
      );
    });
  });

  describe('Menu Button Functionality', () => {
    it('calls onOpenNav when clicked', async () => {
      const user = userEvent.setup();
      const mockOnOpenNav = vi.fn();

      renderHeader({ onOpenNav: mockOnOpenNav });

      const menuButton = screen.getByTestId('header-menu-button');
      await user.click(menuButton);

      expect(mockOnOpenNav).toHaveBeenCalledTimes(1);
    });

    it('handles missing onOpenNav gracefully', async () => {
      const user = userEvent.setup();

      renderHeader();

      const menuButton = screen.getByTestId('header-menu-button');

      await expect(user.click(menuButton)).resolves.not.toThrow();
    });
  });
});
