FROM oven/bun:1 AS base
WORKDIR /app
COPY package.json ./
RUN bun install
COPY . .
RUN bunx prisma migrate dev --name init
RUN bun run build
EXPOSE 3000
CMD ["bun", "start"]

