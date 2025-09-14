import { Button } from '~/components/button';
import FormProvider, { RHFTextField } from '~/components/hook-form';
import Iconify from '~/components/iconify';
import useSignIn from './use-sign-in';

export default function SignInView() {
  const { methods, onSubmit, isSubmitting, handleSubmit, password, errorMsg } =
    useSignIn();

  return (
    <div className="bg-gray-100 rounded-2xl shadow-lg py-10 px-8 max-w-md w-full">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Sign in to Admin
          </h1>
        </div>

        <div className="space-y-5">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {errorMsg}
              </div>
            </div>
          )}

          <RHFTextField
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
          />

          <RHFTextField
            name="password"
            label="Password"
            type={password.value ? 'text' : 'password'}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <button
                  type="button"
                  role="button"
                  onClick={password.onToggle}
                  className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                    width={20}
                    data-testid={
                      password.value
                        ? 'iconify-solar:eye-bold'
                        : 'iconify-solar:eye-closed-bold'
                    }
                  />
                </button>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            loading={isSubmitting}
            data-testid="loading-button"
          >
            Login
          </Button>
        </div>
      </FormProvider>
    </div>
  );
}
