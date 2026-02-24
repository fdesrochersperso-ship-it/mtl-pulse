"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

export interface DataTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterOptions?: {
    borough?: { value: string; label: string }[];
    category?: { value: string; label: string }[];
    status?: { value: string; label: string }[];
  };
  filterValues?: {
    borough?: string;
    category?: string;
    status?: string;
  };
  onFilterChange?: (key: string, value: string) => void;
  onExportCsv?: () => void;
  exportFilename?: string;
  locale?: "fr" | "en";
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  searchPlaceholder,
  searchValue = "",
  onSearchChange,
  filterOptions,
  filterValues = {},
  onFilterChange,
  onExportCsv,
  exportFilename = "export",
  locale = "fr",
  emptyMessage,
  className,
}: DataTableProps<T>) {
  const t = useTranslations("common");
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasFilters =
    filterOptions &&
    (filterOptions.borough?.length ||
      filterOptions.category?.length ||
      filterOptions.status?.length);
  const emptyMsg = emptyMessage ?? t("emptyData");

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-col gap-4 space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          {onSearchChange && (
            <input
              type="search"
              placeholder={searchPlaceholder ?? t("searchPlaceholder")}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            />
          )}
          {hasFilters && onFilterChange && (
            <div className="flex flex-wrap gap-2">
              {filterOptions?.borough && filterOptions.borough.length > 0 && (
                <Select
                  value={filterValues?.borough ?? ""}
                  onValueChange={(v) => onFilterChange("borough", v)}
                  options={[
                    { value: "", label: t("allCity") },
                    ...filterOptions.borough,
                  ]}
                  className="w-40 min-w-0"
                />
              )}
              {filterOptions?.category && filterOptions.category.length > 0 && (
                <Select
                  value={filterValues?.category ?? ""}
                  onValueChange={(v) => onFilterChange("category", v)}
                  options={[
                    { value: "", label: t("allCategories") },
                    ...filterOptions.category,
                  ]}
                  className="w-40 min-w-0"
                />
              )}
              {filterOptions?.status && filterOptions.status.length > 0 && (
                <Select
                  value={filterValues?.status ?? ""}
                  onValueChange={(v) => onFilterChange("status", v)}
                  options={[
                    { value: "", label: t("allStatuses") },
                    ...filterOptions.status,
                  ]}
                  className="w-40 min-w-0"
                />
              )}
            </div>
          )}
        </div>
        {onExportCsv && (
          <Button variant="outline" size="sm" onClick={onExportCsv}>
            <Download className="mr-2 h-4 w-4" />
            {t("exportCsv")}
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="px-4 py-3 text-left font-medium"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    {emptyMsg}
                  </td>
                </tr>
              ) : (
                data.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b transition-colors hover:bg-muted/30"
                  >
                    {columns.map((col) => {
                      const val = row[col.key as keyof T];
                      const content = col.render
                        ? col.render(row)
                        : val != null
                          ? String(val)
                          : "—";
                      return (
                        <td key={String(col.key)} className="px-4 py-3">
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {total > 0 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <div className="text-sm text-muted-foreground">
              {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, total)}{" "}
              {t("of")} {total}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                {t("page")} {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
