# web

![Last Update](https://img.shields.io/badge/last_update-16_Feb_2024-blue)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![Build Status](https://git.pontusmail.org/librecloud/web/actions/workflows/docker.yaml/badge.svg)](https://git.pontusmail.org/librecloud/web/actions/?workflow=docker.yaml)
[![Build Status](https://git.pontusmail.org/librecloud/web/actions/workflows/ci.yaml/badge.svg)](https://git.pontusmail.org/librecloud/web/actions/?workflow=ci.yaml)

LibreCloud's website, dashboard, and API

## Docker Instructions

A Docker setup requires both Docker *and* Docker Compose.

1. **Install Bun if you haven't already**

   Bun is a fast JavaScript runtime, which we prefer over `npm`. These instructions will be written for Bun, but could be adapted to `npm` or `yarn` if needed.

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Fetch needed file(s)**

   Pick your preferred option to get the file(s) needed for Docker. Either option is fine, although Git is arguably the best option.

   **Option One:** Clone Git Repo

   ```bash
   git clone https://git.pontusmail.org/librecloud/web.git
   ```

   **Option Two:** Download Compose file only

   ```bash
   wget https://git.pontusmail.org/librecloud/web/raw/branch/main/docker-compose.yml
   ```

   You may have to install `wget`, or you could use `curl` instead.

3. **Bring the container up**

   ```bash
   docker compose up -d
   ```

   Please note: `sudo` may be required.

   You may customize the container with the included `docker-compose.yml` file if needed. Your server will start on port `3019` by default. We suggest using a reverse proxy to serve the site on a domain.

4. **Complete Setup**

   If you would like to host the entire LibreCloud frontend and backend, you will also need to setup the following repositories and edit this project to work with *your* setup.

   * [mail-connect](https://git.pontusmail.org/librecloud/mail-connect)
   * [docker-mailserver](https://github.com/docker-mailserver/docker-mailserver)

## Dev Server Instructions

1. **Install Bun if you haven't already**

   Bun is a fast JavaScript runtime, which we prefer over `npm`. These instructions will be written for Bun, but could be adapted to `npm` or `yarn` if needed.

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Clone the repo**

   ```bash
   git clone https://git.pontusmail.org/librecloud/web.git
   cd web
   ```

3. **Install dependencies**

   ```bash
   bun install
   ```

4. **Initialize Prisma**

   Because `web` uses a database for storing Git link statuses (and other things to come), you will need to initialize the SQLite database.

   A `schema.prisma` file has been provided to make this easy.

   This can be done by executing:

   ```bash
   bunx prisma migrate dev --name init
   ```

5. **Start dev server**

   ```bash
   bun dev
   ```

## To-Do

* [ ] Add documentation on .env
