# Environment Variables

At the time of writing, LibreCloud is not in the state of perfection,
and as such we are expecting that you have a setup exact to ours.
While this will change in the future, we still suggest that provide all the listed environment variables.

## Primary

These are the environment variables which handle how `librecloud/web` functions.
With these variables, you can disable entire parts of the dashboard, such as registration.

| Environment Variable             | Description                                               | Expected Value                         |
|----------------------------------|-----------------------------------------------------------|----------------------------------------|
| NEXT_PUBLIC_SIGNUP_ENABLED       | Controls if the signup page and APIs are enabled/disabled | `true` (Enabled) or `false` (Disabled) |
| NEXT_PUBLIC_DONATE_URL           | Changes the universal donation link for buttons/links     | String - `https://...`                 |
| NEXT_PUBLIC_SUPPORT_EMAIL        | Email displayed in the "Support" tab of dashboard         | String - `example@example.com`         |
| NEXT_PUBLIC_TELEGRAM_CHANNEL_URL | Changes the default Telegram channel link in Support dash | String - `https://t.me/...`            |
| NEXT_PUBLIC_TELEGRAM_GROUP_URL   | Changes the default Telegram group link in Support dash   | String - `https://t.me/...`            |

## Altcha

Altcha is a privacy-friendly CAPTCHA alternative we use for bot traffic mitigation and anti-spam.
It requires a secret key for generating and verifying challenges. The rest is handled by the API.

| Environment Variable | Description                                               | Example                                |
|----------------------|-----------------------------------------------------------|----------------------------------------|
| ALTCHA_SECRETKEY     | Secret key for generating and verifying Altcha challenges | N/A                                    |

### Automatic Secret Key Setup

We've included an automatic setup script for your Altcha secret key. It generates and writes a secure token to your `.env` or `.env.local` file. You can execute this script like so:

```bash
bun tools/hmac.ts
```

## Authentik

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

## Email 2FA

For deleting user accounts, two-factor authentication via email is enforced. Thus, you must set your mailserver information:

| Environment Variable | Description                            | Example               |
|----------------------|----------------------------------------|-----------------------|
| EMAIL_HOST           | Hostname of your email server          | `mail.example.com`    |
| EMAIL_PORT           | The port to use for sending            | `465`                 |
| EMAIL_SSL            | Whether SSL should be used for sending | `true` / `false`      |
| NOREPLY_EMAIL        | Email account to send from             | `noreply@example.com` |
| NOREPLY_PASSWORD     | Password for the account given         | Your password         |

## ownCloud

The ownCloud integration requires an admin or service account credentials for the OCS API.

You must create a service account and enter its login details into your `.env` file to use these features. You will also likely want to use an app password for this, which can be created in the user settings.

| Environment Variable     | Description                                          | Example                       |
|--------------------------|------------------------------------------------------|-------------------------------|
| OWNCLOUD_URL            | The URL of your OWNCLOUD instance (no trailing slash) | `https://files.librecloud.cc` |
| OWNCLOUD_ADMIN_USERNAME | Admin/service account username                        | `service-account`             |
| OWNCLOUD_ADMIN_PASSWORD | Corresponding password to given admin/service account | Password                      |

## Gitea

Next, you will need to configure `web` with your Gitea instance.
Create a new access token in your Gitea user settings (),
and input the key you receive, as well as the URL of your instance, and the API URL.
You can find a link to the API and its endpoint URL on the footer.

| Environment Variable  | Description                                   | Example                                    |
|-----------------------|-----------------------------------------------|--------------------------------------------|
| GITEA_API_URL         | Your Gitea instance API endpoint (see footer) | `http://gitea.local/api/v1`                |
| GITEA_API_KEY         | Access Token created in user settings         | `0000000000000000000000000000000000000000` |
| NEXT_PUBLIC_GITEA_URL | Your Gitea instance URL                       | `http://gitea.local`                       |

## mail-connect

mail-connect, another project by LibreCloud, is a bridge from `docker-mailserver` to an API. It talks to the container via a Docker socket, but you will need to tell `web` where to find your mailserver API.

Keep in mind, this endpoint should **NOT** be public, and `web` should be the only authorized user of the API, unless you know what you're doing. There is zero authentication.

| Environment Variable | Description                  | Example                 |
|----------------------|------------------------------|-------------------------|
| MAIL_CONNECT_API_URL | URL of your mail-connect API | `http://localhost:4200` |

## Auth.js

We suggest starting by allowing Auth.js

| Environment Variable | Description                                       | Example                                                               |
|----------------------|---------------------------------------------------|-----------------------------------------------------------------------|
| AUTH_SECRET          | Generated during `.env.local` creation            | `R98/+7HbakYa73YHbooAND+nzae8RaudOdq8Uab/suE=`                        |
| AUTH_TRUST_HOST      | Required, should always be set to `true`          | `true`                                                                |
| NEXTAUTH_URL         | The URL LibreCloud will be publicly accessible at | `http://localhost:3000` (testing), `https://example.com` (production) |

## SearXNG

SearXNG is our search provider of choice for LibreCloud. These options configure the dashboard to use your instance for several services.

Don't be afraid to use LibreCloud Search for your private/public LibreCloud instance. We don't mind!

| Environment Variable    | Description               | Example                        |
|-------------------------|---------------------------|--------------------------------|
| NEXT_PUBLIC_SEARXNG_URL | Your SearXNG instance URL | `https://search.librecloud.cc` |
