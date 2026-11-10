import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Filippo Baldi",
  description:
    "Portfolio of Filippo Baldi, UX/UI and interaction designer and front-end developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
