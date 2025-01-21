import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const urbanist = Urbanist({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "ResumeForge",
  description: "AI powered resume builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("bg-background", urbanist.className)}
      >
        {children}
      </body>
    </html>
  );
}
