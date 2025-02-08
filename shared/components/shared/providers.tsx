"use client";

import { FC, PropsWithChildren } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children} <Toaster />
      <NextTopLoader />
    </>
  );
};
