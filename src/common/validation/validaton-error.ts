import { TRPCError } from '@trpc/server';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export default function zodValidationError(zodSchema: ZodSchema<any>) {
  return (input: any) => {
    try {
      return zodSchema.parse(input);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err, {
          prefix: '',
        });
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: validationError.message,
        });
      }
      return err;
    }
  };
}
