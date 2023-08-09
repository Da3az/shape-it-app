import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import type { NextPage } from 'next';
import type { AppProps, AppType } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { DefaultLayout } from '~/components/DefaultLayout';
import '~/styles/globals.css';
import { trpc } from '~/utils/trpc';

const publicPages = [
  '/',
  '/auth/sign-in/[[...index]]',
  '/auth/sign-up/[[...index]]',
];

export type NextPageWithLayout<
  TProps = AppPropsWithLayout,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppPropsWithLayout) => {
  const { pathname } = router;

  // Check if the current route matches a public page

  const isPublicPage = publicPages.includes(pathname);

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <DefaultLayout>
        <Toaster />
        {page}
      </DefaultLayout>
    ));

  return (
    <ClerkProvider {...pageProps}>
      {isPublicPage ? (
        getLayout(<Component {...pageProps} router={router} />)
      ) : (
        <>
          <SignedIn>
            {getLayout(<Component {...pageProps} router={router} />)}
          </SignedIn>

          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
