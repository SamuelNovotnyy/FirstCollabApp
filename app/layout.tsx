import type { Metadata } from "next";
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "CoolPageYeahhhhhh",
  description: "My collaborative page where people come together to be silly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="retro">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
