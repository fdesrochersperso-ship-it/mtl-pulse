'use client';

import { useState, useMemo } from 'react';

interface DataTableProps {
  records: Record<string, unknown>[];
  fields: Array<{ id: string; type: string }>;
  locale: string;
  /** Optional mapping from raw field name to clean name */
  fieldLabels?: Record<string, string>;
}

export function DataTable({ records, fields, locale, fieldLabels }: DataTableProps) {
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const isFr = locale === 'fr';

  // Filter out internal CKAN fields
  const visibleFields = fields.filter((f) => !f.id.startsWith('_'));

  const sorted = useMemo(() => {
    if (!sortCol) return records;
    return [...records].sort((a, b) => {
      const va = a[sortCol];
      const vb = b[sortCol];
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;

      const na = Number(va);
      const nb = Number(vb);
      if (!isNaN(na) && !isNaN(nb)) {
        return sortAsc ? na - nb : nb - na;
      }
      const sa = String(va);
      const sb = String(vb);
      return sortAsc ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
  }, [records, sortCol, sortAsc]);

  function handleSort(colId: string) {
    if (sortCol === colId) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(colId);
      setSortAsc(true);
    }
  }

  function formatCell(value: unknown): string {
    if (value == null) return '—';
    if (typeof value === 'number') {
      return value.toLocaleString(isFr ? 'fr-CA' : 'en-CA');
    }
    return String(value);
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b bg-muted">
            {visibleFields.map((f) => (
              <th
                key={f.id}
                onClick={() => handleSort(f.id)}
                className="cursor-pointer px-3 py-2 text-left font-medium text-muted-foreground hover:text-foreground whitespace-nowrap"
              >
                {fieldLabels?.[f.id] ?? f.id}
                {sortCol === f.id && (
                  <span className="ml-1">{sortAsc ? '↑' : '↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
              {visibleFields.map((f) => (
                <td key={f.id} className="px-3 py-1.5 whitespace-nowrap">
                  {formatCell(row[f.id])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {records.length === 0 && (
        <div className="py-8 text-center text-muted-foreground text-sm">
          {isFr ? 'Aucune donnée.' : 'No data.'}
        </div>
      )}
    </div>
  );
}
