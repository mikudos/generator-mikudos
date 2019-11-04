.PHONY: proto-js
proto-js:
	protoc --js_out=./proto/users proto/users/users.proto
	protoc --js_out=./proto/editors proto/editors/editors.proto
	protoc --js_out=./proto/managers proto/managers/managers.proto
	protoc --js_out=./proto/orders proto/orders/orders.proto
	protoc --js_out=./proto/puzzle_games proto/puzzle_games/puzzle_games.proto

.PHONY:server
server:
	yarn install
	npm start
.PHONY:docker
docker:
	yarn install
	yarn run compile
	docker build . -t asia.gcr.io/kubenetes-test-project-249803/frontend_server:0.0.2

.PHONY:run-docker
run-docker:
	docker run -p 3030:3030 asia.gcr.io/kubenetes-test-project-249803/frontend_server:0.0.2

.PHONY:push
push:
	# docker tag asia.gcr.io/kubenetes-test-project-249803/frontend_server:0.0.2 asia.gcr.io/kubenetes-test-project-249803/frontend_server:0.0.2
	docker push asia.gcr.io/kubenetes-test-project-249803/frontend_server:0.0.2

.PHONY:istio
istio:
	istioctl kube-inject -f deployment/frontend_deployment.yaml -o deployment/frontend_deployment-injected.yaml

.PHONY:deploy
deploy:
	kubectl apply -f deployment/frontend_deployment-injected.yaml

.PHONY:istio-deploy
istio-deploy:
	kubectl apply -f <(istioctl kube-inject -f deployment/frontend_deployment.yaml)
