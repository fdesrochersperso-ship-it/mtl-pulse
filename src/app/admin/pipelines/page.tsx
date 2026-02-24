import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import {
  getExtendedPipelineStatuses,
  getPipelineRuns,
  PIPELINE_LABELS,
} from '@/lib/db/queries/pipeline-status';
import { PipelinesTable } from './PipelinesTable';
import { ErrorLogViewer } from './ErrorLogViewer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Pipelines | Admin | MTL Pulse',
  description: 'Pipeline monitoring and management',
};

export default async function AdminPipelinesPage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const [statuses, recentRuns] = await Promise.all([
    getExtendedPipelineStatuses(),
    getPipelineRuns(undefined, 30),
  ]);

  const failedRuns = recentRuns.filter((r) => r.status === 'failed');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pipeline Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Monitor pipeline runs, view status, and trigger manual runs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipelines</CardTitle>
          <CardDescription>
            Status, last run, records processed, and duration per pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PipelinesTable
            statuses={statuses.map((s) => ({
              ...s,
              label: PIPELINE_LABELS[s.pipelineName]?.en ?? s.pipelineName,
            }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Log</CardTitle>
          <CardDescription>
            Recent failed pipeline runs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ErrorLogViewer runs={failedRuns} labels={PIPELINE_LABELS} />
        </CardContent>
      </Card>
    </div>
  );
}
