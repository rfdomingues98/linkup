"use client";

import type { z } from "zod";
import React from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@linkup/ui";
import { Button } from "@linkup/ui/button";
import { Form, FormControl, FormField, FormItem } from "@linkup/ui/form";
import { Input } from "@linkup/ui/input";
import { authSchema } from "@linkup/validators";

import { Icons } from "~/app/_components/icons";
import { catchClerkError } from "~/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  type Inputs = z.infer<typeof authSchema>;

  const { isLoaded, signIn, setActive } = useSignIn();
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  function onSubmit(data: Inputs) {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const result = await signIn.create({
          identifier: data.identifier,
          password: data.password,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          router.push(`${window.location.origin}/`);
        } else {
          toast.error(
            "Sorry, something went wrong. Please try again, or refresh the page.",
          );
        }
      } catch (err) {
        catchClerkError(err);
      }
    });
  }

  return (
    <div>
      <span className="select-none font-bold text-white">
        Log in with your Instagram account
      </span>

      <Form {...form}>
        <form
          className="flex w-full flex-col gap-1.5 py-4 text-start"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="identifier"
            render={({ field, formState }) => {
              const error = formState.errors.identifier;
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      autoFocus
                      className={cn(
                        "h-14 min-h-min rounded-xl border-none bg-[#1e1e1e] px-4 text-[15px] font-medium tracking-normal text-white outline-none ring-0 placeholder:text-[#777777] focus-visible:ring-1 focus-visible:ring-[#393939] focus-visible:ring-offset-0 dark:focus-visible:ring-[#393939]",
                        {
                          "placeholder:text-red-700 focus-visible:ring-red-700 dark:focus-visible:ring-red-700":
                            error,
                        },
                      )}
                      placeholder={
                        error ? error.message : "Username, phone or email"
                      }
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, formState }) => {
              const error = formState.errors.password;
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      className={cn(
                        "h-14 min-h-min rounded-xl border-none bg-[#1e1e1e] px-4 text-[15px] font-medium tracking-normal text-white outline-none ring-0 placeholder:text-[#777777] focus-visible:ring-1 focus-visible:ring-[#393939] focus-visible:ring-offset-0 dark:focus-visible:ring-[#393939]",
                        {
                          "placeholder:text-red-700 focus-visible:ring-red-700 dark:focus-visible:ring-red-700":
                            error,
                        },
                      )}
                      placeholder={error ? error.message : "Password"}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="font my-1 h-14 rounded-xl bg-white text-base font-semibold text-black hover:bg-white"
          >
            {isPending ? (
              <Icons.loading className="h-10 w-10" aria-hidden="true" />
            ) : (
              "Log in"
            )}
            <span className="sr-only">Sign in</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
