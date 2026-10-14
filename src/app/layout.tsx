import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Malayalam } from "next/font/google";
import { AppInit } from "@/components/app/AppInit";
import { InstallPrompt } from "@/components/app/InstallPrompt";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoMalayalam = Noto_Sans_Malayalam({
  variable: "--font-noto-malayalam",
  subsets: ["malayalam"],
});

export const metadata: Metadata = {
  title: "Learn Malayalam",
  description: "Learn conversational Malayalam, the way Kerala actually talks.",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1d7044",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${notoMalayalam.variable} antialiased`}
    >
      <body>
        {children}
        <AppInit />
        <InstallPrompt />
      </body>
    </html>
  );
}
