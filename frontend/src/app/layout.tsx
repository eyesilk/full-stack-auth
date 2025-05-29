import type { Metadata } from "next";
import "./styles/globals.css";
import localFont from "next/font/local";
import AppProvider from "./providers/AppProvider";

const JetBrainsNerd = localFont({
  src: "./fonts/Figtree-VariableFont_wght.ttf",
  variable: "--font-jetbrains",
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
      <body className={`${JetBrainsNerd.variable} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
