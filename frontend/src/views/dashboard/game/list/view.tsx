import { Link } from '@tanstack/react-router';
import { Button } from '~/components/button';
import Container from '~/components/container';
import { paths } from '~/routes/paths';
import GameCard from '../_common/game-card';
import Pagination from './pagination';
import SearchBox from './search-box';
import useGameList from './use-game-list';

export default function GameListView() {
  const {
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
  } = useGameList();

  if (error && games.length === 0) {
    return (
      <Container>
        <div className="w-full flex items-center justify-end mb-6">
          <Link to={paths.dashboard.game.new}>
            <Button>Create new</Button>
          </Link>
          <SearchBox
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            placeholder="Search for games, categories, or providers..."
            disabled={loading.value}
          />
        </div>

        <div className="text-center py-12">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            loading={loading.value}
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try again
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {error && games.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-red-800">{'error'}</p>
            <Button onClick={() => setError(null)}>Clear Error</Button>
          </div>
        </div>
      )}

      <div className="w-full flex items-center justify-end mb-6 gap-6">
        <Link to={paths.dashboard.game.new}>
          <Button>Create new</Button>
        </Link>

        <SearchBox
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          placeholder="Search for games, categories, or providers..."
          disabled={loading.value}
        />
      </div>

      {games.length === 0 && searchQuery && !loading.value && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No games found
          </h3>
          <p className="text-gray-600 mb-4">
            {`No games match "${searchQuery}"`}
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={handleClear}>Clear search</Button>
          </div>
        </div>
      )}

      {games.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onDelete={handleDelete}
                deleting={deleting.value}
              />
            ))}
          </div>

          {pagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.lastPage}
              totalItems={pagination.total}
              itemsPerPage={pagination.size}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </Container>
  );
}
