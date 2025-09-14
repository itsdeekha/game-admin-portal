import { RouterProvider } from '@tanstack/react-router';
import { router } from './root';

export default function Router() {
  return <RouterProvider router={router} />;
}
