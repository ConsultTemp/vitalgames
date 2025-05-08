"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, X, ChevronRight } from 'lucide-react'
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const pathname = usePathname()

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
    { label: "All games", href: "/allgames", hasDropdown:false  },
    { label: "Online games", href: "/online-games", hasDropdown: false  },
    { label: "Cabinet", href: "/vlt", hasDropdown: false },
    { label: "About us", href: "/about-us", hasDropdown: false },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex w-screen mx-auto px-24 py-3 items-center relative bg-black/30 backdrop-blur-md">
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
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-2 z-10">
              {menuItems.map((item) => {
                const slots = item.dropdownType === "awp-multigames" ? multigames.slice(0, 3) : games

                return(
                <NavigationMenuItem key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger className="text-sm text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none whitespace-nowrap bg-transparent hover:bg-transparent">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="backdrop-blur-md bg-black bg-transparent border border-gray-800 p-2 w-[800px] left-1/2 -translate-x-1/2 absolute">
                        <div className="grid grid-cols-3 gap-2">
                          {slots.map((game, index) => (
                            <Link
                              key={index}
                              href={`/${item.dropdownType}/${game.slug}`}
                              className="block"
                              style={{
                                opacity: 0,
                                animation: 'fadeIn 0.3s ease-in-out forwards',
                                animationDelay: `${index * 50}ms`
                              }}
                            >
                              <div className="rounded-lg h-48 w-42 overflow-hidden border border-gray-700 transition-all duration-200 hover:-translate-y-1">
                                <div className="relative h-full">
                                  <Image
                                    src={game.image || "/placeholder.svg"}
                                    alt={game.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="py-2 px-2 absolute rounded-b-lg backdrop-blur-md bg-black/30 bottom-0 left-0 right-0">
                                  <h3 className="text-white font-bold text-xs mb-1">{game.title}</h3>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div
                          className="mt-2 border-t border-gray-800 text-center w-[600px] pb-0"
                          style={{ animationDelay: '200ms' }}
                        >
                          <Link
                            href={item.href}
                            className="text-white text-xs flex flex-row items-center cursor-pointer font-medium inline-flex items-center"
                          >
                            View all {item.label}
                            <ChevronRight className="w-3 h-3 ml-1 text-white" />
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap duration-300 ${pathname === item.href ? "text-white" : ""
                        }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </NavigationMenuItem>
              )}
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Contact Us Button - Right */}
        <div className="flex-1 flex justify-end">
          <Button
            asChild
            className="bg-vitalYellow hover:bg-vitalYellow/90 px-8 text-black font-medium rounded-md py-2 text-sm"
          >
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex w-full px-4 py-3 items-center justify-between bg-black/30 backdrop-blur-md fixed top-0 left-0 right-0 z-[999]">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full bg-black border-r border-gray-800 p-0">
            <DialogTitle></DialogTitle>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
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
                    {item.hasDropdown && (
                      <div className="mt-3 pb-2">
                        <GameCarousel  games={slots} onGameClick={() => setIsSheetOpen(false)} type={item.dropdownType ? item.dropdownType : "allgames"} />
                      </div>
                    )}
                  </div>
                )})}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-800">
                <Button
                  asChild
                  className="bg-vitalYellow hover:bg-vitalYellow/90 text-black font-bold rounded-md px-3 py-2 w-full animate-fadeIn"
                  style={{ animationDuration: '0.5s', animationDelay: '400ms', animationFillMode: 'both' }}
                >
                  <Link href="/contact" onClick={() => setIsSheetOpen(false)}>
                    Contact us
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-14 w-20">
              <Image
                src={logo}
                alt="Vital Games"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}