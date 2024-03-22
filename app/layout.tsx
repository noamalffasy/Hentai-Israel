import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Rubik } from "next/font/google";

import "./globals.css";

const rubik = Rubik({ subsets: ["hebrew"], variable: "--font-rubik" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full w-full" lang="he">
      <head></head>
      <body className={`${rubik.variable} h-full w-full font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
