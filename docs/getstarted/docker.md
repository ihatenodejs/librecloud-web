# Start with Docker

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

3. **Generate auth secret**

   This step is relatively painless. Execute the below command to generate a `.env.local` file with an `AUTH_SECRET`.

   ```bash
   bunx auth secret
   ```

4. **Generate Altcha token**

   If you plan to use the signup forms, you will need to use Altcha, a private proof-of-work CAPTCHA. All you need to do is execute the script below, and it will be written to your `.env` or `.env.local`.

   ```bash
   $ bun tools/hmac.ts
   Successfully wrote ALTCHA_SECRETKEY to .env.local
   ```

5. **Configure environment variables**

   Following the environment variables section of this README, update your newly created `.env.local` file with your configuration.

6. **Initialize Prisma**

   Because `web` uses a database for storing Git link statuses (and other things to come),
   you will need to initialize the SQLite database.
   However, if you are using Docker Compose, a database has already been generated in the container image and is blank.

   If you have a reason to initialize Prisma now, feel free to execute:

   ```bash
   bunx prisma migrate dev --name init
   ```

7. **Setup environment variables**

   Now is the time to go to the "Environment Variables" section and configure them in your `.env.local` file.

8. **Bring the container up**

   ```bash
   docker compose up -d --build
   ```

   Please note: `sudo` may be required.

   You may customize the container with the included `docker-compose.yml` file if needed. Your server will start on port `3019` by default. We suggest using a reverse proxy to serve the site on a domain.

9. **Complete Setup**

   If you would like to host the entire LibreCloud frontend and backend,
   you will also need to set up the following repositories and edit this project to work with *your* setup.

   * [mail-connect](https://git.pontusmail.org/librecloud/mail-connect)
   * [docker-mailserver](https://github.com/docker-mailserver/docker-mailserver)