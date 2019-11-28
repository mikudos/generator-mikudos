.PHONY:server
server:
	yarn install
	npm start
.PHONY:docker
docker:
	yarn install
	yarn run compile
	docker build . -t asia.gcr.io/kubenetes-test-project-249803/mikudos_message-service:0.0.1

.PHONY:run-docker
run-docker:
	docker run -p 3000:3000 asia.gcr.io/kubenetes-test-project-249803/mikudos_message-service:0.0.1

.PHONY:push
push:
	# docker tag asia.gcr.io/kubenetes-test-project-249803/mikudos_message-service:0.0.1 asia.gcr.io/kubenetes-test-project-249803/mikudos_message-service:0.0.1
	docker push asia.gcr.io/kubenetes-test-project-249803/mikudos_message-service:0.0.1

.PHONY:istio
istio:
	istioctl kube-inject -f deployment/frontend_deployment.yaml -o deployment/frontend_deployment-injected.yaml

.PHONY:deploy
deploy:
	kubectl apply -f deployment/frontend_deployment-injected.yaml

.PHONY:istio-deploy
istio-deploy:
	kubectl apply -f <(istioctl kube-inject -f deployment/frontend_deployment.yaml)

.PHONY: run-client
run-client:
	grpcc --proto ./proto/rbac/rbac.proto --address 127.0.0.1:$(PORT) -i
	# let ee = client.sayHello({name:"yue"}, printReply)