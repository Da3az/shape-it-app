import { Shape } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Layer, Stage } from 'react-konva';
import { colors, shapesList, sizes } from '~/constants/shape';
import { trpc } from '~/utils/trpc';
import Button from './Button';
import CoordinateInput from './CoordinateInput';
import PropSelectContainer from './PropSelectContainer';
import RenderShape from './RenderShape';
import SelectShapePropertie from './SelectShapePropertie';
import Spinner from './Spinner';
import Table from './Table';

const RemoveShapeButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center justify-center">
    <svg
      className="h-5 w-5 text-red-300"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />{' '}
      <line x1="18" y1="6" x2="6" y2="18" />{' '}
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>
);

export default function PostShapeForm() {

  const utils = trpc.useContext();

  const onSubmit = (data: any) => {
    data.preventDefault();
  };

  const [shapes, setShapes] = useState<Shape[]>([]);

  const [shape, setShape] = useState<Partial<Shape>>();

  const [isPreview, setIsPreview] = useState(true);

  const isShapeComplete =
    !!shape &&
    !!(shape.x || shape.x === 0) &&
    !!(shape.y || shape.y === 0) &&
    !!shape.color &&
    !!shape.type &&
    !!shape.size;

  const addShape = () => {
    if (isShapeComplete) {
      setShapes((shapes) => [...shapes, shape as Shape]);
      setShape(undefined);
      toast.success('Added');
      return;
    }
    toast.error('Select all properties for the shape first');
  };

  const { mutateAsync: postShape, isLoading } = trpc.shape.add.useMutation({
    async onSuccess() {
      setShapes((shapes) => [...shapes, shape as Shape]);
      setShapes([]);
      setShape(undefined);
      await utils.shape.list.invalidate();
      toast.success(
        <span>
          Shaped successfully , Check it out{' '}
          <Link href={'/'}>
            <b className="text-blue-600 underline">Here</b> , or hit the Logo
          </Link>
        </span>,
      );
      return;
    },

    async onError(error) {
      toast.error(error.message || 'Something weird happend , try again later');
      return;
    },
  });

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
              setShape((shape) => ({ ...shape, x: Number(el) }));
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
            onChange={(el) =>
              setShape((shape) => ({ ...shape, y: Number(el) }))
            }
          />
        </li>
      </PropSelectContainer>
      <div className="flex gap-4 flex-wrap">
        <Button onClick={addShape}>Add Shape</Button>
        <Button onClick={() => setIsPreview(true)}>Preview</Button>
        <Button onClick={() => setIsPreview(false)}>List</Button>
        <Button onClick={() => postShape({ shapes })} buttonColor="red">
          {isLoading ? <Spinner /> : 'Shape it'}
        </Button>
      </div>

      {isPreview ? (
        shapes?.length + (isShapeComplete ? 1 : 0) > 0 && (
          <div className="flex w-full  justify-center border-gray-700">
            <Stage width={250} height={200}>
              <Layer>
                {shapes.map((shape) => (
                  <RenderShape {...shape} />
                ))}
                {isShapeComplete && <RenderShape {...(shape as Shape)} />}
              </Layer>
            </Stage>
          </div>
        )
      ) : (
        <Table
          headings={['Shape', 'Color', 'Size', 'X', 'Y', '🖊️']}
          rows={shapes.map((shape, index) => [
            shape.type.toUpperCase(),
            shape.color,
            shape.size,
            shape.x,
            shape.y,
            <RemoveShapeButton
              onClick={() =>
                setShapes((shapes) => shapes.filter((el, j) => j !== index))
              }
            />,
          ])}
        />
      )}
    </form>
  );
}
