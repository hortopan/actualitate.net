FROM node:lts-slim

WORKDIR /app

COPY .npmrc .
COPY package.json .
COPY package-lock.json .

RUN ["npm", "ci"]

FROM node:lts-slim
WORKDIR /app

COPY --from=0 /app /app

RUN ["npm", "prune", "--production"]

FROM node:lts-slim

WORKDIR /app

COPY --from=0 /app /app
COPY tsconfig.json .
COPY src /app/src
COPY static /app/static
COPY .svelte-kit /app/.svelte-kit
COPY svelte.config.js /app/svelte.config.js
COPY vite.config.ts /app/vite.config.ts
COPY server.js /app/server.js
COPY logging.js /app/logging.js

ENV NODE_ENV=production
ENV PORT=80
ENV LISTEN=0.0.0.0:80
ENV SECRET=secret
ENV URL=https://example.com
ENV DOMAIN=example.com
ENV FRIENDLY_NAME=Example
ENV FRIENDLY_DESCRIPTION=Example
ENV LANG=en
ENV GHOST_URL=http://internal
ENV GHOST_KEY=11111111111111111111111111
ENV GHOST_PUBLIC_URL=https://ghost.example.com

RUN ["npm", "run", "build"]

FROM node:lts-slim

WORKDIR /app
USER nobody:nogroup
COPY --from=1 /app /app

COPY --from=2 /app/build /app/build
COPY --from=2 /app/static /app/static
COPY --from=2 /app/server.js /app/server.js
COPY --from=2 /app/logging.js /app/logging.js

COPY redirects.sqlite /app/redirects.sqlite

ENV REDIRECTS_DB_PATH=/app/redirects.sqlite

ENTRYPOINT ["node", "/app/server.js"]
