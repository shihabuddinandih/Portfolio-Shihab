import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shihab — Web & Game Developer",
  description: "Portofolio Shihab: proyek sistem informasi, platform turnamen, dan pengembangan game.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}