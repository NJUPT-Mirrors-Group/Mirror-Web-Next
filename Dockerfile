FROM node:20-alpine AS base
ENV NEXT_TELEMETRY_DISABLED="1"
RUN mkdir /app
WORKDIR /app

FROM base AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
ENV NODE_ENV="production"
COPY --from=build /app/.next/standalone .
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
