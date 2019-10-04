ENV_NAME := language-ai
NAME := language_master_ai_service
SERVICE_VERSION := 0.0.1

.PHONY: update-proto
update-proto:
	./update_proto.sh

# .PHONY: proto
# proto: update-proto
# 	protoc --python_out=. proto/ai/ai.proto

.PHONY: proto-py
proto-py: update-proto
	python -m grpc_tools.protoc -I. --python_out=. --python_grpc_out=. ./proto/ai/*.proto

.PHONY: init-env
init-env: clean-env
	echo "create conda env $(ENV_NAME)"
	conda env create -f environment.yml -n $(ENV_NAME)
	conda env list

.PHONY: env
env:
	conda activate $(ENV_NAME)

.PHONY: env-update
env-update:
	conda env update -n $(ENV_NAME) --file environment.yml  --prune

.PHONY: clean-env
clean-env:
	conda env remove -y -n $(ENV_NAME)

.PHONY: server
server: proto-py
	python server.py

.PHONY: client
client:
	python client.py

.PHONY: docker
docker:
	docker build . -t $(NAME):$(SERVICE_VERSION)

.PHONY: docker-run
docker-run:
	docker run --rm -p 50052:50052 --env PYTHON_ENV=development --name $(NAME) $(NAME):$(SERVICE_VERSION)