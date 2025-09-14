import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from '@tanstack/react-router';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { CreateGameDto, Game } from '~/models/game.model';
import { paths } from '~/routes/paths';
import { createGame, updateGame } from '~/services/game';
import { genUploadPresignedUrl, uploadFileToS3 } from '~/services/upload';
import { validateImageFile } from '~/utils/file.util';

interface Props {
  game?: Game;
}

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

interface FormValuesProps extends Omit<CreateGameDto, 'imageUrl'> {
  image: CustomFile | string;
}

export default function useCreateEditGame({ game }: Props) {
  const navigate = useNavigate();

  const gameSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    provider: Yup.string().required('Provider is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed<CustomFile | string>().required('Image is required'),
    gameUrl: Yup.string()
      .url('Must be valid URL format')
      .required('Game URL is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: game?.name ?? '',
      title: game?.title ?? '',
      category: game?.category ?? '',
      provider: game?.provider ?? '',
      description: game?.description ?? '',
      image: game?.imageUrl ?? '',
      gameUrl: game?.gameUrl ?? '',
    }),
    [game]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(gameSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();
  const imageValue = watch('image');

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        const { image, ...body } = data;
        let imageUrl: string | undefined;

        if (image instanceof File) {
          const presigned = await genUploadPresignedUrl({
            filename: image.name,
            mimetype: image.type,
            filesize: image.size,
          });

          await uploadFileToS3(image, presigned);

          imageUrl = presigned.fileUrl;
        }

        if (game) {
          await updateGame({
            id: game!.id,
            ...body,
            ...(imageUrl ? { imageUrl } : { imageUrl: game.imageUrl }),
          });
        } else {
          await createGame({
            ...body,
            imageUrl: imageUrl ?? '',
          });
        }

        alert(game ? 'Update success!' : 'Create success!');
        reset();
        navigate({ to: paths.dashboard.game.root });
      } catch (error) {
        console.error(error);
      }
    },
    [game, reset, navigate]
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    setError('image', { type: 'custom', message: '' });

    if (selectedFile) {
      const errorMessage = validateImageFile(selectedFile);

      if (errorMessage) {
        setError('image', { type: 'custom', message: errorMessage });
        event.target.value = '';
        return;
      }

      const newFile = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      });

      setValue('image', newFile, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (values.image) {
        if (values.image instanceof File && values.image.preview) {
          URL.revokeObjectURL(values.image.preview);
        }
      }
    };
  }, [imageValue]);

  return {
    methods,
    values,
    errors,
    isSubmitting,
    handleFileChange,
    onSubmit: handleSubmit(onSubmit),
  };
}
