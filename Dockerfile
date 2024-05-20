FROM node:20-alpine AS base
ENV NODE_ENV="production"
ENV NEXT_TELEMETRY_DISABLED="1"
RUN mkdir /app
WORKDIR /app

FROM base AS pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app

FROM pnpm AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM pnpm AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=build /app/.next/standalone .
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
