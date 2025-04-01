import { Outfit } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";


const currentLang = "ar";
const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
    <body className={`${outfit.variable} dark:bg-gray-900`}>
      <ThemeProvider>
        <SidebarProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </SidebarProvider>
      </ThemeProvider>
    </body>
  </html>
  );
}
