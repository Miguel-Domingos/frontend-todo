import { format, formatDistance, parseISO } from "date-fns";

export default function useDate() {
  function FormattedDate(date: Date | string) {
    if (typeof date == "string") {
      return date.split("T")[0];
    }
    return format(parseISO(date.toISOString()), "yyyy-MM-dd");
  }

  return {
    FormattedDate,
  };
}
