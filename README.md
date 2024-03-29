# Start a new cluster

minikube start --vm-driver=hyperkit --kubernetes-version v1.15.5

# Change your docker env to minikube's

minikube docker-env

# Create a new secret docker registry

kubectl create secret docker-registry regcred --docker-server=<your-registry-server> --docker-username=<your-name> --docker-password=<your-pword> --docker-email=<your-email>
kubectl get secret regcred --output=yaml

Then just use `imagePullSecrets` inside `spec` in pod config.

# Create deployment and services yaml files

docker build -t <image-name>:<tag> <folder>
docker run -d --restart=always -e TAG=<tag> --name <service-name> -p <port>:<port> <image-name>:<tag>
kubectl run --image=<image-name>:<tag> <service-name> --port=<port> --env="TAG=<tag>"
kubectl expose deployment <service-name> --port=<port> --name=<service-name>
minikube service <service-name> --url

# To Run:

lerna run start

# To Build

lerna run build
lerna run docker:build

docker run -d --restart=always -e TAG=1.0.0 --name cc.service.relato.gold -p 6001:6001 dcfranco/cc.service.relato.gold:1.0.0
