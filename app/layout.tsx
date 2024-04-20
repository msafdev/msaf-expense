import { GeistSans } from "geist/font/sans";
import Head from "next/head";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <Head>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport" />
      </Head>
      <body className="dark bg-background text-foreground min-h-screen flex flex-col items-center w-full">
        <main className="flex flex-col w-full flex-1">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
