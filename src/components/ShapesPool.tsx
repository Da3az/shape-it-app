import { Fragment } from 'react';
import { Layer, Stage } from 'react-konva';
import { trpc } from '~/utils/trpc';
import Button from './Button';
import RenderShape from './RenderShape';
import Spinner from './Spinner';

const RandomwUserImage = () => (
  <svg
    className="w-10 h-10 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
  </svg>
);
export default function ShapesPool() {
  const shapeQuery = trpc.shape.list.useInfiniteQuery(
    {
      limit: 3,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  return (
    <div className="flex flex-col relative px-8 mt-2">
      {shapeQuery.status === 'loading' ? (
        <div className="mx-auto mt-16">
          <Spinner width={40} height={40} />
        </div>
      ) : (
        <div className="z-50 h-0 sticky top-4 sm:top-10 right-10 w-full flex justify-end">
          <div className="relative ">
            <Button
              buttonColor="cyan"
              onClick={() => shapeQuery.fetchPreviousPage()}
              disabled={
                !shapeQuery.hasPreviousPage || shapeQuery.isFetchingPreviousPage
              }
            >
              {shapeQuery.isFetchingPreviousPage ? (
                <>
                  Load More <Spinner />
                </>
              ) : shapeQuery.hasPreviousPage ? (
                'Load More'
              ) : (
                'Nothing more to load'
              )}
            </Button>
          </div>
        </div>
      )}

      {shapeQuery.data?.pages?.map((page, index) => (
        <Fragment key={page.items[0]?.id ?? index}>
          {page.items.map((item) => (
            <div key={item.id} className="relative flex justify-center mt-6">
              <span className="absolute top-0 left-0 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-2xl mt-4 mb-8 overflow-hidden">
                {item?.user?.imageUrl ? (
                  <img
                    className="w-full h-full m-auto rounded-full"
                    src={item?.user?.imageUrl}
                  />
                ) : (
                  <RandomwUserImage />
                )}
              </span>
              <Stage width={250} height={300}>
                <Layer>
                  {item?.shapes?.map((shape) => (
                    <RenderShape key={shape.id} {...shape} />
                  ))}
                </Layer>
              </Stage>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
