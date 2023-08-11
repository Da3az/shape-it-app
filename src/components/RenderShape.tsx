import { ShapeSizeEnum, ShapeTypeEnum } from '@prisma/client';
import { Circle, Rect, Star } from 'react-konva';

const RenderShape = ({
  type,
  color,
  size: sizeLabel,
  x,
  y,
}: {
  type: ShapeTypeEnum;
  color: string;
  size: ShapeSizeEnum;
  x: string | number;
  y: string | number;
}) => {
  const size =
    sizeLabel === ShapeSizeEnum.SMALL
      ? 50
      : sizeLabel === ShapeSizeEnum.MEDIUM
      ? 100
      : 150;

  switch (type) {
    case ShapeTypeEnum.STAR:
      return (
        <Star
          x={Number(x)}
          y={Number(y)}
          fill={color}
          stroke={color}
          innerRadius={Number(size) / 4}
          outerRadius={Number(size) / 2}
          numPoints={5}
        />
      );
    case ShapeTypeEnum.CIRCLE:
      return (
        <Circle
          x={Number(x)}
          y={Number(y)}
          fill={color}
          stroke={color}
          radius={Number(size) / 2}
        />
      );
    case ShapeTypeEnum.RECTANGLE:
      return (
        <Rect
          x={Number(x)}
          y={Number(y)}
          fill={color}
          stroke={color}
          width={Number(size)}
          height={Number(size)}
        />
      );
    default:
      return null;
  }
};

export default RenderShape;
