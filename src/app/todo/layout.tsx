import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="m-20 flex flex-col items-center justify-start w-full">
        {children}
    </main>
  );
}
