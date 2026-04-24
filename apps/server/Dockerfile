FROM node:22-alpine AS builder

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json apps/server/package.json

RUN pnpm install --filter server... --frozen-lockfile

COPY apps/server ./apps/server

RUN pnpm --filter server build

FROM node:22-alpine AS runtime

ENV NODE_ENV=production
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json apps/server/package.json

RUN pnpm install --filter server --prod --frozen-lockfile

COPY --from=builder /app/apps/server/dist ./apps/server/dist

WORKDIR /app/apps/server

EXPOSE 3000

CMD ["node", "dist/server.js"]
