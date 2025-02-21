"use client";

import { FC, PropsWithChildren } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <NextTopLoader />
    </>
  );
};
