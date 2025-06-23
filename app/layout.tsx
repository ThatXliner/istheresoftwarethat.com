import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import DataProviders from "./DataProviders";
import { createClient } from "@/lib/supabase/server";
import Footer from "./Footer";
import Header from "./Header";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Is There Software That...",
  description: "Find great software",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = await createClient();
  const { data, error } = await client.auth.getUser();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Providers>
            <Header isLoggedIn={!(error || !data?.user)} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
