import { getTranslations } from "next-intl/server"

import { Icons } from "@docbird/ui/icons"

import { constructMetadata } from "~/lib/metadata"

export async function generateMetadata() {
  return await constructMetadata({
    getTitle: (t) => t("commin_soon.metadata.title"),
  })
}

export default async function Page() {
  const t = await getTranslations("commin_soon")

  return (
    <div>
      <div className="flex h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-sm flex-col py-8">
          <div className="flex w-full flex-col items-center justify-center">
            <Icons.LogoIcon className="h-12 w-12" />
            <div className="h-6" />
            <div className="pb-4 text-center">
              <h1 className="font-medium pb-1 text-4xl">{t("title")}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
