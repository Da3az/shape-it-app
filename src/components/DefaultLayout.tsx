import Head from 'next/head';
import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Shape it app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">{children}</main>
    </>
  );
};
