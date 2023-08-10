import { useUser } from '@clerk/nextjs';
import { Layer, Stage } from 'react-konva';
import RenderShape from './RenderShape';

const randomShapes = [
  {
    type: 'circle',
    color: 'red',
    size: '10',
    x: '10',
    y: '10',
  },
  {
    type: 'rectangle',
    color: 'blue',
    size: '10',
    x: '10',
    y: '10',
  },
  {
    type: 'star',
    color: 'green',
    size: '10',
    x: '10',
    y: '10',
  },
];

export default function ShapesPool() {
  const { isLoaded, isSignedIn, user } = useUser(); 
  return (
    <div className="flex flex-col mt-10">
      {new Array(10).fill(0).map((_, i) => (
        <div className="relative">
          <span className="absolute top-0 left-0 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-2xl mt-4 mb-8 overflow-hidden">
            {user?.imageUrl ? (
              <img
                className="w-full h-full m-auto rounded-full"
                src={user?.imageUrl}
              />
            ) : (
              <svg
                className="w-10 h-10 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
              </svg>
            )}
          </span>
          <Stage width={window.innerWidth} height={200}>
            <Layer>
              {randomShapes.map((shape) => (
                <RenderShape {...shape} />
              ))}
            </Layer>
          </Stage>
        </div>
      ))}
    </div>
  );
}
