# Check out https://hub.docker.com/_/node to select a new base image
FROM node:8-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/relato/central
RUN mkdir -p /home/node/relato/central/files_relato
RUN chmod -R 755 /home/node/relato/central/files_relato

WORKDIR /home/node/relato/central

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=6000

EXPOSE ${PORT}
EXPOSE 9229
CMD [ "npm", "run", "central"]
