import { redirect } from "next/navigation";
import { getISOWeek, getISOWeekYear } from "date-fns";

export default function WeeklyCurrentPage() {
  const now = new Date();
  const year = getISOWeekYear(now);
  const week = getISOWeek(now);
  const weekStr = `${year}-W${String(week).padStart(2, "0")}`;
  redirect(`/digest/weekly/${weekStr}`);
}
