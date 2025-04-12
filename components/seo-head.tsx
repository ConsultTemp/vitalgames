"use client"

import Head from "next/head"
import { useLanguage } from "@/components/language-provider"

type SEOHeadProps = {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  ogType?: string
  twitterCard?: string
}

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage = "/fleethero.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
}: SEOHeadProps) {
  const { lang } = useLanguage()
  const canonicalUrl = `https://pattycar.com/${lang}`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang === "it" ? "it_IT" : lang === "en" ? "en_US" : "ar_SA"} />
      <meta property="og:site_name" content="Patty Car" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@PattyCarMilano" />
      <meta name="twitter:site" content="@PattyCarMilano" />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="it" href="https://pattycar.com/it" />
      <link rel="alternate" hrefLang="en" href="https://pattycar.com/en" />
      <link rel="alternate" hrefLang="ar" href="https://pattycar.com/ar" />
      <link rel="alternate" hrefLang="x-default" href="https://pattycar.com/it" />
    </Head>
  )
}

