/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { signUpSchema } from '~/common/validation/auth';
import { prisma } from '~/server/prisma';
import { protectedProcedure, publicProcedure, router } from '../trpc';
/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
});

export const authRouter = router({
    
  getSession: protectedProcedure.query(async ({ ctx }) => {
    const { user: userSession } = ctx.session;
    return userSession;
  }),

  sign: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
    const { username, email, password } = input;

    const exists = await prisma.user.findFirst({
      where: { email },
    });

    if (exists) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'User already exists.',
      });
    }

    const hashedPassword = await hash(password);

    const result = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return {
      email: result.email,
    };
  }),
});
