export const i18n = {
  defaultLocale: "it",
  locales: ["it", "en", "ar"],
} as const

export type Locale = (typeof i18n)["locales"][number]

