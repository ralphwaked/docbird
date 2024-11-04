import "next-intl"

type Messages = typeof import("./en.json") & typeof import("./zod/en.json")

declare global {
  interface IntlMessages extends Messages {}
}
