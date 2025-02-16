FROM oven/bun:1 AS base
WORKDIR /app
COPY package.json ./
COPY bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bunx prisma migrate dev --name init
RUN bun run build
EXPOSE 3000
CMD ["bun", "start"]

