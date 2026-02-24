import type { PipelineRunRow } from '@/lib/db/queries/pipeline-status';

interface ErrorLogViewerProps {
  runs: PipelineRunRow[];
  labels: Record<string, { fr: string; en: string }>;
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(d));
}

export function ErrorLogViewer({ runs, labels }: ErrorLogViewerProps) {
  if (runs.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No failed runs in recent history.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {runs.map((r) => (
        <div
          key={r.id}
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium">
              {labels[r.pipelineName]?.en ?? r.pipelineName}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(r.startedAt)}
            </span>
          </div>
          {r.errorMessage && (
            <pre className="mt-2 overflow-x-auto rounded bg-destructive/10 p-3 text-xs text-destructive">
              {r.errorMessage}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
