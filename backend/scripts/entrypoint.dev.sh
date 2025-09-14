#!/bin/sh
set -e

# If the first argument is shell command
if [ "$1" = "sh" ] || [ "$1" = "bash" ]; then
    echo "Starting shell for debugging..."
    exec "$@"
fi

# If not, run normal setup
echo "Starting application setup..."
yarn build
yarn migration:run
yarn dev