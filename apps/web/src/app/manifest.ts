import type { MetadataRoute } from "next"
import { getTranslations } from "next-intl/server"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations()

  return {
    name: t("manifest.name"),
    short_name: t("manifest.short_name"),
    description: t("manifest.description"),
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "https://assets.docbird.co/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "https://assets.docbird.co/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
