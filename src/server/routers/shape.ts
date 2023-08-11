/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { clerkClient } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server/clerkClient';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { drawSchema } from '~/common/validation/shape';
import zodValidationError from '~/common/validation/validaton-error';
import { prisma } from '~/server/prisma';
import { publicProcedure, router } from '../trpc';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultDrawSelect = Prisma.validator<Prisma.DrawSelect>()({
  id: true,
  createdAt: true,
  shapes: {
    select: {
      id: true,
      x: true,
      y: true,
      size: true,
      color: true,
      type: true,
      createdAt: true,
    },
  },
  userId: true,
});

const defaultDrawCreateSelect = Prisma.validator<Prisma.DrawSelect>()({
  shapes: {
    select: {
      id: true,
    },
  },
});

export const shapeRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 3;
      const { cursor } = input;

      const items = await prisma.draw.findMany({
        select: defaultDrawSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      let users: User[] = [];

      try {
        if (items.length) {
          const userIds = items
            .filter((item) => !!item.userId)
            .map((item) => item.userId as string);
          users = await clerkClient.users.getUserList({
            userId: userIds,
          });
        }
      } catch (error) {
        console.log('Error fetching user data : ', error);
      }

      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      items.map((item) => ({
        ...item,
        user: users.find((user) => user.id === item.userId) || null,
      }));

      const addUsersToDraws = async (draws: typeof items) => {
        const userIds = draws.map((draw) => draw.userId as string);

        const users = await clerkClient.users.getUserList({
          userId: userIds,
        });

        return draws.map((draw) => {
          const user = users.find((user) => user.id === draw.userId) || null;
          return {
            ...draw,
            user: {
              id: user?.id,
              imageUrl: user?.imageUrl,
              userName: user?.username,
            },
          };
        });
      };

      const drawsWithUsers = await addUsersToDraws(items);

      return {
        items: drawsWithUsers,
        nextCursor,
      };
    }),

  add: publicProcedure
    .input(zodValidationError(drawSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        const draw = await prisma.draw.create({
          data: {
            shapes: {
              create: input.shapes,
            },
            userId: ctx.auth.userId,
          },
          select: defaultDrawCreateSelect,
        });

        return draw;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        });
      }
    }),
});
