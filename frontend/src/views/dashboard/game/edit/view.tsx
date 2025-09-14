import { useNavigate, useParams } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '~/components/button';
import Container from '~/components/container';
import Iconify from '~/components/iconify';
import { useBoolean } from '~/hooks/use-boolean';
import { Game } from '~/models/game.model';
import { paths } from '~/routes/paths';
import { getGame } from '~/services/game';
import GameNewEditForm from '../_common/game-new-edit-form';

export default function GameEditView() {
  const { id } = useParams({ strict: false }) as { id: number };
  const navigate = useNavigate();
  const loading = useBoolean(true);
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchGame = useCallback(async () => {
    try {
      loading.onTrue();
      setError(null);

      if (!id) {
        throw new Error('Game ID is required');
      }

      const gameData = await getGame(id);
      setGame(gameData);
    } catch (error) {
      console.error('Error fetching game:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to fetch game data'
      );
    } finally {
      loading.onFalse();
    }
  }, []);

  const handleRetry = () => {
    fetchGame();
  };

  const handleBackToList = () => {
    navigate({ to: paths.dashboard.game.root });
  };

  useEffect(() => {
    fetchGame();
  }, [id]);

  if (loading.value) {
    return (
      <Container>
        <div className="flex justify-center items-center py-12">
          <Iconify icon="line-md:loading-twotone-loop" width={60} />
        </div>
      </Container>
    );
  }

  if (error || !game) {
    return (
      <Container>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Failed to load game
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex justify-center gap-4">
            <Button onClick={handleRetry}>Try again</Button>
            <Button onClick={handleBackToList}>Back to list</Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Game</h1>
              <p className="text-gray-600 mt-1">
                Update game information for "{game.name}"
              </p>
            </div>
            <button
              onClick={handleBackToList}
              className="cursor-pointer px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to list
            </button>
          </div>
        </div>
      </Container>

      <GameNewEditForm game={game} />
    </>
  );
}
