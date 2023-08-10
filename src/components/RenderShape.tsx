import { Circle, Rect, Star } from 'react-konva';

const RenderShape = ({
  type,
  color,
  size: sizeLabel,
  x,
  y,
}: {
  type: string;
  color: string;
  size: string;
  x: string;
  y: string;
}) => {
  const size = sizeLabel === 'small' ? 50 : sizeLabel === 'medium' ? 100 : 150;

  switch (type) {
    case 'star':
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
    case 'circle':
      return (
        <Circle
          x={Number(x)}
          y={Number(y)}
          fill={color}
          stroke={color}
          radius={Number(size) / 2}
        />
      );
    case 'rectangle':
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
