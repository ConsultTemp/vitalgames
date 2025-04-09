"use client"

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { i18n } from "@/i18n-config"
import { Menu, ChevronDown, Globe } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DialogTitle } from "./ui/dialog"
import logo from '../public/logopatty.png'

export default function Header() {
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { dictionary, lang } = useLanguage()

  // Get the path without the language prefix
  const pathWithoutLang = pathname.replace(/^\/[a-z]{2}(?:\/|$)/, "/")

  // Services list
  const services = [
    { key: "transfer-ncc", label: dictionary.services?.items?.[0]?.title || "Transfer NCC" },
    { key: "events", label: dictionary.services?.items?.[1]?.title || "Events" },
    { key: "diplomatic", label: dictionary.services?.items?.[2]?.title || "Diplomatic" },
    { key: "luxury-hotels", label: dictionary.services?.items?.[3]?.title || "Luxury Hotels" },
    { key: "business", label: dictionary.services?.items?.[4]?.title || "Business" },
  ]

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Mobile menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger className="md:hidden">
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="left" className="w-full p-0">
            <DialogTitle></DialogTitle>
            <div className="flex flex-col h-full text-darkGray bg-white">
              <div className="p-4 flex justify-center border-b">
                <Link href={`/${lang}`} onClick={handleLinkClick}>
                  <Image
                    src={logo}
                    alt="Patty Car"
                    width={150}
                    height={40}
                    className="h-10 w-auto"
                    priority
                  />
                </Link>
              </div>
              <nav className="flex flex-col p-6 space-y-6">
                {/* Home link */}
                <Link href={`/${lang}`} onClick={handleLinkClick} className="text-xl text-darkGray hover:text-darkGray transition-colors duration-300 font-light">
                  {dictionary.navigation[0].label}
                </Link>

                {/* Services with collapsible submenu */}
                <Collapsible open={isMobileServicesOpen} onOpenChange={setIsMobileServicesOpen} className="w-full">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-xl text-darkGray hover:text-darkGray transition-colors duration-300 font-light">
                    {dictionary.navigation[1].label}
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""}`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 pl-4 space-y-3 overflow-hidden pt-8">
                    {services.map((service) => (
                      <Link
                        key={service.key}
                        href={`/${lang}/services/${service.key}`}
                        onClick={handleLinkClick}
                        className="block py-2 text-darkGray font-thin hover:text-darkGray transition-colors duration-300"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Fleet link */}
                <Link
                  href={`/${lang}/fleet`}
                  onClick={handleLinkClick}
                  className="text-xl text-darkGray hover:text-darkGray transition-colors duration-300 font-light"
                >
                  {dictionary.navigation[2].label}
                </Link>

                {/* About and Contact links */}
                {dictionary.navigation.slice(3).map((item: { key: Key | null | undefined; href: any; label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
                  <Link
                    key={item.key}
                    href={`/${lang}${item.href}`}
                    onClick={handleLinkClick}
                    className="text-xl text-darkGray hover:text-darkGray transition-colors duration-300 font-light"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-6 border-t">
                <div className="flex justify-center space-x-6">
                  {i18n.locales.map((locale) => (
                    <Link
                      key={locale}
                      href={`/${locale}${pathWithoutLang}`}
                      onClick={handleLinkClick}
                      className={`px-4 py-2 ${locale === lang ? "font-bold" : ""} transition-colors duration-300 hover:bg-gray-100`}
                    >
                      {locale === "en" ? "English" : locale === "it" ? "Italiano" : "العربية"}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Left navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-darkGray text-sm">
          {/* Home link */}
          <Link href={`/${lang}`} className="text-darkGray transition-colors duration-300 font-light">
            {dictionary.navigation[0].label}
          </Link>

          {/* Services dropdown using shadcn/ui */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-darkGray hover:text-darkGray transition-colors duration-300 focus:outline-none font-light">
              {dictionary.navigation[1].label}
              <ChevronDown size={16} className="ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {services.map((service) => (
                <Link key={service.key} href={`/${lang}/services/${service.key}`} className="block w-full">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-xs font-light">{service.label}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Logo (centered on desktop) */}
        <Link href={`/${lang}`} className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <Image
            src={logo}
            alt="Patty Car"
            width={150}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Mobile logo and language selector */}
        <div className="md:hidden flex items-center">
          <Link href={`/${lang}`} className="mr-4">
            <Image
              src={logo}
              alt="Patty Car"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Mobile language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-lack transition-colors duration-300 focus:outline-none">
              <Globe size={20} className="text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 text-darkGray">
              {i18n.locales.map((locale) => (
                <Link key={locale} href={`/${locale}${pathWithoutLang}`} className="block w-full">
                  <DropdownMenuItem
                    className={`cursor-pointer hover:bg-gray-100 ${locale === lang ? "font-bold" : ""}`}
                  >
                    {locale === "en" ? "English" : locale === "it" ? "Italiano" : "العربية"}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          {/* Fleet link */}
          <Link href={`/${lang}/fleet`} className="text-darkGray hover:text-darkGray transition-colors duration-300 font-light">
            {dictionary.navigation[2].label}
          </Link>

          {/* About and Contact links */}
          {dictionary.navigation.slice(3).map((item: { key: Key | null | undefined; href: any; label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
            <Link key={item.key} href={`/${lang}${item.href}`} className="text-darkGray transition-colors duration-300 font-light">
              {item.label}
            </Link>
          ))}

          {/* Language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-darkGray hover:text-darkGray uppercase transition-colors duration-300 focus:outline-none">
              <Globe className="w-4"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {i18n.locales.map((locale) => (
                <Link key={locale} href={`/${locale}${pathWithoutLang}`} className="block w-full">
                  <DropdownMenuItem
                    className={`cursor-pointer hover:bg-gray-100 ${locale === lang ? "font-bold" : ""}`}
                  >
                    {locale === "en" ? "English" : locale === "it" ? "Italiano" : "العربية"}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
