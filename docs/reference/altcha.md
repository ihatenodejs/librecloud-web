# Altcha Implementation

Altcha is a privacy-friendly CAPTCHA alternative that's used in the LibreCloud signup form to verify that users are not bots. This doc explains the implementation, setup, and configuration of Altcha with LibreCloud.

## Basic Overview

Altcha works by serving a proof-of-work-based CAPTCHA which doesn't require any fingerprinting/data collection. Our implementation does not use their API, and instead uses an endpoint, `/api/captcha/create`. The setup of this is nearly automatically.

## Components

1. **Widget** (`components/custom/Altcha.tsx`)

   This component renders the Altcha widget for use in pages.

2. **API Endpoint** (`app/api/captcha/create/route.ts`)

   This endpoint generates the challenges with the altcha library.

3. **Token Validation** (`lib/utils.ts`)

   The utils file provides verification for submitted tokens from the client. This is what gets implemented into an API route which needs to be protected by Altcha. You can see an example of this in `app/api/users/create/route.ts`, which connects to `app/account/signup/page.tsx`.

## Setup

### Environment Variables

To use Altcha, you need to set the following environment variable:

```text
ALTCHA_SECRETKEY=
```

#### Automatic Setup

You should generate this with the provided `tools/hmac.ts` script. This is an important part of setup for people who want to take advantage of the signup forms.

The script requires the existance of an `.env` or `.env.local` file. You should have had this created when you setup Auth.js with `bunx auth secret`.

Execute the script like so:

```bash
bun tools/hmac.ts
```

## Debug Mode

The Altcha widget is in debug mode when `NODE_ENV` is set to `"development"`. This is nice for testing but you should disable it in production.
