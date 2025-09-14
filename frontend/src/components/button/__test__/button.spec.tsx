import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Button from '../button';
import { ButtonProps } from '../types';
import userEvent from '@testing-library/user-event';

vi.mock('~/components/iconify/iconify', () => ({
  default: ({ icon, width, 'data-testid': testId }: any) => (
    <div data-testid={testId || `iconify-${icon}`} data-width={width} />
  ),
}));

describe('Button Component', () => {
  const defaultProps: ButtonProps = { children: 'Button' };

  const renderButton = (props: Partial<ButtonProps> = {}) => {
    return render(<Button {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('renders without loading', () => {
      renderButton();
      expect(screen.queryByTestId('button')).toBeInTheDocument();
      expect(
        screen.queryByTestId('button-loading-indicator')
      ).not.toBeInTheDocument();
    });

    it('renders with loading', () => {
      renderButton({ loading: true });
      expect(screen.queryByTestId('button')).toBeInTheDocument();
      expect(
        screen.getByTestId('button-loading-indicator')
      ).toBeInTheDocument();
    });
  });

  describe('Button Functionality', () => {
    it('should call onClick', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      renderButton({ onClick: mockOnClick });

      const button = screen.getByTestId('button');

      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      renderButton({ onClick: mockOnClick, disabled: true });

      const button = screen.getByTestId('button');

      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(0);
    });
  });
});
