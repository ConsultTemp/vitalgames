'use client'
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import FloatingImage from "@/components/bg-image-component"
import SmoothReveal from "@/components/smooth-reveal"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function ContactPage() {
    const { dictionary: dict } = useLanguage()

    return (
        <main className="relative min-h-screen cabinet-bg">
            <div className="container mx-auto px-4 py-48 relative z-10 ">
                <div className="max-w-4xl mx-auto  bg-black/50 rounded-sm p-4 backdrop-blur-sm">
                    <SmoothReveal className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-white dharma mb-4">{dict.contact.title}</h1>
                        <p className="text-gray-300 text-sm">{dict.contact.subtitle}</p>
                    </SmoothReveal>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <SmoothReveal>
                                <div className="flex items-center space-x-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2"><Phone className="w-6 h-6 text-vitalYellow" /><h3 className="text-white font-semibold">{dict.contact.info.phone.title}</h3></div>
                                        <p className="text-gray-300 text-sm">{dict.contact.info.phone.value}</p>
                                    </div>
                                </div>
                            </SmoothReveal>

                            <SmoothReveal>
                                <div className="flex items-center space-x-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2"><Mail className="w-6 h-6 text-vitalYellow" /><h3 className="text-white font-semibold">{dict.contact.info.email.title}</h3></div>
                                        <p className="text-gray-300 text-sm">{dict.contact.info.email.value}</p>
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
                                    <label htmlFor="name" className="block text-white mb-2">{dict.contact.form.name.label}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder={dict.contact.form.name.placeholder}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-vitalYellow"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-white mb-2">{dict.contact.info.phone.title}</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-vitalYellow"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-white mb-2">{dict.contact.form.message.label}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder={dict.contact.form.message.placeholder}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-vitalYellow"
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
        </main>
    )
} 