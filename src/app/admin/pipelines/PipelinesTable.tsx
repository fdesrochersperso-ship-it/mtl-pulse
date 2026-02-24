'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ExtendedPipelineStatusRow } from '@/lib/db/queries/pipeline-status';

interface PipelinesTableProps {
  statuses: (ExtendedPipelineStatusRow & { label: string })[];
}

function formatDate(d: Date | null): string {
  if (!d) return '—';
  return new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(d));
}

function formatDuration(ms: number | null): string {
  if (ms == null) return '—';
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

export function PipelinesTable({ statuses }: PipelinesTableProps) {
  const [running, setRunning] = useState<Set<string>>(new Set());

  async function handleRun(pipelineName: string) {
    setRunning((prev) => new Set(prev).add(pipelineName));

    try {
      const res = await fetch(`/api/admin/run-pipeline/${pipelineName}`, {
        method: 'POST',
      });

      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json();
        alert(data.error ?? 'Run failed');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setRunning((prev) => {
        const next = new Set(prev);
        next.delete(pipelineName);
        return next;
      });
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left font-medium">Pipeline</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Last run</th>
            <th className="px-4 py-3 text-left font-medium">Records</th>
            <th className="px-4 py-3 text-left font-medium">Duration</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((s) => (
            <tr key={s.pipelineName} className="border-b border-border/60">
              <td className="px-4 py-3 font-medium">{s.label}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                    s.freshnessStatus === 'green'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : s.freshnessStatus === 'yellow'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      s.freshnessStatus === 'green'
                        ? 'bg-green-600'
                        : s.freshnessStatus === 'yellow'
                          ? 'bg-yellow-600'
                          : 'bg-red-600'
                    }`}
                  />
                  {s.freshnessStatus}
                </span>
                {s.lastStatus === 'failed' && (
                  <span className="ml-1 text-xs text-destructive">(last failed)</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(s.lastRunAt)}
              </td>
              <td className="px-4 py-3">{s.recordsProcessed}</td>
              <td className="px-4 py-3">{formatDuration(s.durationMs)}</td>
              <td className="px-4 py-3 text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRun(s.pipelineName)}
                  disabled={running.has(s.pipelineName)}
                >
                  {running.has(s.pipelineName) ? 'Running…' : 'Run now'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
