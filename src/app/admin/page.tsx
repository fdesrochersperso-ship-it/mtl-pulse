import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export default async function AdminPage() {
  const isAuth = await isAdminAuthenticated();
  redirect(isAuth ? '/admin/pipelines' : '/admin/login');
}
