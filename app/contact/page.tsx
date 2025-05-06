'use client'
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import FloatingImage from "@/components/bg-image-component"
import SmoothReveal from "@/components/smooth-reveal"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
    return (
        <main className="relative min-h-screen">
            {/* Underlay Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/contact-bg.jpg"
                    alt="Contact Background"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <SmoothReveal className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-white dharma mb-4">Contattaci</h1>
                        <p className="text-gray-300 text-lg">Siamo qui per aiutarti. Contattaci per qualsiasi domanda o informazione.</p>
                    </SmoothReveal>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <SmoothReveal>
                                <div className="flex items-center space-x-4">
                                    <Phone className="w-6 h-6 text-vitalYellow" />
                                    <div>
                                        <h3 className="text-white font-semibold">Telefono</h3>
                                        <p className="text-gray-300">+39 123 456 7890</p>
                                        <p className="text-gray-300">+39 098 765 4321</p>
                                    </div>
                                </div>
                            </SmoothReveal>

                            <SmoothReveal>
                                <div className="flex items-center space-x-4">
                                    <Mail className="w-6 h-6 text-vitalYellow" />
                                    <div>
                                        <h3 className="text-white font-semibold">Email</h3>
                                        <p className="text-gray-300">info@vitalgames.com</p>
                                        <p className="text-gray-300">support@vitalgames.com</p>
                                    </div>
                                </div>
                            </SmoothReveal>
                        </div>

                        {/* Contact Form */}
                        <SmoothReveal>
                            <form 
                                action="https://formsubmit.co/your-email@example.com" 
                                method="POST"
                                className="space-y-6"
                            >
                                <div>
                                    <label htmlFor="name" className="block text-white mb-2">Nome Completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-vitalYellow"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-white mb-2">Telefono</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-vitalYellow"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-white mb-2">Messaggio</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-vitalYellow"
                                    ></textarea>
                                </div>

                                <Button 
                                    type="submit" 
                                    variant="vitalYellow"
                                    className="w-full bg-vitalYellow text-black hover:opacity-90"
                                >
                                    Invia Messaggio
                                </Button>
                            </form>
                        </SmoothReveal>
                    </div>
                </div>
            </div>
        </main>
    )
} 