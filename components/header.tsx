"use client"

import { useState, useEffect } from "react"
import { OptimizedLink as Link } from "@/components/optimized-link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import logo from '../public/logovital.svg'
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/components/language-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import ita from '../public/IT.svg'
import esp from '../public/ES.svg'
import eng from '../public/EN.svg'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isLangMenuOpenMobile, setIsLangMenuOpenMobile] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { dictionary: dict, lang, setLang } = useLanguage()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Block body scroll when sidebar is open
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isSheetOpen])

  // Menu items based on the image
  const menuItems = [
    { label: "Games", href: "/games", hasDropdown: false },
    { label: "Multigames", href: "/games?type=awp-multigames", hasDropdown: false },
    { label: "Online games", href: "/games?type=online-games", hasDropdown: false },
    { label: "Cabinet", href: "/vlt", hasDropdown: false },
    { label: "About us", href: "/about-us", hasDropdown: false },
  ]

  const languages = [
    { code: 'it', label: 'IT', flag: ita },
    { code: 'en', label: 'EN', flag: eng },
    { code: 'es', label: 'ES', flag: esp }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex px-24 overflow-visible items-center justify-center relative bg-black/70 backdrop-blur-3xl border-b border-[#202020]" style={{ height: "60px" }}>
        {/* Logo - Left */}
        <div className="flex-1 flex justify-start items-center">
          <Link href="/" className="flex items-center z-10">
            <div className="relative h-10 w-16">
              <Image
                src={logo}
                alt="Vital Games"
                fill
                className="object-contain"
                priority
                sizes="64px"
              />
            </div>
          </Link>
        </div>

        {/* Navigation - Center */}
        <div className="flex-1 flex justify-center">
          <NavigationMenu className="w-full" style={{ margin: '0px', padding: '0px' }}>
            <NavigationMenuList className="flex items-center justify-center z-10" style={{ margin: '0px', padding: '0px' }}>
              {menuItems.map((item) => {
                // Check if link is active (handle query params)
                let isActive = false
                if (item.href.includes('?')) {
                  const [path, query] = item.href.split('?')
                  const params = new URLSearchParams(query)
                  const expectedType = params.get('type')
                  isActive = pathname === path && searchParams.get('type') === expectedType
                } else {
                  isActive = pathname === item.href
                }
                
                return (
                  <NavigationMenuItem key={item.label} className="relative group">
                    <Link
                      href={item.href}
                      className={`text-sm bg-transparent hover:bg-white/10 rounded-full px-4 py-2 font-hitmarker-text-medium text-[#999999] hover:text-vitalYellow transition-colors whitespace-nowrap duration-300 relative   hover:after:w-full flex items-center h-9 ${isActive ? "text-white after:w-full" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side buttons */}
        <div className="flex-1 flex justify-end items-center gap-2">
          <Button
            asChild
            className="bg-[#202020] border border-[#505050] hover:scale-105 hover:border-bg-white/20 transition-all duration-300 px-4 text-white font-hitmarker-text-medium rounded-full h-9 text-base"
          >
            <Link href="/contact-us">{dict.header.contactUs}</Link>
          </Button>

          {/* Language Selector */}
          <DropdownMenu open={isLangMenuOpen} onOpenChange={setIsLangMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button className="bg-transparent border border-[#505050] text-white font-hitmarker-text-medium flex items-center gap-1.5 pl-5 pr-4 h-9 rounded-full hover:bg-white/10 transition-all duration-300">
                <Image
                  src={languages.find(l => l.code === lang)?.flag || eng}
                  alt={languages.find(l => l.code === lang)?.label || 'EN'}
                  width={16}
                  height={16}
                  className="object-contain"
                  sizes="16px"
                />
                <span className="text-sm font-medium">{languages.find(l => l.code === lang)?.label || 'EN'}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/50 border border-[#202020] font-hitmarker-text-medium text-base backdrop-blur-md z-[1003] rounded-2xl shadow-xl">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  className={`text-sm ${lang === language.code ? 'text-vitalYellow font-bold' : 'text-white'} hover:bg-white/10 p-2 rounded-xl cursor-pointer flex items-center gap-2`}
                  onClick={() => {
                    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${language.code}`);
                    window.location.href = newPath;
                  }}
                >
                  <Image
                    src={language.flag}
                    alt={language.label}
                    width={20}
                    height={20}
                    className="object-contain"
                    sizes="20px"
                  />
                  <span>{language.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex w-full px-4 py-3 items-center justify-between bg-gradient-to-b from-black/90 to-transparent fixed top-0 left-0 right-0 z-[999]">

        {/* Left side with Logo */}
        <div className="flex items-center z-[1002]">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-16">
              <Image
                src={logo}
                alt="Vital Games"
                fill
                className="object-contain"
                priority
                sizes="64px"
              />
            </div>
          </Link>
        </div>

        {/* Right side with Menu only */}
        <div className="flex items-center gap-2 z-[1002]">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white px-2 py-1  rounded-full backdrop-blur-sm hover:bg-transparent z-[1002]"
            >
              {isSheetOpen ? <X size={30} /> : <Menu size={30} />}
            </Button>
          </SheetTrigger>
          <AnimatePresence>
            {isSheetOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="fixed inset-0 bg-black z-[1000]"
                  onClick={() => setIsSheetOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="fixed inset-0 bg-black z-[1001] min-h-dvh"
                  style={{ height: '100dvh' }}
                >
                  <div className="flex flex-col h-full min-h-dvh">
                    {/* Header */}
                    <div className="p-4 flex h-24 items-center justify-between">
                      <Link href="/" className="flex items-center" onClick={() => setIsSheetOpen(false)}>
                        <div className="relative h-10 w-16">
                          <Image
                            src={logo}
                            alt="Vital Games"
                            fill
                            className="object-contain"
                            sizes="64px"
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col p-6 space-y-3 px-8 overflow-y-auto flex-grow">
                      {menuItems.map((item, index) => {
                        // Check if link is active (handle query params)
                        let isActive = false
                        if (item.href.includes('?')) {
                          const [path, query] = item.href.split('?')
                          const params = new URLSearchParams(query)
                          const expectedType = params.get('type')
                          isActive = pathname === path && searchParams.get('type') === expectedType
                        } else {
                          isActive = pathname === item.href
                        }
                        
                        return (
                          <div key={item.label}>
                            <div
                              className="animate-slideInRight"
                              style={{
                                animationDuration: '0.4s',
                                animationDelay: `${index * 50 + 100}ms`,
                                animationFillMode: 'both',
                                marginTop: '10px',
                                marginBottom: '10px'
                              }}
                            >
                              <Link
                                href={item.href}
                                onClick={() => setIsSheetOpen(false)}
                                className={`block text-2xl font-hitmarker-text-bold uppercase text-white transition-colors duration-300 ${isActive ? "text-white" : ""}`}
                              >
                                {item.label}
                              </Link>
                              {item.label !== "About us" && (
                                <div className="border-b border-white/20 mt-3"></div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                      
                      {/* Contact Button and Language Selector - moved below menu items */}
                      <div className="space-y-4 pt-8 !mt-0">
                        {/* Contact Button */}
                        <Button
                          asChild
                          variant="vitalYellow"
                          className="w-full"
                        >
                          <Link href="/contact-us" onClick={() => setIsSheetOpen(false)}>{dict.header.contactUs}</Link>
                        </Button>

                        {/* Language Selector for Mobile */}
                        <DropdownMenu open={isLangMenuOpenMobile} onOpenChange={setIsLangMenuOpenMobile}>
                          <DropdownMenuTrigger asChild>
                            <Button className="text-white flex items-center gap-1 px-3 py-2 bg-white/10 border border-[#505050] rounded-full hover:bg-white/5 transition-all duration-300 w-full justify-start">
                              <Image
                                src={languages.find(l => l.code === lang)?.flag || eng}
                                alt={languages.find(l => l.code === lang)?.label || 'EN'}
                                width={16}
                                height={16}
                                className="object-contain rounded-sm"
                                sizes="16px"
                              />
                              <span className="text-sm font-medium">{languages.find(l => l.code === lang)?.label || 'EN'}</span>
                              <ChevronDown 
                                className={`w-4 h-4 transition-transform duration-300 ${isLangMenuOpenMobile ? 'rotate-180' : ''} ml-auto`}
                              />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-md z-[1003] rounded-sm">
                            {languages.map((language) => (
                              <DropdownMenuItem
                                key={language.code}
                                className={`text-sm ${lang === language.code ? 'text-vitalYellow' : 'text-white'} hover:bg-white/5 cursor-pointer flex items-center gap-2`}
                                onClick={() => {
                                  const newPath = pathname.replace(/^\/[a-z]{2}/, `/${language.code}`);
                                  window.location.href = newPath;
                                }}
                              >
                                <Image
                                  src={language.flag}
                                  alt={language.label}
                                  width={20}
                                  height={20}
                                  className="object-contain rounded-sm"
                                  sizes="20px"
                                />
                                <span>{language.label}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          </Sheet>
        </div>
      </div>
    </header>
  )
}