'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from "@/components/language-provider"
import SmoothReveal from '@/components/smooth-reveal'
import { Card } from "@/components/ui/card"
import logo from '@/public/logovital.svg'
import vitalhq from '../../../public/vital-hq.jpeg'
import vitalpres from '../../../public/vitalgames-pres.jpeg'
import iso from '@/public/isologo.svg'
import star from '@/public/star1.png'
import diamond from '@/public/diamante1.png'
import coin from '@/public/coin2.png'
import Link from 'next/link'
import Partners from '@/components/home/partners'
import VideoHero from '@/components/VideoHero'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import FloatingImage from '@/components/bg-image-component'
import campana from '../../../public/campana.png'
import bar from '../../../public/bar.png'
import scatter from '../../../public/scatter.png'
import diamante from '../../../public/diamond.png'

export default function AboutUs() {
    const { dictionary: dict } = useLanguage()

    const cards = [
        {
            id: 1,
            icon: iso,
            alt: "ISO Certification",
            description: (
                <span dangerouslySetInnerHTML={{ __html: dict.aboutUs.cards.iso.description }} />
            ),
        },
        {
            id: 2,
            icon: star,
            alt: "Star Icon",
            description: (
                <span dangerouslySetInnerHTML={{ __html: dict.aboutUs.cards.experience.description }} />
            ),
        },
        {
            id: 3,
            icon: diamond,
            alt: "Diamond Icon",
            description: (
                <span dangerouslySetInnerHTML={{ __html: dict.aboutUs.cards.games.description }} />
            ),
        },
        {
            id: 4,
            icon: coin,
            alt: "Coin Icon",
            description: (
                <span dangerouslySetInnerHTML={{ __html: dict.aboutUs.cards.partners.description }} />
            ),
        },
    ]

    return (
        <div className="relative">
            <VideoHero
                title={""}
                subtitle={""}
                videoUrl="https://files.catbox.moe/gdaic4.mp4"
            />
            {/* First Section */}
            <section className="relative min-h-screen overflow-visible pt-8">
                <div className="relative z-10 py-32 container mx-auto px-4">
                    <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none overflow-visible">
                        {/* Bottom left large diamond */}
                        <div className="absolute top-0  w-96 md:w-96 h-96 md:h-96 left-0 animate-float-slow rotate-10">
                            <FloatingImage src={campana || "/placeholder.svg"} alt="Diamond" className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]" />
                        </div>
                        <div className="absolute bottom-0  w-96 md:w-96 h-96 md:h-96 right-24 animate-float-slow rotate-10">
                            <FloatingImage src={diamante || "/placeholder.svg"} alt="Diamond" className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]" />
                        </div>
                    </div>
                    ƒ
                    <div className="flex flex-col items-center">
                        <SmoothReveal>
                            <h2 className="text-8xl font-bold mb-12 text-center flex flex-col items-center">
                                <span className='dharma'>{dict.aboutUs.title}</span>
                            </h2>
                        </SmoothReveal>

                        <SmoothReveal className="max-w-4xl mx-auto mb-12">
                            <p className='text-center text-sm font-light'>{dict.aboutUs.description}</p>
                        </SmoothReveal>

                        <div className="flex flex-col md:flex-row gap-8">
                            <SmoothReveal className='p-6 rounded-lg border border-1 border-gray-800 backdrop-blur-md'>
                                <Image
                                    src={vitalhq}
                                    alt="Vital HQ"
                                    width={500}
                                    height={500}
                                    className="rounded-lg object-cover aspect-square"
                                />
                            </SmoothReveal>

                            <SmoothReveal className='p-6 rounded-lg border border-1 border-gray-800 backdrop-blur-md'>
                                <Image
                                    src={vitalpres}
                                    alt="Vital Games Presentation"
                                    width={500}
                                    height={500}
                                    className="rounded-lg object-cover aspect-square"
                                />
                            </SmoothReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Winning Technology Section */}
            <div className="technology-bg">
                <div className="flex min-h-screen flex-col items-center justify-center py-8 px-2 md:px-3">
                    <div className="max-w-6xl w-full flex flex-col items-center text-center">
                        {/* Three paragraphs */}
                        <div className="space-y-6 mb-12 max-w-2xl">
                            <p className="text-xs md:text-sm text-white" dangerouslySetInnerHTML={{ __html: dict.aboutUs.description }} />

                            <p className="text-xs md:text-sm text-white" dangerouslySetInnerHTML={{ __html: dict.aboutUs.philosophy.description }} />

                            <p className="text-xs md:text-sm text-white" dangerouslySetInnerHTML={{ __html: dict.aboutUs.presence.description }} />
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1.5 w-full">
                            {cards.map((card) => (
                                <div key={card.id} className="aspect-[5/3]">
                                    <Card className="h-full w-full flex flex-col items-center justify-center text-center p-4 bg-white/5 backdrop-blur-sm border-0 text-white">
                                        <div className="h-14 sm:h-16 mb-3">
                                            <Image
                                                src={card.icon}
                                                alt={card.alt}
                                                width={60}
                                                height={60}
                                                className="object-contain h-full w-auto"
                                            />
                                        </div>
                                        <p className="text-xs sm:text-sm">{card.description}</p>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Partners />

            {/* Contact Section */}
            <section className="relative min-h-screen contact-bg">
                <div className="container mx-auto px-4 py-48 relative z-10">
                    <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
                        {/* Left Side - Contact Information */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-sm p-8 h-full md:col-span-2">
                            <div className="space-y-8">
                                <SmoothReveal className="mb-8">
                                    <h1 className="text-4xl md:text-6xl font-bold text-white dharma mb-4">Our contacts</h1>
                                </SmoothReveal>
                                <SmoothReveal>
                                    <div className="flex items-center space-x-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="text-white font-semibold">{dict.contact.info.phone.title}</h3>
                                            </div>
                                            <p className="text-gray-300 text-sm">{dict.contact.info.phone.value}</p>
                                        </div>
                                    </div>
                                </SmoothReveal>

                                <SmoothReveal>
                                    <div className="flex items-center space-x-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="text-white font-semibold">{dict.contact.info.email.title}</h3>
                                            </div>
                                            <p className="text-gray-300 text-sm">{dict.contact.info.email.value}</p>
                                        </div>
                                    </div>
                                </SmoothReveal>

                                <SmoothReveal>
                                    <div className="flex items-center space-x-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="text-white font-semibold">{dict.contact.info.address.title}</h3>
                                            </div>
                                            <p className="text-gray-300 text-sm">{dict.contact.info.address.value}</p>
                                        </div>
                                    </div>
                                </SmoothReveal>
                            </div>
                        </div>

                        {/* Right Side - Title and Form */}
                        <div className="flex flex-col h-full md:col-span-3">
                            <SmoothReveal className="mb-8">
                                <h1 className="text-4xl md:text-6xl font-bold text-white dharma mb-4">{dict.contact.title}</h1>
                            </SmoothReveal>

                            <SmoothReveal className="flex-grow">
                                <form
                                    action="https://formsubmit.co/your-email@example.com"
                                    method="POST"
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-white mb-2">{dict.contact.form.name.label}</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                placeholder={dict.contact.form.name.placeholder}
                                                className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white rounded-sm text-white focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-white mb-2">{dict.contact.info.email.title}</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                placeholder={dict.contact.form.email.placeholder}
                                                className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white rounded-sm text-white focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-white mb-2">{dict.contact.form.message.label}</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={4}
                                            placeholder={dict.contact.form.message.placeholder}
                                            className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white rounded-sm text-white"
                                        ></textarea>
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="vitalYellow"
                                        className="w-full bg-vitalYellow text-black hover:opacity-90"
                                    >
                                        {dict.contact.form.submit}
                                    </Button>
                                </form>
                            </SmoothReveal>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
