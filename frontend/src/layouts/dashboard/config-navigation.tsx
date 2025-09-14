import { useMemo } from 'react';
import Iconify from '~/components/iconify';
import { NavData } from '~/components/nav-section';
import { Role } from '~/models/user.model';
import { paths } from '~/routes/paths';

const icon = (name: string) => <Iconify icon={name} />;

const ICONS = {
  dashboard: icon('solar:home-2-bold-duotone'),
  game: icon('solar:gamepad-bold-duotone'),
};

export function useNavData() {
  const data = useMemo<Array<NavData>>(
    () => [
      {
        title: 'dashboard',
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
      },
      {
        title: 'game',
        path: paths.dashboard.game.root,
        icon: ICONS.game,
        children: [
          {
            title: 'list',
            path: paths.dashboard.game.list,
          },
          {
            title: 'create',
            path: paths.dashboard.game.new,
            roles: [Role.SuperAdmin],
            caption: 'Only Super Admin can see this item',
          },
        ],
      },
    ],
    []
  );

  return data;
}
