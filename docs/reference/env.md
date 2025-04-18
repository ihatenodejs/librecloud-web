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

## Cloudflare

We use Cloudflare Turnstile for detecting bots and automated scripts attempting to abuse our services. We chose it because it's the perfect balance of security and convenience for users. It was also the most preferred option in the [poll we ran on my Telegram channel](https://t.me/pontushub/457).

You can get the keys you need for Cloudflare Turnstile [here](https://www.cloudflare.com/application-services/products/turnstile/). It's very plug and play.

If you would like to simply test or bypass Cloudflare Turnstile, you can use one of the site keys provided [here](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) instead of your own.

| Environment Variable   | Description                               | Example                               |
|------------------------|-------------------------------------------|---------------------------------------|
| NEXT_PUBLIC_CF_SITEKEY | Cloudflare Turnstile site key (public)    | `1x00000000000000000000AA`            |
| CF_SECRETKEY           | Cloudflare Turnstile secret key (private) | `0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` |
