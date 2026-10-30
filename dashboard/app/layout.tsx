import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Central de Performance — Demo de Portfólio",
  description:
    "Demonstração pública com dados sintéticos de recuperação de compras, receita e eventos Hotmart",
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
