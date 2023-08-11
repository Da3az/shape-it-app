import { ShapeSizeEnum, ShapeTypeEnum } from "@prisma/client";

export type ShapeType = {
  type: ShapeTypeEnum;
  color: string;
  size: ShapeSizeEnum;
  x: string;
  y: string;
};
