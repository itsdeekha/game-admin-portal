import clsx from 'clsx';
import { ReactNode } from 'react';
import type { Role } from '~/models/user.model';
import { useAuthContext } from '../hooks';

interface RoleBasedGuardProps {
  roles: Array<Role>;
  children: ReactNode;
  className?: string;
}

export default function RoleBasedGuard({
  roles,
  children,
  className,
}: RoleBasedGuardProps) {
  const { user } = useAuthContext();

  if (!user) return null;

  if (!roles.includes(user.role)) {
    return (
      <div
        className={clsx(
          'h-[80vh] flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          className
        )}
      >
        <div className="w-full text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Permission Denied
          </h1>

          <p className="text-gray-600 text-lg">
            You do not have permission to access this page
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
