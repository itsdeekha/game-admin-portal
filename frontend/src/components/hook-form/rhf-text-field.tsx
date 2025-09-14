import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface RHFTextFieldProps
  extends Omit<ComponentPropsWithRef<'input'>, 'name'> {
  name: string;
  label?: string;
  error?: boolean;
  InputProps?: {
    endAdornment?: ReactNode;
    startAdornment?: ReactNode;
  };
}

const RHFTextField = forwardRef<HTMLInputElement, RHFTextFieldProps>(
  (
    { name, label, type = 'text', className = '', InputProps, ...other },
    ref
  ) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="w-full" data-testid={`rhf-textfield-${name}`}>
            {label && (
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
            )}

            <div className="relative">
              {InputProps?.startAdornment && (
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-testid={`${name}-start-adornment`}
                >
                  {InputProps.startAdornment}
                </div>
              )}

              <input
                {...field}
                ref={ref}
                id={name}
                type={type}
                value={
                  type === 'number' && field.value === 0 ? '' : field.value
                }
                onChange={(event) => {
                  if (type === 'number') {
                    field.onChange(Number(event.target.value));
                  } else {
                    field.onChange(event.target.value);
                  }
                }}
                className={clsx(
                  'w-full px-3 py-2 border rounded-lg shadow-sm',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  {
                    'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500':
                      error,
                  },
                  {
                    'border-gray-300 text-gray-900 placeholder-gray-400':
                      !error,
                  },
                  { 'pl-10': InputProps?.startAdornment },
                  { 'pr-10': InputProps?.endAdornment },
                  className
                )}
                data-testid={`input-${name}`}
                {...other}
              />

              {InputProps?.endAdornment && (
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  data-testid={`${name}-end-adornment`}
                >
                  {InputProps.endAdornment}
                </div>
              )}
            </div>

            {error?.message && (
              <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
          </div>
        )}
      />
    );
  }
);

export default RHFTextField;
