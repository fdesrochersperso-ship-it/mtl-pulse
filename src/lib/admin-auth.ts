/**
 * Simple admin authentication using ADMIN_PASSWORD env var.
 * Uses HMAC-signed cookie for session verification.
 */

import { createHmac } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'mtl_admin_session';
const SALT = 'mtl-pulse-admin';

function getAdminToken(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return '';
  return createHmac('sha256', secret).update(SALT).digest('hex');
}

/** Verify that the request has a valid admin session */
export async function isAdminAuthenticated(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return true; // No password set = open (dev mode)

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const expected = getAdminToken();
  return token === expected && !!expected;
}

/** Create the session token for setting in cookie */
export function getSessionToken(): string {
  return getAdminToken();
}

export { COOKIE_NAME };
