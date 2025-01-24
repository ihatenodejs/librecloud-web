# web

LibreCloud's website

## Docker Instructions

1. **Fetch needed file(s)**

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

2. **Bring up the container**

   ```bash
   docker compose up -d
   ```

   Please note: `sudo` may be required.

   You may customize the container with the included `docker-compose.yml` file if needed. Your server will start on port `3019` by default. We suggest using a reverse proxy to serve the site on a domain.

## Dev Server Instructions

1. **Install Bun if you haven't already**

   Bun is a fast JavaScript runtime, and is much faster than `npm`. These instructions will be written for Bun, but could be adapted to `npm` or `yarn` if needed.

2. **Clone the repo**

   ```bash
   git clone https://git.pontusmail.org/librecloud/web.git
   cd web
   ```

3. **Install dependencies**

   ```bash
   bun install
   ```

4. **Start dev server**

   ```bash
   bun dev
   ```
