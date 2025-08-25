import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ColorProvider } from "@/contexts/ColorContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daksh Sangal",
  description: "Daksh Sangal's Den",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/favicon.ico" sizes="any" />
      </head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-[100%] flex items-center justify-center min-h-[100vh]">
          <div className="w-[100%] pl-[15vw] pr-[15vw] min-h-[100vh]">
            <ColorProvider>
              <Nav />
              {children}
            </ColorProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
