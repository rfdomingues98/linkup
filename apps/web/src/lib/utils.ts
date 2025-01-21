import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { z } from "zod";

import { toast } from "@linkup/ui/toast";

export function catchClerkError(err: unknown) {
  const unknownErr = "Something went wrong, please try again later.";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (isClerkAPIResponseError(err)) {
    return toast.error(err.errors[0]?.longMessage ?? unknownErr);
  } else {
    return toast.error(unknownErr);
  }
}

export const inClient = typeof window !== "undefined";
export const userLocale = inClient ? navigator.language : "en-US";

export const formatNumber = (
  number: number,
  options?: Intl.NumberFormatOptions,
) => {
  const defaultOptions: Intl.NumberFormatOptions = {
    notation: "compact",
  };
  return new Intl.NumberFormat(userLocale, {
    ...defaultOptions,
    ...options,
  }).format(number);
};

export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions,
) => {
  return new Intl.DateTimeFormat(userLocale, options).format(date);
};
