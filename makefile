cp-env:
	@cd frontend && cp .env.example .env
	@cd backend && cp .env.example .env

run-ui:
	@cd frontend && make run

run-api:
	@cd backend && make run