import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Filippo Baldi",
  description:
    "Portfolio of Filippo Baldi, UX/UI and interaction designer and front-end developer.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:bg-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
