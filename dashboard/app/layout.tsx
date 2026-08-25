import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotmart Recovery — Portfolio Demo",
  description: "Demonstração pública com dados sintéticos de um dashboard de recuperação Hotmart",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
