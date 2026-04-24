FROM node:22-alpine AS builder

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable

WORKDIR /app

ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json

RUN pnpm install --filter web... --frozen-lockfile

COPY apps/web ./apps/web

RUN pnpm --filter web build

FROM nginx:1.27-alpine AS runtime

COPY infra/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
