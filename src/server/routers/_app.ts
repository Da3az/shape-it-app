/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { shapeRouter } from './shape';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  shape: shapeRouter,
});

export type AppRouter = typeof appRouter;
