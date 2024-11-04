import { appConfig } from "@docbird/config"
import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE } from "~/lib/i18n"

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localeCookie: {
    name: LOCALE_COOKIE,
    path: "/",
    sameSite: "lax",
    domain: appConfig.cookies.domain,
    secure: appConfig.cookies.secure,
  },
  localePrefix: {
    mode: "as-needed",
  },
})

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
