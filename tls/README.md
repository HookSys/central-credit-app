# Certificate Authority

openssl genrsa -des3 -out serverCA.key 2048
openssl req -x509 -new -nodes -key serverCA.key -sha256 -days 1825 -out serverCA.pem

**_ After that you should import that CA's files into your keychain and make them trusted _**

# Certificate to use on Server and Container

openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -in server.csr -CA serverCA.pem -CAkey serverCA.key -CAcreateserial \
-out server.crt -days 825 -sha256 -extfile cert.conf -extensions local_san

**_ After that you should use those files in your Ingress and Server _**

# Creating a secret into your cluster

kubectl create secret tls app-tls --key server.key --cert server.crt
kubectl get secret app-tls -o yaml
