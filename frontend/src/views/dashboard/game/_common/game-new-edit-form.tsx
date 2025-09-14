import { Button } from '~/components/button';
import Container from '~/components/container';
import FormProvider, { RHFTextField } from '~/components/hook-form';
import { Game } from '~/models/game.model';
import useCreateEditGame from './use-create-edit-game';

interface Props {
  game?: Game;
}

export default function GameNewEditForm({ game }: Props) {
  const { methods, values, errors, onSubmit, isSubmitting, handleFileChange } =
    useCreateEditGame({ game });

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
            <RHFTextField name="name" label="Name" placeholder="Name" />
            <RHFTextField name="title" label="Title" placeholder="Title" />
            <RHFTextField
              name="category"
              label="Category"
              placeholder="Category"
            />
            <RHFTextField
              name="provider"
              label="Provider"
              placeholder="Provider"
            />
            <RHFTextField
              name="description"
              label="Description"
              placeholder="Description"
            />
            <RHFTextField
              name="gameUrl"
              label="Game URL"
              placeholder="Game URL"
            />
          </div>

          <label
            htmlFor="file-input"
            className="block text-sm font-medium text-gray-700 mb-1 mt-6"
          >
            Game Image
          </label>

          {values.image && (
            <div className="mb-4 relative inline-block">
              <img
                src={
                  values.image instanceof File
                    ? values.image.preview
                    : values.image
                }
                alt="Game preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
          )}

          <input
            id="file-input"
            type="file"
            accept="image/*,.jpg,.jpeg,.png,.gif,.webp"
            onChange={handleFileChange}
            className="block cursor-pointer w-fit text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-900 hover:file:bg-gray-200"
            disabled={isSubmitting}
          />

          {errors.image?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.image?.message}</p>
          )}

          <div className="flex justify-end mt-6">
            <Button type="submit" loading={isSubmitting}>
              {!game ? 'Create Game' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </FormProvider>
    </Container>
  );
}
