"use client"
import Image from "next/image"
import { OptimizedLink as Link } from "@/components/optimized-link"
import footerbg from '../public/footerbg.png'
import logo from '../public/logovital.svg'
import { useLanguage } from "@/components/language-provider"
import type { Dictionary } from "@/lib/dictionary"
import { useState } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useIsMobile } from "@/components/ui/use-mobile"

interface FooterLink {
  label: string
  href: string
}

export default function Footer() {
  const { dictionary: dict } = useLanguage()
  const [openAccordion, setOpenAccordion] = useState<null | 'games' | 'company' | 'usage'>(null)
  const isMobile = useIsMobile()

  return (
    <footer className="relative w-full bg-black text-white overflow-hidden min-h-[800px]">
      {/* U-shaped PNG background - positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <Image
          src={footerbg}
          alt="Footer decoration"
          width={1920}
          height={700}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Footer content - positioned to fit inside the U shape */}
        {/* MOBILE: Accordion version (shadcn) */}
        {isMobile && (
          <div className="flex flex-col gap-4 max-w-5xl mx-auto text-center pt-32 pb-48">
            {/* Logo - Full width on mobile */}
            <div className="flex flex-col items-center mb-8">
              <Image
                src={logo}
                alt="Vital Games"
                width={120}
                height={80}
                className="object-contain mb-4"
              />
            </div>
            <Accordion type="single" collapsible className="w-full text-left">
              <AccordionItem value="games">
                <AccordionTrigger>{dict.footer.sections.games.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 flex flex-col items-start">
                    {dict.footer.sections.games.links.map((link: FooterLink, index: number) => (
                      <li key={index}>
                        <Link href={link.href} className="hover:text-vitalYellow transition-colors font-extralight text-sm w-fit py-2">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="company">
                <AccordionTrigger>{dict.footer.sections.company.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 flex flex-col items-start">
                    {dict.footer.sections.company.links.map((link: FooterLink, index: number) => (
                      <li key={index}>
                        <Link href={link.href} className="hover:text-vitalYellow transition-colors font-extralight text-sm w-fit py-2">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="usage">
                <AccordionTrigger>{dict.footer.sections.usage.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 flex flex-col items-start">
                    {dict.footer.sections.usage.links.map((link: FooterLink, index: number) => (
                      <li key={index}>
                        <Link href={link.href} className="hover:text-vitalYellow transition-colors font-extralight text-sm w-fit py-2">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
        {/* DESKTOP: Original grid version */}
        {!isMobile && (
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto text-center pt-40 lg:pt-48 pb-60 lg:pb-72">
            {/* Logo - Full width on mobile */}
            <div className="flex flex-col items-center mb-8 md:mb-0 md:col-span-1">
              <Image
                src={logo}
                alt="Vital Games"
                width={120}
                height={80}
                className="object-contain mb-4"
              />
            </div>
            {/* Mobile grid for the rest of the content */}
            <div className="grid grid-cols-2 md:contents">
              {/* Column 1 - Games */}
              <div className="flex flex-col items-start">
                <h3 className="font-bold text-base mb-4 w-fit">{dict.footer.sections.games.title}</h3>
                <ul className="space-y-2 flex flex-col items-start">
                  {dict.footer.sections.games.links.map((link: FooterLink, index: number) => (
                    <li key={index}>
                      <Link href={link.href} className="hover:text-vitalYellow transition-colors font-extralight text-sm w-fit">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Column 2 - Company */}
              <div className="flex flex-col items-start">
                <h3 className="font-bold text-base mb-4 w-fit">{dict.footer.sections.company.title}</h3>
                <ul className="space-y-2 flex flex-col items-start">
                  {dict.footer.sections.company.links.map((link: FooterLink, index: number) => (
                    <li key={index}>
                      <Link href={link.href} className="hover:text-vitalYellow transition-colors font-extralight text-sm w-fit">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* Usage - shown under Company on mobile */}
                <div className="md:hidden mt-8 flex flex-col items-start">
                  <h3 className="font-bold text-base mb-4 w-fit">{dict.footer.sections.usage.title}</h3>
                  <ul className="space-y-2 flex flex-col items-start">
                    {dict.footer.sections.usage.links.map((link: FooterLink, index: number) => (
                      <li key={index}>
                        <Link href={link.href} className="hover:text-vitalYellow transition-colors w-fit font-extralight text-sm">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Column 4 - Usage (desktop only) */}
              <div className="hidden md:flex flex-col items-start">
                <h3 className="font-bold text-base mb-4 w-fit">{dict.footer.sections.usage.title}</h3>
                <ul className="space-y-2 flex flex-col items-start">
                  {dict.footer.sections.usage.links.map((link: FooterLink, index: number) => (
                    <li key={index}>
                      <Link href={link.href} className="hover:text-vitalYellow w-fit transition-colors font-extralight text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Copyright - positioned to fit inside the bottom of the U */}
        <div className="text-center text-xs absolute bottom-20 left-0 right-0 mx-auto max-w-4xl px-4">
          <p className="px-20">Vital Games Project S.r.l© 2025. All rights reserved. P. IVA: 08160840968. Powered by DK</p>
        </div>
      </div>
    </footer>
  )
}
