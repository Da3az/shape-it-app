import { ShapeSizeEnum, ShapeTypeEnum } from '@prisma/client';
import * as z from 'zod';

export const shapeSchema = z.object({
  x: z.number().int(),
  y: z.number().int(),
  size: z.nativeEnum(ShapeSizeEnum),
  type: z.nativeEnum(ShapeTypeEnum),
  color: z.string(),
})

export const drawSchema = z.object({
  shapes: z.array(shapeSchema).min(1),
});
