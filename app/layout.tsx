import { Rubik } from "@next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["hebrew"], variable: "--font-rubik" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full w-full" lang="he">
      <body className={`${rubik.variable} h-full w-full font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
