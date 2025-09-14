NAME:

migration-create:
	@yarn migration:create src/infra/database/migrations/$(NAME)

run:
	@docker compose -f docker-compose.local.yml up --build --watch --remove-orphans
