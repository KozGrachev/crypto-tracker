import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Konstantin's Crypto Tracker",
  description: "Take-home task for Konstantin's interview with KasinoLabs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
