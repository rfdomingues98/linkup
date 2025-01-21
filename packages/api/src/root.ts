import { authRouter } from "./router/auth";
import { postsRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
