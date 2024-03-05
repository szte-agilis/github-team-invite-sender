import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub organization inviter",
  description: "Send GitHub organization invitations to users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body
        className={
          inter.className +
          " bg-gray-200 flex flex-col items-center justify-center h-screen"
        }
      >
        {children}
      </body>
    </html>
  );
}
