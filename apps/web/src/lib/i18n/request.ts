import { parse as parseALP } from "accept-language-parser"
import { lookup } from "bcp-47-match"
import { IntlErrorCode } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { cookies, headers } from "next/headers"

import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE } from "~/lib/i18n"

export default getRequestConfig(async () => {
  const cookiesStore = await cookies()
  const headersStore = await headers()

  const session = null as any

  let locale: string | undefined = session?.user?.locale ?? undefined

  if (!locale) {
    locale = cookiesStore.get(LOCALE_COOKIE)?.value

    if (!locale) {
      const acceptLanguage = headersStore.get("accept-language")

      const languages = acceptLanguage ? parseALP(acceptLanguage) : []

      const code = languages[0]?.code ?? ""
      const region = languages[0]?.region ?? ""

      const testedCode = /^[a-zA-Z]+$/.test(code) ? code : DEFAULT_LOCALE
      const testedRegion = /^[a-zA-Z0-9]+$/.test(region) ? region : ""

      const requestedLocale = `${testedCode}${testedRegion !== "" ? "-" : ""}${testedRegion}`

      locale = lookup(LOCALES, requestedLocale) ?? requestedLocale
    }

    if (!locale || !LOCALES.includes(locale)) {
      locale = DEFAULT_LOCALE
    }
  }

  const timezone = headersStore.get("x-vercel-ip-timezone")

  return {
    locale,
    timezone,
    messages: {
      ...(await import(`../../messages/${locale}.json`)).default,
      ...(await import(`../../messages/zod/${locale}.json`)).default,
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join(".")

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return `${path} is not yet translated`
      }

      return `Dear developer, please fix this message: ${path}`
    },
  }
})
