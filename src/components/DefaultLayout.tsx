import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <>
      <Head>
        <title>Shape it app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <div className="grow-1 items-center  px-8 justify-between flex  h-[var(--nav-height)]">
          <Link href="/">
            <h1 className="text-2xl sm:text-5xl font-semibold text-blue-200 ">
              Shape.it
            </h1>
          </Link>
          {!isSignedIn ? (
            <SignInButton mode="modal" redirectUrl="/">
              <button
                type="button"
                className=" hover:bg-blue-100 transition bg-blue-200 flex items-center gap-4 p-2 h-10  w-28 text-sm text-black justify-center rounded"
              >
                Sign In
              </button>
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
        <div className=" flex-1 grow-1 ">{children}</div>
      </main>
    </>
  );
};
