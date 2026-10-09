# Admin login setup

The admin panel at `/admin` uses real admin accounts. Each admin signs in with
email + password, or with **Continue with Google**. If a Google account has the
same email as an existing admin, the two are linked into one account, so either
sign-in method works.

Nothing secret lives in the code. Everything is configured with environment
variables in **Cloudflare Pages → your project → Settings → Environment variables**
(add them to Production, and Preview if you use it). Mark the secret ones as
"Encrypt".

| Variable | Required | What it is |
| --- | --- | --- |
| `ADMIN_EMAILS` | yes | Comma-separated list of emails allowed to be admins, e.g. `you@example.com` |
| `ADMIN_SETUP_KEY` | for password reset | A long random secret (at least 16 characters). Anyone with it can set a password for an email in `ADMIN_EMAILS`. Remove or change it when you don't need it. |
| `GOOGLE_CLIENT_ID` | for Google | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | for Google | From Google Cloud Console (encrypt) |

## 1. Create the database tables

Run the new migration once against the production D1 database:

```bash
npx wrangler d1 execute 3dlabs-clients --remote --file=migrations/0015_create_admin_auth.sql
```

(Or paste the SQL from that file into Cloudflare dashboard → D1 → 3dlabs-clients → Console.)

## 2. Get into the admin panel (first time, or forgot password)

1. Set `ADMIN_EMAILS` and `ADMIN_SETUP_KEY` in Cloudflare Pages and redeploy.
   Generate a key with e.g. `openssl rand -hex 24`.
2. Open `/admin`, click **Forgot password?**, enter your email, the setup key and a new password.
3. You're signed in. Once you're in, you can delete `ADMIN_SETUP_KEY` until you need it again.

You can also get in purely with Google: if your Google email is in `ADMIN_EMAILS`,
**Continue with Google** creates your admin account the first time.

Signed-in admins can change their password from the **Change Password** button
in the dashboard header (Google-only admins see **Set Password**).

## 3. Set up Continue with Google

1. Go to <https://console.cloud.google.com/>, create (or pick) a project.
2. **APIs & Services → OAuth consent screen**: choose External, fill in the app
   name (3D Labs) and support email, add scopes `openid`, `email`, `profile`.
   Publish the app (or add yourself as a test user).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**,
   type **Web application**. Under **Authorized redirect URIs** add:
   - `https://3dlabs.lk/api/admin-auth/google/callback`
   - `https://www.3dlabs.lk/api/admin-auth/google/callback` (if www is used)
   - `http://localhost:8788/api/admin-auth/google/callback` (optional, local testing)
4. Copy the client ID and secret into `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, then redeploy.

## Local development

Create a `.dev.vars` file (not committed) with the same variables, then:

```bash
npx wrangler d1 execute 3dlabs-clients --local --file=migrations/0015_create_admin_auth.sql
npm run preview
```
