import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import type { Metadata } from "next"
import { OptimizedLink as Link } from "@/components/optimized-link"

type Params = Promise<{ lang: Locale }>

/* export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const dictionary = await getDictionary(params.lang)

  return {
    title: `${dictionary.privacy.title} | Patty Car`,
    description: dictionary.privacy.subtitle,
    alternates: {
      canonical: `/${params.lang}/privacy`,
      languages: {
        "en-US": "/en/privacy",
        "it-IT": "/it/privacy",
        "ar-SA": "/ar/privacy",
      },
    },
  }
} */

export default async function PrivacyPage(props: { params: Params }) {


  return (
    <div className="pt-24 pb-16"> </div>
  )
}
