#!/bin/bash
export REACT_APP_CREDITOR_BASE_URL=https://alfa.creditor.dev/api/v2
export REACT_APP_SENTRY_CREDITOR_BASE_DSN=https://01c547b851374f4fb771bc2d82053b22@sentry.io/1319865
export REACT_APP_PUBLIC_URL=https://alfa.creditofolha.com
export S3_LOCATION=s3://onidata-creditofolha-ui-alfa/prod


echo "Ambiente: $REACT_APP_PUBLIC_URL"
echo "API: $REACT_APP_CREDITOR_BASE_URL"
echo "S3: $S3_LOCATION"
read -p "Pressione qualquer tecla para continuar"

rm -r build/*

set -e
echo "Instalando dependências"
yarn install

echo "Buildando aplicação"
yarn build

echo "Enviando aplicação para o S3"
aws --profile onidata s3 sync --delete build/ $S3_LOCATION
