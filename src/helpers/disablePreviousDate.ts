// utils/dateHelpers.ts
import { DateValue } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";

export const disablePreviousDates = () => {
  const now = today(getLocalTimeZone());

  return (date: DateValue) => {
    return date.compare(now) <= 0;
  };
};
