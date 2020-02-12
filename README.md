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