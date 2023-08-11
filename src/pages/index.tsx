import Link from 'next/link';
import { NextPageWithLayout } from './_app';

import dynamic from 'next/dynamic';
import Button from '~/components/Button';

const ShapesPool = dynamic(() => import('~/components/ShapesPool'), {
  ssr: false,
});

const IndexPage: NextPageWithLayout = () => {

  return (
    <div className="flex flex-col  ">
      <div className="relative flex flex-col h-[var(--top-height)] ">
        <div className=" flex flex-col flex-grow justify-center gap-4 p-8">
          <h1 className="text-white text-center text-base sm:text-xl">
            This is shape.it , built using Nextjs13 , Trpc , Tailwindcss ,
            Konva , Prisma , .... (tools never end) .
            <br />
            <br />
            You can check what other shaped or you can shape it yourself .
          </h1>
          <div className=" mt-auto mx-auto ">
            <Link href="/shapeit">
              <Button>Shape it</Button>
            </Link>
          </div>
        </div>
       
        <span className="absolute z-50 top-[100%] left-0  h-24 w-full bg-gradient-to-b from-slate-950 to-transparent" />
      </div>

      <div className="overflow-y-scroll h-[calc(100vh-var(--nav-height)-var(--top-height))] bg-slate-950">
        <ShapesPool  />
      </div>
    </div>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
