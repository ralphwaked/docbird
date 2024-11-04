import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { appConfig } from "@docbird/config"

export async function constructMetadata({
  getTitle,
  getDescription,
  image = "https://assets.docbird.co/thumbnail.jpg",
  video,
  icons = [
    {
      rel: "apple-touch-icon",
      sizes: "32x32",
      url: "https://assets.docbird.co/favicons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "https://assets.docbird.co/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "https://assets.docbird.co/favicons/favicon-16x16.png",
    },
  ],
  canonicalUrl,
  noIndex = false,
}: {
  getTitle?: (t: Awaited<ReturnType<typeof getTranslations<never>>>) => string
  getDescription?: (
    t: Awaited<ReturnType<typeof getTranslations<never>>>,
  ) => string
  image?: string | null
  video?: string | null
  icons?: Metadata["icons"]
  canonicalUrl?: string
  noIndex?: boolean
} = {}): Promise<Metadata> {
  const t = await getTranslations()

  const title = getTitle?.(t) || t("metadata.title")
  const description = getDescription?.(t) || t("metadata.description")

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: image,
      }),
      ...(video && {
        videos: video,
      }),
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: "summary_large_image",
        images: [image],
      }),
      ...(video && {
        player: video,
      }),
      creator: "@docbird",
    },
    icons,
    keywords: [],
    metadataBase: new URL(appConfig.baseUrl),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
