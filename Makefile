.PHONY: help dev prod stop logs clean rebuild shell

help:
	@echo "Fantasy Game - Comandos Disponíveis"
	@echo ""
	@echo "  make dev        - Iniciar em modo desenvolvimento"
	@echo "  make prod       - Iniciar em modo produção"
	@echo "  make stop       - Parar todos os containers"
	@echo "  make logs       - Ver logs em tempo real"
	@echo "  make clean      - Remover containers e volumes"
	@echo "  make rebuild    - Reconstruir e iniciar"
	@echo "  make shell      - Acessar shell do container"
	@echo ""

dev:
	docker-compose up dev

dev-bg:
	docker-compose up -d dev

prod:
	docker-compose up prod

prod-bg:
	docker-compose up -d prod

stop:
	docker-compose down

logs:
	docker-compose logs -f dev

clean:
	docker-compose down -v
	docker system prune -f

rebuild:
	docker-compose down
	docker-compose up --build dev

shell:
	docker-compose exec dev sh
