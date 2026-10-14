import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Malayalam, VT323 } from "next/font/google";
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

/**
 * The pixel face, for the drawn-scene POC only. Self-hosted by next/font
 * like the others, and only fetched on pages that actually use it, so it
 * costs the rest of the app nothing.
 *
 * VT323 rather than Silkscreen or Pixelify Sans. Silkscreen is caps-only,
 * so every spoken line shouted. Pixelify Sans keeps its lowercase but its
 * letterforms for e, c and n are fussy at reading size. VT323 is the most
 * legible of the pixel faces, and it is monospaced: in a language where
 * vowel length is the meaning, `chaya` and `chaaya` should be countable at
 * a glance, and equal-width letters make that easy.
 */
const pixelFace = VT323({
  variable: "--font-pixel-face",
  weight: "400",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${notoMalayalam.variable} ${pixelFace.variable} antialiased`}
    >
      <body>
        {children}
        <AppInit />
        <InstallPrompt />
      </body>
    </html>
  );
}
