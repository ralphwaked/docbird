import { type NextRequest, NextResponse } from "next/server"

import { appConfig } from "@docbird/config"

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. Metadata files: favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest, .well-known
     */
    "/((?!api/|_next/|_proxy/|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|.well-known).*)",
  ],
}

export default async function (req: NextRequest) {
  const domain = (req.headers.get("host") as string)
    .replace("www.", "")
    .toLowerCase()

  const path = req.nextUrl.pathname

  const searchParams = req.nextUrl.searchParams.toString()
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : ""

  const fullPath = `${path}${searchParamsString}`

  if (domain === new URL(appConfig.appUrl).host) {
    return NextResponse.rewrite(new URL(`/app${fullPath}`, req.url))
  }

  if (domain === new URL(appConfig.apiUrl).host) {
    return NextResponse.rewrite(new URL(`/api${fullPath}`, req.url))
  }

  if (domain === new URL(appConfig.adminUrl).host) {
    return NextResponse.rewrite(new URL(`/admin${fullPath}`, req.url))
  }

  return NextResponse.next()
}
