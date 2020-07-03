#!/bin/sh

openssl genrsa 4096 > serverCA.key #generate CA key
openssl req -x509 -new -nodes -key serverCA.key -days 1000 -sha256 -subj '/CN=centralcreditapp.com' > serverCA.pem #generate CA cert
openssl genrsa 2048 > server.key #generate server key
openssl req -new -subj '/CN=centralcreditapp.com' -key server.key > server.csr #generate signing request
openssl x509 -req -days 1000 -sha256 -CA serverCA.pem -CAkey serverCA.key -CAcreateserial -in server.csr -extfile cert.conf -extensions local_san > server.pem #sign request with local CA

#limit potential for

rm serverCA.key
rm serverCA.srl
rm server.csr
chmod 640 server.key