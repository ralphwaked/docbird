import { getTranslations } from "next-intl/server"
import Link from "next/link"

import { appConfig } from "@docbird/config"
import { cn } from "@docbird/ui"
import { buttonVariants } from "@docbird/ui/button"
import { Icons } from "@docbird/ui/icons"

import { constructMetadata } from "~/lib/metadata"

export async function generateMetadata() {
  return await constructMetadata({
    getTitle: (t) => t("not_found.metadata.title"),
  })
}

export default async function NotFound() {
  const t = await getTranslations("not_found")

  return (
    <div>
      <header className="w-full fixed left-0 right-0">
        <div className="ml-5 mt-4 md:ml-10 md:mt-10">
          <Link href={appConfig.appUrl}>
            <Icons.Logo className="h-8 w-auto" />
          </Link>
        </div>
      </header>

      <div className="flex h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-sm flex-col py-8">
          <div className="flex w-full flex-col relative">
            <div className="pb-4 inline-block bg-clip-text">
              <h1 className="font-medium pb-1 text-4xl">{t("title")}</h1>
            </div>

            <p className="font-medium pb-1 text-2xl text-muted-foreground">
              {t("description")}
            </p>

            <div className="pointer-events-auto mt-6 flex flex-col mb-6">
              <Link
                className={cn(buttonVariants())}
                href={appConfig.appUrl}
                prefetch
              >
                {t("button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
