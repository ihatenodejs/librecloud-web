FROM oven/bun:1 AS base
WORKDIR /app

# Fixes openssl issues
RUN apt-get update -y && apt-get install -y openssl

COPY package.json ./
RUN bun install
COPY . .

RUN bunx prisma generate
RUN bunx prisma migrate deploy

ENV NODE_ENV=production
RUN bun run build
EXPOSE 3000

CMD ["bun", "start"]