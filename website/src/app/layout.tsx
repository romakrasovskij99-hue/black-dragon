import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Black Dragon",
  description:
    "Research terminal for deterministic historical backtest verification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
