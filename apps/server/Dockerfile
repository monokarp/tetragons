# Download
FROM node:lts-alpine AS install-dependencies

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

# Build
FROM node:lts-alpine AS build

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=install-dependencies /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npx nx build server --skip-nx-cache

ENV NODE_ENV=production

RUN npm ci --only=production && npm cache clean --force

USER node

# Run
FROM node:lts-alpine AS run
RUN apk add curl

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist/apps/server ./dist

CMD [ "node", "dist/main.js" ]