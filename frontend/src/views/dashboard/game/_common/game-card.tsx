import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import Iconify from '~/components/iconify';
import { Game } from '~/models/game.model';
import { paths } from '~/routes/paths';

export interface GameCardProps {
  game: Game;
  deleting: boolean;
  onDelete?(game: Game): Promise<void>;
}

export default function GameCard({ game, deleting, onDelete }: GameCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.imageUrl || 'https://placehold.co/400x200?text=Game+Image'}
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 left-3">
          <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {game.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 transition-colors">
            {game.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">{game.title}</p>
        </div>

        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-500">
            by&nbsp;<strong>{game.provider}</strong>
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
          {game.description}
        </p>

        <div className="flex gap-2 pt-2">
          <Link to={paths.dashboard.game.edit(game.id)} className="flex-1">
            <button
              className="w-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-md transition-colors duration-200"
              title="Edit Game"
            >
              <Iconify
                icon="solar:clapperboard-edit-outline"
                className="w-4 h-4"
              />
            </button>
          </Link>
          <button
            disabled={deleting}
            onClick={() => onDelete?.(game)}
            className={clsx(
              'flex-1 bg-red-100 text-red-600 font-semibold py-2 px-3 rounded-md transition-colors duration-200',
              {
                'cursor-pointer hover:bg-red-200': !deleting,
              },
              { 'cursor-not-allowed': deleting }
            )}
            title="Delete Game"
          >
            {deleting ? (
              <Iconify
                icon="line-md:loading-twotone-loop"
                data-testid="button-loading-indicator"
              />
            ) : (
              <Iconify icon="solar:trash-bin-2-outline" />
            )}
          </button>
        </div>

        <div className="flex items-center mt-2 pt-2 border-t border-gray-100">
          <Iconify
            icon="solar:calendar-add-outline"
            width={14}
            className="text-gray-400 mr-1"
          />
          <span className="text-xs text-gray-400">
            Added {new Date(game.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
