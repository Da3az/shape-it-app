import { useState } from 'react';
import toast from 'react-hot-toast';
import { Layer, Stage } from 'react-konva';
import { colors, shapesList, sizes } from '~/constants/shape';
import { ShapeType } from '~/types/shape';
import Button from './Button';
import CoordinateInput from './CoordinateInput';
import PropSelectContainer from './PropSelectContainer';
import RenderShape from './RenderShape';
import SelectShapePropertie from './SelectShapePropertie';
import Table from './Table';

export default function PostShapeForm() {
  const onSubmit = (data: any) => {
    data.preventDefault();
  };

  const [shapes, setShapes] = useState<ShapeType[]>([]);

  const [shape, setShape] = useState<Partial<ShapeType>>();

  const [isPreview, setIsPreview] = useState(true);

  const isShapeComplete =
    shape && shape.x && shape.y && shape.color && shape.type;

  const addShape = () => {
    if (isShapeComplete) {
      setShapes((shapes) => [...shapes, shape as ShapeType]);
      setShape(undefined);
      toast.success('Added');
      return;
    }
    toast.error('Select all properties for the shape first');
  };
  return (
    <form
      className=" p-8 flex flex-col gap-4 items-center justify-center"
      onSubmit={onSubmit}
    >
      <SelectShapePropertie
        title="Shape"
        list={shapesList}
        onChange={(el) => setShape((shape) => ({ ...shape, type: el }))}
        value={shape?.type}
      />
      <SelectShapePropertie
        title="Color"
        list={colors}
        onChange={(el) => setShape((shape) => ({ ...shape, color: el }))}
        value={shape?.color}
      />
      <SelectShapePropertie
        title="Size"
        list={sizes}
        onChange={(el) => setShape((shape) => ({ ...shape, size: el }))}
        value={shape?.size}
      />
      {/* Component with two inputs for two numerical values that will be on shape object */}

      <PropSelectContainer title="Coordinates">
        <li
          key="x"
          className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
        >
          <CoordinateInput
            id="x"
            name="x"
            label="X"
            value={shape?.x}
            onChange={(el) => {
              setShape((shape) => ({ ...shape, x: el }));
            }}
          />
        </li>
        <li
          key="y"
          className="w-full border-b border-gray-200 sm:border-b-0  dark:border-gray-600"
        >
          <CoordinateInput
            id="y"
            name="y"
            label="Y"
            value={shape?.y}
            onChange={(el) => setShape((shape) => ({ ...shape, y: el }))}
          />
        </li>
      </PropSelectContainer>
      <div className="flex gap-4 flex-wrap">
        <Button onClick={addShape}>Add Shape</Button>
        <Button onClick={() => setIsPreview(true)}>Preview</Button>
        <Button onClick={() => setIsPreview(false)}>List</Button>
        <Button onClick={() => {}}>Shape it</Button>
      </div>
      {isPreview ? (
        shapes?.length + (isShapeComplete ? 1 : 0) > 0 && (
          <Stage width={500} height={500}>
            <Layer>
              {shapes.map((shape) => (
                <RenderShape {...shape} />
              ))}
              {isShapeComplete && <RenderShape {...(shape as ShapeType)} />}
            </Layer>
          </Stage>
        )
      ) : (
        <Table
          headings={['Shape', 'Color', 'Size', 'X', 'Y']}
          rows={shapes.map((shape) => [
            shape.type.toUpperCase(),
            shape.color,
            shape.size,
            shape.x,
            shape.y,
          ])}
        />
      )}
    </form>
  );
}
