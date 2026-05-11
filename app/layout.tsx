import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeTester | AI QA mission control",
  description:
    "CodeTester is an AI-native QA platform for autonomous browser testing, realistic bug evidence, PR release gates, and production monitoring."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Space+Grotesk:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-white antialiased selection:bg-abyssal-hellfire-magma selection:text-white">
        {children}
      </body>
    </html>
  );
}

