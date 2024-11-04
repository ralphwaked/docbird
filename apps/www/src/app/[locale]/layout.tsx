import "@docbird/ui/globals.css"

import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import Locale from "intl-locale-textinfo-polyfill"
import type { Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTimeZone } from "next-intl/server"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { PostHogPageView, PostHogProvider } from "@docbird/analytics"
import { cn } from "@docbird/ui"
import { ThemeProvider } from "@docbird/ui/themes"
import { Toaster } from "@docbird/ui/toaster"
import { TooltipProvider } from "@docbird/ui/tooltip"

import { routing } from "~/lib/i18n/routing"
import { constructMetadata } from "~/lib/metadata"

export async function generateMetadata() {
  return await constructMetadata()
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
}

export const preferredRegion = ["cdg1", "fra1", "iad1"]

export default async function Layout({
  children,
  params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  const timeZone = await getTimeZone()
  const messages = await getMessages()

  const { direction: dir } = new Locale(locale).textInfo

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        "touch-manipulation whitespace-pre-line overscroll-none font-sans antialiased",
      )}
      suppressHydrationWarning
    >
      <PostHogProvider>
        <body>
          <ThemeProvider>
            <NextIntlClientProvider
              locale={locale}
              messages={messages}
              timeZone={timeZone}
            >
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
              <Suspense>
                <PostHogPageView />
              </Suspense>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </PostHogProvider>
    </html>
  )
}
