"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, X, ChevronRight, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { GameCarousel } from "@/components/games/GameCarousel"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import logo from '../public/logovital.svg'
import { games, multigames } from '../lib/cards'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useLanguage } from "@/components/language-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const pathname = usePathname()
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

  // Menu items based on the image
  const menuItems = [
    { label: "Multigames", href: "/awp-multigames", hasDropdown: true, dropdownType: "awp-multigames" },
    { label: "All games", href: "/allgames", hasDropdown: false },
    { label: "Cabinet", href: "/vlt", hasDropdown: false },
    { label: "About us", href: "/about-us", hasDropdown: false },
  ]

  const languages = [
    { code: 'it', label: 'Italiano' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex w-screen mx-auto px-8 py-3 overflow-visible items-center relative bg-gradient-to-b from-black/90 to-transparent" style={{height: "90px"}}>
        {/* Logo - Left */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center z-10">
            <div className="relative h-14 w-24 mr-2">
              <Image
                src={logo}
                alt="Vital Games"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Navigation - Center */}
        <div className="flex-1 flex justify-center">
          <NavigationMenu className="w-full" style={{margin: '0px', padding: '0px'}}>
            <NavigationMenuList className="flex items-center gap-4 z-10"  style={{margin: '0px', padding: '0px'}}>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label} className="relative group">
                  {item.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger className="text-sm text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none whitespace-nowrap bg-transparent hover:bg-transparent relative after:content-[''] after:absolute after:bottom-[-20px] after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full flex items-center h-12">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="backdrop-blur-md bg-black/95 animate-slideDown" style={{
                        position: 'fixed',
                        left: '0',
                        right: '0',
                        top: '90px',
                        width: '100%',
                        zIndex: 100,
                        padding: '0px',
                        margin: '0px',
                        transform: 'none !important'
                      }}>
                        <div className="mx-auto px-8 pb-8 pt-4">
                          <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Multigames</h2>
                            <Link
                              href="/awp-multigames"
                              className="text-white text-sm flex flex-row items-center cursor-pointer font-medium hover:text-vitalYellow transition-colors duration-300"
                            >
                              View all Multigames
                              <ChevronRight className="w-4 h-4 ml-2 text-white" />
                            </Link>
                          </div>
                          <div className="grid grid-cols-4 gap-6">
                            {multigames.map((game, index) => (
                              <Link
                                key={index}
                                href={`/awp-multigames/${game.slug}`}
                                className="block"
                                style={{
                                  opacity: 0,
                                  animation: 'fadeIn 0.3s ease-out forwards',
                                  animationDelay: `${index * 50}ms`
                                }}
                              >
                                <div className="rounded-lg w-full overflow-hidden transition-all duration-200 hover:-translate-y-1">
                                  <div className="relative aspect-[4/3]">
                                    <Image
                                      src={game.image || "/placeholder.svg"}
                                      alt={game.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap duration-300 relative after:content-[''] after:absolute after:bottom-[-20px] after:left-0 after:w-0 after:h-[2px] after:bg-white   hover:after:w-full flex items-center h-12 ${pathname === item.href ? "text-white after:w-full" : ""}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side buttons */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <Button
            asChild
            className="bg-vitalYellow hover:bg-vitalYellow/90 px-8 text-black font-medium rounded-md py-2 text-sm"
          >
            <Link href="/contact">{dict.header.contactUs}</Link>
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/5">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-md pb-0" style={{padding: '0px', margin: '0px'}}>
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  className={`text-sm ${lang === language.code ? 'text-vitalYellow' : 'text-white'} hover:opacity-8 hover:text-vitalYellow hover:bg-black cursor-pointer`}
                  onClick={() => {
                    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${language.code}`);
                    window.location.href = newPath;
                  }}
                >
                  {language.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex w-full px-4 py-3 items-center justify-between bg-gradient-to-b from-black/90 to-transparent fixed top-0 left-0 right-0 z-[999]">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white  hover:bg-transparent"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full bg-black p-0">
            <DialogTitle></DialogTitle>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                  <div className="relative h-10 w-16">
                    <Image
                      src={logo}
                      alt="Vital Games"
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
              </div>

              {/* Content */}
              <div className="flex flex-col p-6 space-y-8 overflow-y-auto flex-grow">
                {menuItems.map((item, index) =>{ 
                  const slots = item.dropdownType === "awp-multigames" ? multigames : games
                  return(
                  <div
                    key={item.label}
                    className="animate-slideInRight"
                    style={{
                      animationDuration: '0.4s',
                      animationDelay: `${index * 50 + 100}ms`,
                      animationFillMode: 'both',
                      margin: '0px'
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsSheetOpen(false)}
                      className={`block text-base font-medium text-gray-300 hover:text-white transition-colors duration-300 mb-3 ${pathname === item.href ? "text-white" : ""
                        }`}
                    >
                      {item.label}
                    </Link>

                    {/* Game carousel for mobile */}
                    {item.hasDropdown && item.dropdownType == "awp-multigames" && (
                      <div className="mt-3 pb-2">
                        <GameCarousel  games={slots} onGameClick={() => setIsSheetOpen(false)} type={item.dropdownType ? item.dropdownType : "allgames"} />
                      </div>
                    )}
                  </div>
                )})}
              </div>

              {/* Footer */}
              <div className="p-6 space-y-4">
                <Button
                  asChild
                  className="bg-vitalYellow hover:bg-vitalYellow/90 text-black font-bold rounded-md px-3 py-2 w-full animate-fadeIn"
                  style={{ animationDuration: '0.5s', animationDelay: '400ms', animationFillMode: 'both' }}
                >
                  <Link href="/contact" onClick={() => setIsSheetOpen(false)}>
                    {dict.header.contactUs}
                  </Link>
                </Button>

                {/* Language Selector for Mobile */}
                {/* <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/5">
                        <Globe className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-md ">
                      {languages.map((language) => (
                        <DropdownMenuItem
                          key={language.code}
                          className={`text-sm ${lang === language.code ? 'text-vitalYellow' : 'text-white'} hover:bg-white/5 cursor-pointer`}
                          onClick={() => {
                            const newPath = pathname.replace(/^\/[a-z]{2}/, `/${language.code}`);
                            window.location.href = newPath;
                          }}
                        >
                          {language.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div> */}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Right side with Logo and Language Selector */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-16">
              <Image
                src={logo}
                alt="Vital Games"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Language Selector for Mobile Header */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/5">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-md ">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  className={`text-sm ${lang === language.code ? 'text-vitalYellow' : 'text-white'} hover:bg-white/5 cursor-pointer`}
                  onClick={() => {
                    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${language.code}`);
                    window.location.href = newPath;
                  }}
                >
                  {language.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}