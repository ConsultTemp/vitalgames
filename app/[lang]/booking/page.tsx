import Image from "next/image"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import type { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo-config"
import BookingForm from "@/components/booking-form"
import book from '../../../public/book.jpg'

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata | null> {
    const params = await props.params
    if (!params || !params.lang) {
        return null;
    }
    const dictionary = await getDictionary(params.lang)
    const seoData = generateSEOMetadata("contact", params.lang)

    return {
        title: `${dictionary.booking.pageTitle} | Patty Car`,
        description: seoData.description,
        keywords: seoData.keywords,
        alternates: {
            canonical: `/${params.lang}/booking`,
            languages: {
                "en-US": "/en/booking",
                "it-IT": "/it/booking",
                "ar-SA": "/ar/booking",
            },
        },
        openGraph: {
            title: `${dictionary.booking.pageTitle} | Patty Car`,
            description: seoData.description,
            url: `https://pattycar.com/${params.lang}/booking`,
            siteName: "Patty Car",
            locale: params.lang === "it" ? "it_IT" : params.lang === "en" ? "en_US" : "ar_SA",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${dictionary.booking.pageTitle} | Patty Car`,
            description: seoData.description,
        },
    }
}

export default async function BookingPage(props: {
    params: Params
}) {
    const params = await props.params
    if (!params || !params.lang) {
        return null;
    }
    const lang = params.lang
    const dictionary = await getDictionary(lang)

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-screen">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={book}
                        alt={dictionary.booking.pageTitle}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center text-white pt-24">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-xs font-light uppercase tracking-wider">{dictionary.booking.serviceLabel}</p>
                        <h1 className="text-3xl md:text-6xl font-light my-6 atacama">{dictionary.booking.pageTitle}</h1>
                        <p className="text-sm md:text-sm font-light">{dictionary.booking.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sm font-light text-darkGray leading-relaxed">{dictionary.booking.bookingDescription}</p>
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section className="bg-gray-50">
                <BookingForm dictionary={dictionary.booking} />
            </section>
        </>
    )
}