compose-up:
	@echo Starting docker compose
	docker compose -f docker-compose.yaml up -d --build

compose-down:
	@echo Stopping docker compose
	docker compose -f docker-compose.yaml down

compose-dev:
	cp docker-compose.dev.yaml docker-compose.yaml

compose-prod:
	cp docker-compose.prod.yaml docker-compose.yaml

env-dev:
	cp .env.dev .env

env-prod:
	cp .env.prod .env
