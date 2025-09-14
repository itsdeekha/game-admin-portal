import { cleanup, render, RenderOptions, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useSignIn from '../use-sign-in';
import SignInView from '../view';

function renderSignInComponent(ui: ReactElement, options: RenderOptions = {}) {
  return render(ui, { ...options });
}

vi.mock('../use-sign-in');
vi.mock('~/components/button', () => ({
  Button: ({ children, loading, ...props }: any) => (
    <button {...props} disabled={loading} data-testid="loading-button">
      {loading ? 'Loading...' : children}
    </button>
  ),
}));

vi.mock('~/components/hook-form', () => ({
  default: ({ children, onSubmit }: any) => (
    <form onSubmit={onSubmit} data-testid="form-provider">
      {children}
    </form>
  ),
  RHFTextField: ({ name, label, type, InputProps }: any) => (
    <div data-testid={`rhf-textfield-${name}`}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} data-testid={`input-${name}`} />
      {InputProps?.endAdornment && (
        <div data-testid={`${name}-end-adornment`}>
          {InputProps.endAdornment}
        </div>
      )}
    </div>
  ),
}));

vi.mock('~/components/iconify', () => ({
  default: ({ icon, width }: any) => (
    <div data-testid={`iconify-${icon}`} data-width={width} />
  ),
}));

describe('SignInView Component', () => {
  const mockPasswordToggle = {
    value: false,
    onToggle: vi.fn(),
    onTrue: vi.fn(),
    onFalse: vi.fn(),
    setValue: vi.fn(),
  };

  const defaultUseSignInReturn = {
    methods: { register: vi.fn() },
    onSubmit: vi.fn(),
    isSubmitting: false,
    handleSubmit: vi.fn((fn) => fn),
    errorMsg: '',
    password: mockPasswordToggle,
  };

  const renderSignInView = () => {
    return renderSignInComponent(<SignInView />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
    const mockUseSignIn = vi.fn();
    mockUseSignIn.mockReturnValue(defaultUseSignInReturn);
    vi.mocked(useSignIn).mockImplementation(mockUseSignIn);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('renders sign in form with correct title', () => {
      renderSignInView();

      expect(screen.getByText('Sign in to Admin')).toBeInTheDocument();
      expect(screen.getByTestId('form-provider')).toBeInTheDocument();
    });

    it('renders email and password fields', () => {
      renderSignInView();

      expect(screen.getByTestId('rhf-textfield-email')).toBeInTheDocument();
      expect(screen.getByTestId('rhf-textfield-password')).toBeInTheDocument();

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      renderSignInView();

      const submitButton = screen.getByTestId('loading-button');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Login');
    });
  });

  describe('Error Message Display', () => {
    it('does not show error message when errorMsg is empty', () => {
      renderSignInView();

      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    it('displays error icon with error message', () => {
      const mockUseSignIn = vi.fn();
      mockUseSignIn.mockReturnValue({
        ...defaultUseSignInReturn,
        errorMsg: 'Login failed',
      });
      vi.mocked(useSignIn).mockImplementation(mockUseSignIn);

      renderSignInView();

      const errorSvg = screen
        .getByText('Login failed')
        .parentElement?.querySelector('svg');
      expect(errorSvg).toBeInTheDocument();
    });
  });

  describe('Password Field', () => {
    it('shows password field as password type when password.value is false', () => {
      renderSignInView();

      const passwordInput = screen.getByTestId('input-password');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('shows password field as text type when password.value is true', () => {
      const mockUseSignIn = vi.fn();
      mockUseSignIn.mockReturnValue({
        ...defaultUseSignInReturn,
        password: {
          ...mockPasswordToggle,
          value: true,
        },
      });
      vi.mocked(useSignIn).mockImplementation(mockUseSignIn);

      renderSignInView();

      const passwordInput = screen.getByTestId('input-password');
      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    it('renders password toggle button', () => {
      renderSignInView();

      const toggleButton = screen.getByTestId('password-end-adornment');
      expect(toggleButton).toBeInTheDocument();
    });

    it('shows closed eye icon when password is hidden', () => {
      renderSignInView();

      expect(
        screen.getByTestId('iconify-solar:eye-closed-bold')
      ).toBeInTheDocument();
    });

    it('shows open eye icon when password is visible', () => {
      const mockUseSignIn = vi.fn();
      mockUseSignIn.mockReturnValue({
        ...defaultUseSignInReturn,
        password: {
          ...mockPasswordToggle,
          value: true,
        },
      });
      vi.mocked(useSignIn).mockImplementation(mockUseSignIn);

      renderSignInView();

      expect(screen.getByTestId('iconify-solar:eye-bold')).toBeInTheDocument();
    });

    it('calls password.onToggle when toggle button is clicked', async () => {
      const user = userEvent.setup();

      renderSignInView();

      const endAdornments = screen.getAllByTestId('password-end-adornment');
      expect(endAdornments).toHaveLength(1);
      const toggleButton = endAdornments[0].querySelector('button');

      await user.click(toggleButton!);
      expect(mockPasswordToggle.onToggle).toHaveBeenCalledTimes(1);
    });
  });
});
