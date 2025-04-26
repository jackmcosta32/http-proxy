##################################################################################
# Base Setup                                                                     #
##################################################################################
FROM node:23.11.0-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

##################################################################################
# Build Stage                                                                    #
##################################################################################
FROM base AS builder

WORKDIR /app

COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run build --filter="http-proxy"

##################################################################################
# Start Proxy                                                                    #
##################################################################################
FROM base AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 runner

USER runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/apps/http-proxy

COPY --from=builder /app/apps/http-proxy/node_modules ./node_modules
COPY --from=builder --chown=runner:nodejs /app/apps/http-proxy/dist .

EXPOSE 3000

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD [ "node", "index.cjs" ]
