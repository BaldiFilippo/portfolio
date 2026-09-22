import type { Metadata, Viewport } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Filippo Baldi — Portfolio",
  description:
    "UX/UI and interaction designer, front-end developer. Brescia, Italy.",
};

// Without this the browser tints its chrome from the page background, which
// lands on a washed-out grey.
export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceMono.variable} bg-paper antialiased`}
    >
      <body className="text-ink">
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
