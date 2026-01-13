'use client'

import { useEffect } from 'react'
import type { Locale } from '@/i18n-config'

interface HtmlLangUpdaterProps {
  lang: Locale
  children: React.ReactNode
}

export function HtmlLangUpdater({ lang, children }: HtmlLangUpdaterProps) {
  useEffect(() => {
    // Update the lang attribute on the html element
    // This runs after hydration, but suppressHydrationWarning on html element prevents errors
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [lang])

  return <>{children}</>
}
