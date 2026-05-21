# Deploy this Next.js app to Cloudflare

Hand this document to Claude Code (run `claude` in the repo root) and ask:
**"Please follow CLOUDFLARE_DEPLOY_INSTRUCTIONS.md to deploy this app to Cloudflare."**

---

## Goal

Deploy this Next.js + React application to Cloudflare so it runs on Cloudflare's global edge network, with automatic deploys on every push to the `main` branch.

## Target stack

- **Runtime**: Cloudflare Workers (with Static Assets)
- **Adapter**: [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) — the officially recommended adapter for running Next.js on Cloudflare. It supports App Router, Server Components, Server Actions, Route Handlers, Middleware, and ISR.
- **CI/CD**: Cloudflare's Git integration (auto-build on push)

> Do NOT use `@cloudflare/next-on-pages` — that adapter is in maintenance mode. Use `@opennextjs/cloudflare` instead.

---

## Prerequisites (the human must do these first)

1. A Cloudflare account: https://dash.cloudflare.com/sign-up
2. Node.js 18.17+ installed locally
3. The repo pushed to GitHub or GitLab
4. (Optional) A custom domain already added to Cloudflare DNS

If the human hasn't done #1 or #3, stop and ask them to complete those steps before continuing.

---

## Steps for Claude Code

### 1. Inspect the project

- Read `package.json` to confirm this is a Next.js app and note the Next.js version (must be 14+ for best support; 15+ recommended).
- Check for an existing `next.config.js` / `next.config.mjs` / `next.config.ts`.
- Check for an existing `wrangler.jsonc` or `wrangler.toml` — if one exists, ask the human before overwriting.
- Note the package manager (`package-lock.json` → npm, `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `bun.lockb` → bun).

### 2. Install the adapter

Using the project's package manager, install as a dev dependency:

```bash
npm install --save-dev @opennextjs/cloudflare wrangler
```

(Use `pnpm add -D` / `yarn add -D` / `bun add -d` as appropriate.)

### 3. Create `open-next.config.ts`

Create this file at the repo root:

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Optional: enable incremental cache, R2 cache, etc. later.
});
```

### 4. Create `wrangler.jsonc`

Create this file at the repo root. Replace `REPLACE_WITH_PROJECT_NAME` with a slug derived from the repo name (lowercase, dashes only):

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "REPLACE_WITH_PROJECT_NAME",
  "main": ".open-next/worker.js",
  "compatibility_date": "2025-03-01",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "observability": {
    "enabled": true
  }
}
```

### 5. Update `package.json` scripts

Add these scripts (merge with existing ones — do not clobber `dev` / `build` / `start`):

```json
{
  "scripts": {
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
  }
}
```

### 6. Update `.gitignore`

Append these lines (only if missing):

```
.open-next
.wrangler
cloudflare-env.d.ts
```

### 7. Update `next.config.*`

Add this at the top of the existing `next.config.*` file so dev mode can access Cloudflare bindings:

```ts
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
```

(If the file uses CommonJS `module.exports`, use `require()` instead.)

### 8. Verify a local build

Run:

```bash
npm run preview
```

This should build the app and serve it locally via `wrangler dev`. If the build fails, **stop and report the error to the human** — do not attempt random fixes.

Common gotchas to watch for:
- Edge-incompatible Node APIs in API routes → may need to add `export const runtime = "nodejs"` to those routes.
- Image optimization: Cloudflare doesn't run Next's default image optimizer. Either configure `images: { unoptimized: true }` in `next.config` or use Cloudflare Images.

### 9. Connect the repo to Cloudflare (human step — Claude Code should print instructions)

Print these instructions for the human and wait:

> 1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Workers** → **Import a repository**.
> 2. Connect GitHub/GitLab and select this repo.
> 3. Cloudflare should auto-detect the Next.js + OpenNext setup. If prompted:
>    - **Build command**: `npx opennextjs-cloudflare build`
>    - **Deploy command**: `npx opennextjs-cloudflare deploy`
>    - **Root directory**: leave as default unless this is a monorepo
> 4. Click **Save and Deploy**.
> 5. Once the first deploy succeeds, paste the `*.workers.dev` URL back here.

### 10. (Optional) Custom domain

If the human provides a custom domain:
- In the Cloudflare dashboard → the Worker → **Settings** → **Domains & Routes** → **Add** → **Custom Domain**.
- The domain must already be on Cloudflare DNS. DNS records are created automatically.

### 11. Add password protection via Cloudflare Access

This site must be **gated behind authentication** — only people on an allowlist (by email) should be able to view it. We use **Cloudflare Access** (part of Cloudflare Zero Trust). It's free for up to 50 users, requires no code changes, and works by intercepting requests at Cloudflare's edge *before* they reach the Worker.

#### 11a. One-time: enable Zero Trust on the account (human step)

If this is the first Zero Trust app on the Cloudflare account, the human needs to:

1. Go to https://one.dash.cloudflare.com
2. Pick a team name (this becomes `<team>.cloudflareaccess.com` — used in the login URL)
3. Select the **Free** plan (no credit card required for ≤50 users)

Print these instructions and wait for the human to confirm before continuing.

#### 11b. Create an Access Application (human step — Claude Code prints instructions)

Print these instructions for the human:

> 1. Go to https://one.dash.cloudflare.com → **Access** → **Applications** → **Add an application** → **Self-hosted**.
> 2. **Application name**: pick something descriptive (e.g. the project name).
> 3. **Session duration**: 24 hours is a reasonable default.
> 4. **Application domain**: enter the domain the site is deployed at — either the `*.workers.dev` URL or the custom domain from step 10. You can add multiple domains if both should be gated.
> 5. Leave the **Identity providers** at the default (**One-time PIN**) unless you want to add Google/GitHub/Okta SSO. One-time PIN sends a 6-digit code to the user's email — no extra setup needed.
> 6. Click **Next**.
> 7. **Policy name**: e.g. `Allowed users`.
> 8. **Action**: `Allow`.
> 9. Under **Configure rules** → **Include** → **Selector: Emails**, add each email address that should have access. (Or use **Emails ending in** to allow a whole domain like `@yourcompany.com`.)
> 10. Click **Next** → **Add application**.

#### 11c. Verify the gate works

Once the human says the Access app is created:

- Open the deployed URL in a **private/incognito window**.
- You should see a Cloudflare-branded login page asking for an email.
- Enter an allowed email → check inbox → enter the 6-digit PIN → you should land on the site.
- Open the same URL with a **non-allowed** email → after PIN entry, you should see an "access denied" page.

If the login page doesn't appear at all, the most common cause is the Application domain not matching the actual deployed domain. Double-check that.

#### 11d. (Optional) Read the authenticated user inside the app

Cloudflare Access forwards a JWT to the Worker in the `Cf-Access-Jwt-Assertion` header and the user's email in `Cf-Access-Authenticated-User-Email`. If the app needs to know who's signed in, read those headers in a Next.js Server Component, Route Handler, or middleware. **Verify the JWT** against `https://<team>.cloudflareaccess.com/cdn-cgi/access/certs` before trusting it — don't trust the email header alone, since a misconfigured route could let it through unverified.

Only implement this if the human asks for it. The default gate (just blocking unauthorized users) needs no app code.

---

### 12. Commit and push

Stage and commit only the files you created/modified in steps 2–7. Use a commit message like:

```
chore: add Cloudflare Workers deployment via OpenNext
```

Push to `main` (or open a PR — ask the human which workflow they prefer).

---

## Verification checklist

After deploy completes, confirm:

- [ ] `https://<project>.<account>.workers.dev` loads the home page
- [ ] At least one dynamic route (e.g. a route that uses `cookies()`, a Server Action, or an API route) returns the expected response
- [ ] Static assets (images, CSS, fonts) load with `200` and `cache-control` headers from Cloudflare
- [ ] Pushing a trivial change to `main` triggers a new deploy in the Cloudflare dashboard
- [ ] Opening the URL in incognito shows the Cloudflare Access login page (not the site itself)
- [ ] An allowed email can sign in and reach the site; a non-allowed email is blocked

If any item fails, report which one and the relevant error/log — do not attempt blind fixes.

---

## References

- OpenNext for Cloudflare: https://opennext.js.org/cloudflare
- Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Wrangler config reference: https://developers.cloudflare.com/workers/wrangler/configuration/
- Cloudflare Access (Zero Trust): https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-public-app/
