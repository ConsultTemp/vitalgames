import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { OptimizedLink as Link } from "@/components/optimized-link"

type Params = Promise<{ lang: Locale }>

export default async function PrivacyPage(props: { params: Params }) {
  const params = await props.params
  const dictionary = await getDictionary(params.lang)

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-xs text-muted-foreground">
                <li>
                  <Link href={`/${params.lang}`} className="hover:text-foreground">
                    {dictionary.common.breadcrumbs.home}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground">{dictionary.privacy.title}</li>
              </ol>
            </nav>

            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{dictionary.privacy.title}</h1>
              <p className="text-base text-muted-foreground max-w-3xl">
                {dictionary.privacy.sections.introduction.content}
              </p>
            </div>

            {/* 1. Introduction */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {dictionary.privacy.sections.introduction.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dictionary.privacy.sections.introduction.content}
              </p>
            </section>

            {/* 2. Data Collection */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {dictionary.privacy.sections.dataCollection.title}
              </h2>

              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-medium mb-2 text-foreground">
                    {dictionary.privacy.sections.dataCollection.dataLocation.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dictionary.privacy.sections.dataCollection.dataLocation.content}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2 text-foreground">
                    {dictionary.privacy.sections.dataCollection.registrationData.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dictionary.privacy.sections.dataCollection.registrationData.content}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2 text-foreground">
                    {dictionary.privacy.sections.dataCollection.contactForm.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dictionary.privacy.sections.dataCollection.contactForm.content}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2 text-foreground">
                    {dictionary.privacy.sections.dataCollection.googleAnalytics.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dictionary.privacy.sections.dataCollection.googleAnalytics.content}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2 text-foreground">
                    {dictionary.privacy.sections.dataCollection.useCases.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {dictionary.privacy.sections.dataCollection.useCases.content}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {dictionary.privacy.sections.dataCollection.useCases.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Embedded Content */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {dictionary.privacy.sections.embeddedContent.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {dictionary.privacy.sections.embeddedContent.intro}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {dictionary.privacy.sections.embeddedContent.description}
              </p>

              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-medium mb-2 text-foreground">
                    {dictionary.privacy.sections.embeddedContent.facebook.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dictionary.privacy.sections.embeddedContent.facebook.content}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2 text-foreground">
                    {dictionary.privacy.sections.embeddedContent.twitter.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dictionary.privacy.sections.embeddedContent.twitter.content}
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Cookies */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {dictionary.privacy.sections.cookies.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {dictionary.privacy.sections.cookies.content}
              </p>

              <div className="bg-muted/50 rounded-lg p-5">
                <h3 className="text-base font-medium mb-2 text-foreground">
                  {dictionary.privacy.sections.cookies.essential.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dictionary.privacy.sections.cookies.essential.phpsessid}
                </p>
              </div>
            </section>

            {/* 5. Data Access */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {dictionary.privacy.sections.dataAccess.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {dictionary.privacy.sections.dataAccess.intro}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                {dictionary.privacy.sections.dataAccess.registered}
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {dictionary.privacy.sections.dataAccess.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* 6. Data Retention */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {dictionary.privacy.sections.dataRetention.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {dictionary.privacy.sections.dataRetention.support}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dictionary.privacy.sections.dataRetention.registration}
              </p>
            </section>

            {/* 7. Security */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {dictionary.privacy.sections.security.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {dictionary.privacy.sections.security.ssl}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dictionary.privacy.sections.security.breach}
              </p>
            </section>

            {/* 8. Data Rights */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {dictionary.privacy.sections.dataRights.title}
              </h2>

              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-medium mb-2 text-foreground">
                    {dictionary.privacy.sections.dataRights.general.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dictionary.privacy.sections.dataRights.general.content}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2 text-foreground">
                    {dictionary.privacy.sections.dataRights.gdpr.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dictionary.privacy.sections.dataRights.gdpr.content}
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Third Party Websites */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {dictionary.privacy.sections.thirdPartyWebsites.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {dictionary.privacy.sections.thirdPartyWebsites.content}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dictionary.privacy.sections.thirdPartyWebsites.disclaimer}
              </p>
            </section>

            {/* 10. Legal Disclosure */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {dictionary.privacy.sections.legalDisclosure.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {dictionary.privacy.sections.legalDisclosure.content}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dictionary.privacy.sections.legalDisclosure.compliance}
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-10 bg-muted/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3 text-foreground">{dictionary.contact.title}</h2>
              <p className="text-sm text-muted-foreground mb-3">
                {params.lang === "it"
                  ? "Per qualsiasi domanda riguardo questa informativa sulla privacy, puoi contattarci:"
                  : params.lang === "es"
                    ? "Para cualquier pregunta sobre esta política de privacidad, puedes contactarnos:"
                    : "For any questions regarding this privacy policy, you can contact us:"}
              </p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong>Email:</strong> info@vitalgames.it
                </p>
                <p>
                  <strong>{dictionary.contact.info.phone.title}:</strong> +39 023282352
                </p>
                <p>
                  <strong>{dictionary.contact.info.address.title}:</strong> Via Milano 123, 20100 Milano, Italia
                </p>
              </div>
            </section>

            {/* Last Updated */}
            <section className="text-center text-xs text-muted-foreground border-t pt-6">
              <p>
                {params.lang === "it"
                  ? "Ultimo aggiornamento: Gennaio 2025"
                  : params.lang === "es"
                    ? "Última actualización: Enero 2025"
                    : "Last updated: January 2025"}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
