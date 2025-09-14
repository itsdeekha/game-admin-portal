FROM node:22.18.0-alpine AS base
WORKDIR /usr/src/app

FROM base AS deps
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

FROM deps AS local
COPY /public ./public
COPY /index.html ./index.html
COPY /vite.config.ts ./vite.config.ts
COPY /src ./src
COPY *.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
CMD ["yarn", "dev"]