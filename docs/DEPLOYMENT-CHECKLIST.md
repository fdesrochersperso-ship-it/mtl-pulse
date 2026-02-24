# MTL Pulse — Production Deployment Checklist

Pre-launch verification for dev, staging, and production environments.

## Environment Variables

| Variable | Required | Dev | Staging | Prod | Notes |
|----------|----------|-----|---------|------|------|
| `DATABASE_URL` | Yes | ✓ | ✓ | ✓ | PostgreSQL connection string |
| `ANTHROPIC_API_KEY` | Yes (for digests) | ✓ | ✓ | ✓ | Claude API key |
| `CRON_SECRET` | Yes (prod) | Optional | ✓ | ✓ | Protects `/api/cron` endpoints |
| `ADMIN_PASSWORD` | Yes (prod) | Optional | ✓ | ✓ | For `/admin/pipelines` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | — | ✓ | ✓ | e.g. `https://mtlpulse.ca` |
| `SNOW_API_TOKEN` | Optional | — | — | ✓ | If snow removal pipeline enabled |
| `PIPELINE_ALERT_WEBHOOK_URL` | Recommended | — | ✓ | ✓ | Slack incoming webhook for failures |
| `SENTRY_DSN` | Recommended | — | ✓ | ✓ | Error tracking |

## Pre-Deploy

- [ ] Run `npm run build` — build succeeds
- [ ] Run `npm run build:analyze` — verify bundle size (optional)
- [ ] `db:push` or migrations applied to target database
- [ ] All env vars set in Vercel/hosting provider
- [ ] `CRON_SECRET` matches Vercel Cron auth header

## Post-Deploy Verification

### Pipelines

- [ ] Trigger `/api/cron/actes_criminels` (GET with `Authorization: Bearer <CRON_SECRET>`)
- [ ] Verify pipeline success (200, `success: true`)
- [ ] Check `/admin/pipelines` — latest run appears
- [ ] Trigger `compute_metrics` — metrics recompute
- [ ] Trigger `generate_daily_digest` — daily digest created

### Data & UI

- [ ] Homepage loads with topic cards and metrics
- [ ] At least one digest visible (FR or EN)
- [ ] Borough pages load (e.g. `/borough/VMA`)
- [ ] Map page loads (`/map`)
- [ ] Trends page loads (`/trends`)
- [ ] Data freshness indicators show green/yellow appropriately

### SEO

- [ ] `/sitemap.xml` returns valid sitemap
- [ ] `/robots.txt` allows `/` and links to sitemap
- [ ] Open Graph tags present on homepage and borough pages

### Monitoring

- [ ] Sentry receives test error (if configured)
- [ ] Pipeline failure triggers webhook alert (test by forcing a failure)
- [ ] Web Vitals report (if analytics configured)

## Cron Schedule (vercel.json)

Pipelines run on the following schedule (America/Montreal):

| Pipeline | Schedule |
|----------|----------|
| entraves_circulation | Every hour |
| info_travaux | Every 6 hours |
| actes_criminels, fire_interventions, pothole_repairs, remorquages | 11:00 daily |
| permis_construction, requetes_311, bedbug_reports | Sundays 05:00 |
| elected_officials | 1st of month 11:00 |
| compute_metrics | 12:00 daily |
| generate_daily_digest | 13:00 daily |

## Rollback

- Revert to previous Vercel deployment from dashboard
- Database migrations: run down migrations if applicable
- No data is lost; pipelines will backfill on next run
