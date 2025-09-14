import { useSearch } from '@tanstack/react-router';
import { act, renderHook } from '@testing-library/react';
import { FormState, useForm } from 'react-hook-form';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { authAction } from '~/auth/context';
import { setSession } from '~/auth/context/utils';
import { useAuthContext } from '~/auth/hooks';
import { AuthActionType } from '~/auth/types';
import { useBoolean } from '~/hooks/use-boolean';
import { Role } from '~/models/user.model';
import { signIn } from '~/services/auth';
import useSignIn from '../use-sign-in';

vi.mock('@hookform/resolvers/yup', () => ({
  yupResolver: vi.fn((schema) => ({ schema, resolver: 'yup-resolver' })),
}));

vi.mock('@tanstack/react-router', () => ({
  useSearch: vi.fn(),
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

vi.mock('yup', () => ({
  object: vi.fn(() => ({
    shape: vi.fn((obj) => obj),
  })),
  string: vi.fn(() => ({
    required: vi.fn().mockReturnThis(),
    email: vi.fn().mockReturnThis(),
  })),
}));

vi.mock('~/auth/context', () => ({
  authAction: {
    signIn: vi.fn(),
  },
}));

vi.mock('~/auth/context/utils', () => ({
  setSession: vi.fn(),
}));

vi.mock('~/auth/hooks', () => ({
  useAuthContext: vi.fn(),
}));

vi.mock('~/configs/global.config', () => ({
  PATH_AFTER_LOGIN: '/dashboard',
}));

vi.mock('~/hooks/use-boolean', () => ({
  useBoolean: vi.fn(),
}));

vi.mock('~/services/auth', () => ({
  signIn: vi.fn(),
}));

describe('useSignIn Hook', () => {
  const mockDispatch = vi.fn();
  const mockReset = vi.fn();
  const mockHandleSubmit = vi.fn();
  const mockPasswordBoolean = {
    value: false,
    onToggle: vi.fn(),
    onTrue: vi.fn(),
    onFalse: vi.fn(),
    setValue: vi.fn(),
  };

  const mockFormState = {
    isSubmitting: false,
    isDirty: false,
    isLoading: false,
    isSubmitted: false,
    isSubmitSuccessful: false,
    isValidating: false,
    isValid: false,
    disabled: false,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    isReady: false,
    errors: {},
  } as FormState<any>;

  const mockFormMethods = {
    register: vi.fn(),
    handleSubmit: mockHandleSubmit,
    formState: mockFormState,
    reset: mockReset,
    setValue: vi.fn(),
    getValues: vi.fn(),
    watch: vi.fn(),
    control: {} as any,
    trigger: vi.fn(),
    clearErrors: vi.fn(),
    setError: vi.fn(),
    getFieldState: vi.fn(),
    resetField: vi.fn(),
    unregister: vi.fn(),
    setFocus: vi.fn(),
    subscribe: vi.fn(),
  };

  const mockedUser = {
    id: 1,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: Role.SuperAdmin,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockLocationHref = vi.fn();
  Object.defineProperty(window, 'location', {
    value: {
      set href(url) {
        mockLocationHref(url);
      },
      get href() {
        return '/current-url';
      },
    },
    writable: true,
  });

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mocks
    vi.mocked(useSearch).mockReturnValue({});
    vi.mocked(useAuthContext).mockReturnValue({
      dispatch: mockDispatch,
      user: null,
      authenticated: false,
      initialized: false,
    });
    vi.mocked(useBoolean).mockReturnValue(mockPasswordBoolean);
    vi.mocked(useForm).mockReturnValue(mockFormMethods);
    vi.mocked(authAction.signIn).mockReturnValue({
      type: AuthActionType.SIGN_IN,
      payload: {
        user: mockedUser,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Submission - Success Flow', () => {
    const mockSignInData = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockSignInResponse = {
      accessToken: 'mock-token-123',
      user: mockedUser,
    };

    beforeEach(() => {
      vi.mocked(signIn).mockResolvedValue(mockSignInResponse);
    });

    it('handles successful sign in without returnTo', async () => {
      vi.mocked(useSearch).mockReturnValue({});

      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.onSubmit(mockSignInData);
      });

      expect(signIn).toHaveBeenCalledWith(mockSignInData);
      expect(setSession).toHaveBeenCalledWith('mock-token-123');
      expect(mockLocationHref).toHaveBeenCalledWith('/dashboard');
    });
  });

  describe('Form Submission - Error Handling', () => {
    const mockSignInData = {
      email: 'wrong@example.com',
      password: 'wrongpassword',
    };

    it('handles API error with string message', async () => {
      const errorMessage = 'Invalid credentials';
      vi.mocked(signIn).mockRejectedValue(errorMessage);

      const { result } = renderHook(() => useSignIn());

      await act(async () => {
        await result.current.onSubmit(mockSignInData);
      });

      expect(result.current.errorMsg).toBe(errorMessage);
      expect(mockReset).toHaveBeenCalledTimes(1);
      expect(setSession).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(mockLocationHref).not.toHaveBeenCalled();
    });
  });
});
