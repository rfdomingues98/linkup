"use client";

import { inClient } from ".";

export const FormattedDateTime = ({ date }: { date: Date }) => {
  const currentTime = date.toLocaleString(
    inClient ? navigator.language : "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    },
  );
  return <span>{currentTime}</span>;
};
