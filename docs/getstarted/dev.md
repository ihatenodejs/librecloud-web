# Dev Server Setup

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

5. **Generate Altcha token**

   If you plan to use the signup forms, you will need to use Altcha, a private proof-of-work CAPTCHA. All you need to do is execute the script below, and it will be written to your `.env` or `.env.local`.

   ```bash
   $ bun tools/hmac.ts
   Successfully wrote ALTCHA_SECRETKEY to .env.local
   ```

6. **Configure environment variables**

   Following the environment variables section of this README, update your newly created `.env.local` file with your configuration.

7. **Initialize Prisma**

   Because `web` uses a database for storing Git link statuses (and other things to come), you will need to initialize the SQLite database.

   A `schema.prisma` file has been provided to make this easy.

   This can be done by executing:

   ```bash
   bunx prisma migrate dev --name init
   ```

8. **Start dev server**

   ```bash
   bun dev
   ```