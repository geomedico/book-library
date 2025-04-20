FROM node:22.13.1-slim

RUN npm install -g pnpm@8.15.4

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --no-frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN adduser --disabled-password appuser && chown -R appuser /usr/src/app
USER appuser

CMD ["pnpm", "start"]
