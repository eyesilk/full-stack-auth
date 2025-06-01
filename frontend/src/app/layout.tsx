import type { Metadata } from "next";
import "./styles/globals.css";
import localFont from "next/font/local";
import { AppProvider } from "./providers";

const FigtreeFont = localFont({
  src: "./fonts/Figtree-VariableFont_wght.ttf",
  variable: "--font-figtree",
  display: "swap",
});

const DancingScript = localFont({
  src: "./fonts/Pacifico-Regular.ttf",
  variable: "--font-dancingscript",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    absolute: "Full-Stack Auth",
    template: "%s | Nest + Next",
  },
  description:
    "A simple and secure full-stack application with user authentication, registration, and profile management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${FigtreeFont.variable} ${DancingScript.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
