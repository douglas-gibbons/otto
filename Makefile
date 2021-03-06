.DEFAULT_GOAL:=help
.PHONY: all help network up

help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

build: ## build the dev stack
	docker-compose build

up: ## bring the dev stack up, listening on http://localhost:4200
	docker-compose up -d

logs: ## Docker logs
	docker-compose logs -f

down: ## put the dev stack down
	docker-compose down

build-mobile: ## Build mobile version and copy content into directory for cordova
	npm run build-mobile
	cd mobile && cordova emulate android
