FROM node:22.18.0-alpine AS base
WORKDIR /usr/src/app

FROM base AS deps
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

FROM deps AS local
COPY /src ./src
COPY *.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY scripts/entrypoint.dev.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

FROM deps AS build
COPY . .
RUN yarn build && \
    yarn install --production --frozen-lockfile && \
    yarn cache clean

FROM base AS production
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY scripts/entrypoint.prod.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]