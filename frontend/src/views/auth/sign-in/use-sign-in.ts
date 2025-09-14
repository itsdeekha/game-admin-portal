import { yupResolver } from '@hookform/resolvers/yup';
import { useSearch } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { authAction } from '~/auth/context';
import { setSession } from '~/auth/context/utils';
import { useAuthContext } from '~/auth/hooks';
import { PATH_AFTER_LOGIN } from '~/configs/global.config';
import { useBoolean } from '~/hooks/use-boolean';
import { signIn } from '~/services/auth';

interface FormValues {
  email: string;
  password: string;
}

export default function useSignIn() {
  const { dispatch } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearch({ strict: false });

  const returnTo = (searchParams as any)?.returnTo;

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'itsdeekha@gmail.com',
    password: 'P@ssw0rd',
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValues) => {
      try {
        setErrorMsg('');
        const res = await signIn(data);
        const { accessToken, user } = res;

        setSession(accessToken);
        dispatch(authAction.signIn({ user }));
        window.location.href = returnTo || PATH_AFTER_LOGIN;
      } catch (error: any) {
        console.error(error);
        reset();
        setErrorMsg(typeof error === 'string' ? error : error?.message);
      }
    },
    [dispatch, reset, returnTo]
  );

  return {
    methods,
    onSubmit,
    handleSubmit,
    isSubmitting,
    password,
    errorMsg,
  };
}
