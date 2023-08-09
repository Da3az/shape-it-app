/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './prisma';

import { getAuth } from '@clerk/nextjs/server';

import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from '@clerk/nextjs/server';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: typeof prisma;
  auth: SignedInAuthObject | SignedOutAuthObject;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return _opts;
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

export async function createContext(
  ctx: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching
  const { req, res } = ctx;


  return await createContextInner({
    req,
    res,
    auth: getAuth(req),
    prisma,
  });
}
