# web

![Last Update](https://img.shields.io/badge/last_update-24_Feb_2024-blue)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![Build and Push Docker Image](https://github.com/ihatenodejs/librecloud-web/actions/workflows/docker.yml/badge.svg)](https://github.com/ihatenodejs/librecloud-web/actions/workflows/docker.yml)
[![Bump Dependencies](https://github.com/ihatenodejs/librecloud-web/actions/workflows/bump.yml/badge.svg)](https://github.com/ihatenodejs/librecloud-web/actions/workflows/bump.yml)

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

3. **Generate auth secret**

   This step is relatively painless. Execute the below command to generate a `.env.local` file with an `AUTH_SECRET`.

   ```bash
   bunx auth secret
   ```

4. **Configure environment variables**

   Following the environment variables section of this README, update your newly created `.env.local` file with your configuration.

5. **Initialize Prisma**

   Because `web` uses a database for storing Git link statuses (and other things to come),
   you will need to initialize the SQLite database.
   However, if you are using Docker Compose, a database has already been generated in the container image and is blank.

   If you have a reason to initialize Prisma now, feel free to execute:

   ```bash
   bunx prisma migrate dev --name init
   ```

6. **Bring the container up**

   ```bash
   docker compose up -d
   ```

   Please note: `sudo` may be required.

   You may customize the container with the included `docker-compose.yml` file if needed. Your server will start on port `3019` by default. We suggest using a reverse proxy to serve the site on a domain.

7. **Complete Setup**

   If you would like to host the entire LibreCloud frontend and backend,
   you will also need to set up the following repositories and edit this project to work with *your* setup.

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

4. **Generate auth secret**

   This step is relatively painless. Execute the below command to generate a `.env.local` file with an `AUTH_SECRET`.

   ```bash
   bunx auth secret
   ```

5. **Configure environment variables**

   Following the environment variables section of this README, update your newly created `.env.local` file with your configuration.

6. **Initialize Prisma**

   Because `web` uses a database for storing Git link statuses (and other things to come), you will need to initialize the SQLite database.

   A `schema.prisma` file has been provided to make this easy.

   This can be done by executing:

   ```bash
   bunx prisma migrate dev --name init
   ```

7. **Start dev server**

   ```bash
   bun dev
   ```

## Environment Variables

At the time of writing, LibreCloud is not in the state of perfection,
and as such we are expecting that you have a setup exact to ours.
While this will change in the future, we still suggest that provide all the listed environment variables.

### Authentik

We use [Auth.js](https://authjs.dev) to provide authentication for users through Authentik.
To do this, you will need to create a new OAuth2 provider in Authentik and put its configuration in your `.env` file.

If you need more help doing this, there is a fantastic guide [on Authentik's wiki](https://docs.goauthentik.io/docs/add-secure-apps/providers/oauth2/).

| Environment Variable  | Description                                             | Example                                         |
|-----------------------|---------------------------------------------------------|-------------------------------------------------|
| AUTH_AUTHENTIK_ID     | (Auth.js) OAuth2 Provider - Client ID                   | `UHEkjdUIqi938hUIEijdkWZiudhIUshefIJIo8u3u`     |
| AUTH_AUTHENTIK_SECRET | (Auth.js) OAuth2 Provider - Client Secret               | [long string]                                   |
| AUTH_AUTHENTIK_ISSUER | (Auth.js) OAuth2 Provider - OpenID Configuration Issuer | `http://authentik.local/application/o/example/` |
| AUTHENTIK_API_KEY     | API key for authenticating with Authentik's API         | N/A                                             |
| AUTHENTIK_API_URL     | Authentik's API endpoint URL                            | `http://authentik.local/api/v3`                 |

### Gitea

Next, you will need to configure `web` with your Gitea instance.
Create a new access token in your Gitea user settings (),
and input the key you receive, as well as the URL of your instance, and the API URL.
You can find a link to the API and its endpoint URL on the footer.

| Environment Variable | Description                                   | Example                                    |
|----------------------|-----------------------------------------------|--------------------------------------------|
| GITEA_API_URL        | Your Gitea instance API endpoint (see footer) | `http://gitea.local/api/v1`                |
| GITEA_API_KEY        | Access Token created in user settings         | `0000000000000000000000000000000000000000` |
| GITEA_URL            | Your Gitea instance URL                       | `http://gitea.local`                       |

### mail-connect

mail-connect, another project by LibreCloud, is a bridge from `docker-mailserver` to an API. It talks to the container via a Docker socket, but you will need to tell `web` where to find your mailserver API.

Keep in mind, this endpoint should **NOT** be public, and `web` should be the only authorized user of the API, unless you know what you're doing. There is zero authentication.

| Environment Variable | Description                  | Example                 |
|----------------------|------------------------------|-------------------------|
| MAIL_CONNECT_API_URL | URL of your mail-connect API | `http://localhost:4200` |

### Auth.js

We suggest starting by allowing Auth.js

| Environment Variable | Description                                       | Example                                                               |
|----------------------|---------------------------------------------------|-----------------------------------------------------------------------|
| AUTH_SECRET          | Generated during `.env.local` creation            | `R98/+7HbakYa73YHbooAND+nzae8RaudOdq8Uab/suE=`                        |
| AUTH_TRUST_HOST      | Required, should always be set to `true`          | `true`                                                                |
| NEXTAUTH_URL         | The URL LibreCloud will be publicly accessible at | `http://localhost:3000` (testing), `https://example.com` (production) |

## Database schema updates

In case of an update to `prisma/schema.prisma`, you should run the below command to migrate the old database.

Each update to this file is guaranteed to work with the previous version of the file to ensure maximum compatibility. While every effort has been made to ensure compatibility, we are not responsible for any data loss.

```bash
npx prisma migrate dev --name update-schema # Migrate
npx prisma migrate deploy # Deploy
```

## To-Do

* [X] Add documentation on .env
* [ ] Implement security scans
* [ ] Rate-limiting on API
