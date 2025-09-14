import { useCallback, useEffect, useState } from 'react';
import { useBoolean } from '~/hooks/use-boolean';
import { IPagination } from '~/models/common.model';
import { Game } from '~/models/game.model';
import { deleteGame, getGameList } from '~/services/game';

export default function useGameList() {
  const loading = useBoolean();
  const deleting = useBoolean();
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState<IPagination>();
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async (page: number, query: string) => {
    try {
      loading.onTrue();
      setError(null);

      const { items, pagination } = await getGameList({
        page,
        size: 6,
        q: query || undefined,
      });

      setGames(items);
      setPagination(pagination);
    } catch (error) {
      console.error('Error fetching games:', error);
      setError('Failed to load games. Please try again.');
      setGames([]);
      setPagination(undefined);
    } finally {
      loading.onFalse();
    }
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
      fetchGames(1, query);
    },
    [fetchGames]
  );

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setCurrentPage(1);
    fetchGames(1, '');
  }, [fetchGames]);

  const handleDelete = useCallback(
    async (game: Game) => {
      if (!confirm(`Are you sure you want to delete "${game.name}"?`)) {
        return;
      }

      try {
        deleting.onTrue();
        await deleteGame(game.id);
        fetchGames(currentPage, searchQuery);
      } catch (error) {
        console.error('Error deleting game:', error);
        setError('Failed to delete game. Please try again.');
      } finally {
        deleting.onFalse();
      }
    },
    [games.length, currentPage, pagination, searchQuery, fetchGames]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      fetchGames(page, searchQuery);
    },
    [fetchGames, searchQuery]
  );

  const handleRetry = useCallback(() => {
    fetchGames(currentPage, searchQuery);
  }, [fetchGames, currentPage, searchQuery]);

  useEffect(() => {
    fetchGames(1, '');
  }, [fetchGames]);

  return {
    error,
    games,
    loading,
    deleting,
    pagination,
    currentPage,
    searchQuery,
    setError,
    handleClear,
    handleRetry,
    handleDelete,
    handleSearch,
    handlePageChange,
  };
}
