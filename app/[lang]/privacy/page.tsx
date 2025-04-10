import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import type { Metadata } from "next"
import Link from "next/link"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
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
}

export default async function PrivacyPage(props: { params: Params }) {
  const params = await props.params
  const dictionary = await getDictionary(params.lang)
  const privacy = dictionary.privacy
  const sections = privacy.sections

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-light mb-4 atacama">{privacy.title}</h1>
        <p className="text-sm text-darkGray font-light max-w-2xl mx-auto">{privacy.subtitle}</p>
        <p className="text-xs text-darkGray mt-2">{privacy.lastUpdated}</p>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto bg-white">
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.introduction.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.introduction.content}</p>
          </section>

          {/* Data Controller */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.dataController.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.dataController.content}</p>
          </section>

          {/* Developer Responsibility */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.developerResponsibility.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.developerResponsibility.content}</p>
          </section>

          {/* Purposes of Processing */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.purposesOfProcessing.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.purposesOfProcessing.content}</p>
            <ul className="list-disc pl-6 text-sm text-darkGray">
              {sections.purposesOfProcessing.items.map((item: string, index: number) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Legal Basis */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.legalBasis.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.legalBasis.content}</p>
            <ul className="list-disc pl-6 text-sm text-darkGray">
              {sections.legalBasis.items.map((item: string, index: number) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Data Types */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.dataTypes.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.dataTypes.content}</p>
            <ul className="list-disc pl-6 text-sm text-darkGray">
              {sections.dataTypes.items.map((item: string, index: number) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Processing Methods */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.processingMethods.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.processingMethods.content}</p>
          </section>

          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.dataRetention.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.dataRetention.content}</p>
          </section>

          {/* Data Sharing */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.dataSharing.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.dataSharing.content}</p>
            <ul className="list-disc pl-6 text-sm text-darkGray mb-4">
              {sections.dataSharing.items.map((item: string, index: number) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-darkGray">{sections.dataSharing.additionalContent}</p>
          </section>

          {/* International Transfers */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.internationalTransfers.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.internationalTransfers.content}</p>
          </section>

          {/* User Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.userRights.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.userRights.content}</p>
            <ul className="list-disc pl-6 text-sm text-darkGray mb-4">
              {sections.userRights.items.map((item: string, index: number) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-darkGray">{sections.userRights.additionalContent}</p>
          </section>

          {/* DPO */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.dpo.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.dpo.content}</p>
          </section>

          {/* Cookie Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.cookiePolicy.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.cookiePolicy.content}</p>

            <h3 className="text-xl font-light mb-3">{sections.cookiePolicy.typesTitle}</h3>
            {sections.cookiePolicy.types.map((type: any, index: number) => (
              <div key={index} className="mb-4">
                <h4 className="text-base font-medium mb-1">{type.title}</h4>
                <p className="text-sm text-darkGray">{type.description}</p>
              </div>
            ))}

            <h3 className="text-xl font-light mb-3 mt-6">{sections.cookiePolicy.managementTitle}</h3>
            {sections.cookiePolicy.management.map((item: any, index: number) => (
              <div key={index} className="mb-4">
                <h4 className="text-base font-medium mb-1">{item.title}</h4>
                <p className="text-sm text-darkGray">{item.description}</p>
              </div>
            ))}

            <h3 className="text-xl font-light mb-3 mt-6">{sections.cookiePolicy.thirdPartyTitle}</h3>
            <p className="text-sm text-darkGray">{sections.cookiePolicy.thirdParty}</p>
          </section>

          {/* Changes */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.changes.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.changes.content}</p>
          </section>

          {/* User Responsibility */}
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">{sections.userResponsibility.title}</h2>
            <p className="text-sm text-darkGray mb-4">{sections.userResponsibility.content}</p>
          </section>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              href={`/${params.lang}`}
              className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
            >
              {dictionary.navigation[0].label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
