import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getLocale } from "@/lib/locale";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { WebVitals } from "@/components/analytics/WebVitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getSiteUrl } from "@/lib/config";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "MTL Pulse — Le pouls de Montréal",
  description:
    "Données en direct de Montréal: criminalité, travaux, permis, demandes 311 et plus.",
  alternates: {
    languages: {
      fr: "/",
      en: "/",
    },
  },
  openGraph: {
    title: "MTL Pulse — Le pouls de Montréal",
    description:
      "Données en direct de Montréal: criminalité, travaux, permis, demandes 311 et plus.",
    url: SITE_URL,
    siteName: "MTL Pulse",
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MTL Pulse — Le pouls de Montréal",
    description:
      "Données en direct de Montréal: criminalité, travaux, permis, demandes 311 et plus.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <WebVitals />
            <Header locale={locale} />
            <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
