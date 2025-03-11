# Download
FROM node:lts-alpine AS install-dependencies

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

# Build
FROM node:lts-alpine AS build
RUN apk add gettext

ARG API_URL
ENV API_URL=$API_URL

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=install-dependencies /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN envsubst < apps/tetragons/src/environments/environment.ts > apps/tetragons/src/environments/environment.prod.ts

RUN npx nx build tetragons --skip-nx-cache

ENV NODE_ENV=production

RUN npm ci --only=production && npm cache clean --force

USER node

# Run
FROM nginx:stable-alpine AS run
EXPOSE 4200

COPY --from=build /app/dist/apps/tetragons/browser /usr/share/nginx/html
COPY --from=build /app/apps/tetragons/nginx.conf  /etc/nginx/conf.d/default.conf