##
## Ставим зависимости только при необходимости
FROM node:17-alpine AS deps

WORKDIR /app

ENV NODE_ENV=production

COPY --chown=node:node ./package*.json ./

RUN npm ci --only=production


##
## Доставляем devDependencies
FROM deps AS builder-deps

RUN npm ci --include=dev


##
## Пересобираем исходники только при необходимости
FROM node:17-alpine AS production-builder

WORKDIR /app

COPY --from=builder-deps /app/node_modules ./node_modules/
COPY . .

ENV NODE_ENV=production

RUN npm run build \
    && npm prune --production


##
## production-образ
FROM node:17-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=production-builder /app/package.json /app/package.json
COPY --from=production-builder /app/dist /app/dist
COPY --from=production-builder \
    /app/tsconfig.json \
    /app/nest-cli.json \
    ./

ARG port=80
ENV PORT=${port}
EXPOSE ${port}

CMD [ "npm", "run", "start:prod" ]


##
## development-образ
FROM node:17-alpine AS development

ENV NODE_ENV=development

RUN mkdir -p /app/dist

RUN chown -R node:node /app/dist

VOLUME /app/dist
VOLUME /app/node_modules

COPY --from=builder-deps /app/node_modules /app/node_modules

USER node

WORKDIR /app

ARG port=80
ENV PORT=${port}
EXPOSE ${port}

CMD [ "npm", "run", "start:dev" ]
