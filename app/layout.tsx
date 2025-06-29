import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight:["100","500", "300"]
});


export const metadata: Metadata = {
  title: "Comet",
  description: "Comet is an app to chat and video call yout friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${urbanist.variable} antialiased h-full`}
      >
        {children}
      </body>
    </html>
  );
}
