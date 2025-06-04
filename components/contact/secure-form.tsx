"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, RefreshCw } from "lucide-react"

// Translations for the contact form
const translations = {
  it: {
    contactForm: {
      title: "Contattaci",
      phone: "Telefono",
      emailLabel: "Email",
      address: "Indirizzo",
      successMessage: "Messaggio inviato con successo!",
      errorMessage: "Si è verificato un errore durante l'invio.",
      captchaTitle: "Verifica CAPTCHA",
      captchaInstructions: "Inserisci il codice mostrato sopra.",
      captchaPlaceholder: "Codice CAPTCHA",
      captchaError: "Il codice CAPTCHA non è corretto.",
      cancel: "Annulla",
      confirm: "Conferma",
      requiredFields: "I campi contrassegnati con * sono obbligatori",
      name: "Nome",
      namePlaceholder: "Inserisci il tuo nome",
      email: "Email",
      emailPlaceholder: "Inserisci la tua email",
      message: "Messaggio",
      messagePlaceholder: "Scrivi il tuo messaggio",
      sending: "Invio in corso...",
    },
  },
  en: {
    contactForm: {
      title: "Contact Us",
      phone: "Phone",
      emailLabel: "Email",
      address: "Address",
      successMessage: "Message sent successfully!",
      errorMessage: "There was an error sending the message.",
      captchaTitle: "CAPTCHA Verification",
      captchaInstructions: "Please enter the code shown above.",
      captchaPlaceholder: "CAPTCHA Code",
      captchaError: "The CAPTCHA code is incorrect.",
      cancel: "Cancel",
      confirm: "Confirm",
      requiredFields: "Fields marked with * are required",
      name: "Name",
      namePlaceholder: "Enter your name",
      email: "Email",
      emailPlaceholder: "Enter your email",
      message: "Message",
      messagePlaceholder: "Write your message",
      sending: "Sending...",
    },
  },
  es: {
    contactForm: {
      title: "Contáctanos",
      phone: "Teléfono",
      emailLabel: "Correo Electrónico",
      address: "Dirección",
      successMessage: "¡Mensaje enviado con éxito!",
      errorMessage: "Hubo un error al enviar el mensaje.",
      captchaTitle: "Verificación CAPTCHA",
      captchaInstructions: "Por favor, ingresa el código que se muestra arriba.",
      captchaPlaceholder: "Código CAPTCHA",
      captchaError: "El código CAPTCHA es incorrecto.",
      cancel: "Cancelar",
      confirm: "Confirmar",
      requiredFields: "Los campos marcados con * son obligatorios",
      name: "Nombre",
      namePlaceholder: "Ingresa tu nombre",
      email: "Correo Electrónico",
      emailPlaceholder: "Ingresa tu correo electrónico",
      message: "Mensaje",
      messagePlaceholder: "Escribe tu mensaje",
      sending: "Enviando...",
    },
  },
}

// Interfacce TypeScript
interface FormData {
  name: string
  email: string
  message: string
  honeypot: string
  captcha: string
}

interface CaptchaData {
  code: string
}

interface FormErrors {
  [key: string]: string
  //@ts-ignore
  name?: string
  //@ts-ignore
  email?: string
  //@ts-ignore
  message?: string
  //@ts-ignore
  captcha?: string
  //@ts-ignore
  bot?: string
}

type SubmitStatus = "idle" | "success" | "error"

const SecureContactForm: React.FC<{ lang: string }> = ({ lang }) => {
  const dictionary = translations[lang].contactForm;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
    captcha: "",
  })

  const [captcha, setCaptcha] = useState<CaptchaData>({ code: "" })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [showCaptchaConfirmation, setShowCaptchaConfirmation] = useState<boolean>(false)
  const [captchaError, setCaptchaError] = useState<boolean>(false)

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = (): void => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptcha({ code })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (formData.honeypot) {
      newErrors.bot = "Bot rilevato"
      return newErrors
    }

    if (!formData.name.trim()) {
      newErrors.name = dictionary.name + " è obbligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = dictionary.email + " è obbligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida"
    }

    if (!formData.message.trim()) {
      newErrors.message = dictionary.message + " è obbligatorio"
    }

    return newErrors
  }

  const validateCaptcha = (): boolean => {
    if (!formData.captcha) {
      setCaptchaError(true)
      return false
    }

    if (formData.captcha.toUpperCase() !== captcha.code) {
      setCaptchaError(true)
      return false
    }

    setCaptchaError(false)
    return true
  }

  const refreshCaptcha = (): void => {
    generateCaptcha()
    setFormData((prev) => ({ ...prev, captcha: "" }))
    setCaptchaError(false)
  }

  const handleInitialSubmit = (): void => {
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setShowCaptchaConfirmation(true)
  }

  const handleCaptchaSubmit = async (): Promise<void> => {
    if (!validateCaptcha()) {
      refreshCaptcha()
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const submitData = new FormData()
      submitData.append("name", formData.name)
      submitData.append("email", formData.email)
      submitData.append("message", formData.message)
      submitData.append("_captcha", "false")
      submitData.append("_next", "https://vitalgames.com/it/thank-you")

      const response = await fetch("https://formsubmit.co/amministrazione@vitalgames.it", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          message: "",
          honeypot: "",
          captcha: "",
        })
        setShowCaptchaConfirmation(false)
        generateCaptcha()
      } else {
        throw new Error("Errore nell'invio")
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error("Errore invio form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelConfirmation = (): void => {
    setShowCaptchaConfirmation(false)
    refreshCaptcha()
  }

  return (
    <section className="relative min-h-screen contact-bg">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <aside className="bg-white/5 backdrop-blur-sm rounded-lg p-8 h-full md:col-span-2">
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 dharmalight">{dictionary.title}</h2>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="text-white" size={20} />
                <div className="space-y-2">
                  <h3 className="text-white font-semibold">{dictionary.phone}</h3>
                  <p className="text-gray-300 text-sm">+39 02 1234567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="text-white" size={20} />
                <div className="space-y-2">
                  <h3 className="text-white font-semibold">{dictionary.emailLabel}</h3>
                  <p className="text-gray-300 text-sm">info@vitalgames.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="text-white" size={20} />
                <div className="space-y-2">
                  <h3 className="text-white font-semibold">{dictionary.address}</h3>
                  <p className="text-gray-300 text-sm">Milano, Lombardia, Italia</p>
                </div>
              </div>
            </div>
          </aside>
          <div className="flex flex-col h-full md:col-span-3">
            <div className="mb-8">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 dharmalight">{dictionary.title}</h2>
            </div>

            <div className="flex-grow">
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300">
                  ✅ {dictionary.successMessage}
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                  ❌ {dictionary.errorMessage}
                </div>
              )}

              {showCaptchaConfirmation ? (
                <div className="p-8 bg-white/5 backdrop-blur-sm rounded-lg text-center">
                  <h3 className="text-xl mb-4 text-white">{dictionary.captchaTitle}</h3>
                  <p className="text-gray-300 mb-6">{dictionary.captchaInstructions}</p>

                  <div className="mb-6 flex flex-col items-center">
                    <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 p-6 rounded-md mb-4 select-none border-2 border-gray-400">
                      <div
                        className="text-3xl font-bold tracking-widest select-none text-gray-800 relative"
                        style={{
                          fontFamily: "serif",
                          letterSpacing: "0.3em",
                          transform: "rotate(-2deg) skew(-5deg, 1deg)",
                          textShadow: "2px 2px 4px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.8)",
                          filter: "blur(0.3px)",
                        }}
                      >
                        {captcha.code.split("").map((char, index) => (
                          <span
                            key={index}
                            style={{
                              display: "inline-block",
                              transform: `rotate(${Math.random() * 20 - 10}deg) translateY(${Math.random() * 6 - 3}px)`,
                              color: `hsl(${Math.random() * 60 + 200}, 70%, 30%)`,
                            }}
                          >
                            {char}
                          </span>
                        ))}
                      </div>

                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <line x1="0" y1="30" x2="100" y2="25" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                          <line x1="0" y1="70" x2="100" y2="75" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                          <line x1="20" y1="0" x2="25" y2="100" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
                          <line x1="80" y1="0" x2="75" y2="100" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
                        </svg>
                      </div>

                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 bg-white/70 rounded-full p-1"
                        aria-label="Refresh CAPTCHA"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="w-full max-w-xs">
                      <input
                        type="text"
                        name="captcha"
                        value={formData.captcha}
                        onChange={handleInputChange}
                        placeholder={dictionary.captchaPlaceholder}
                        maxLength={4}
                        className={`w-full px-4 py-2 bg-white/10 backdrop-blur-sm border rounded-lg text-white text-center text-lg tracking-widest focus:outline-none focus:ring-2 ${captchaError ? "border-red-500 focus:ring-red-400" : "border-white"
                          }`}
                        disabled={isSubmitting}
                        autoFocus
                        style={{ textTransform: "uppercase" }}
                      />
                      {captchaError && (
                        <p className="text-red-400 text-sm mt-2">{dictionary.captchaError}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      type="button"
                      onClick={handleCancelConfirmation}
                      className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                      disabled={isSubmitting}
                    >
                      {dictionary.cancel}
                    </button>
                    <button
                      type="button"
                      onClick={handleCaptchaSubmit}
                      disabled={isSubmitting || formData.captcha.length !== 4}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${isSubmitting || formData.captcha.length !== 4
                          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                          : "bg-vitalYellow hover:opacity-80 text-black"
                        }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          {dictionary.sending}
                        </span>
                      ) : (
                        dictionary.confirm
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: "1px",
                      height: "1px",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white mb-2">
                        {dictionary.name} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={dictionary.namePlaceholder}
                        className={`w-full px-4 py-2 bg-white/5 backdrop-blur-sm border rounded-lg text-white focus:outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-400" : "border-white"
                          }`}
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-white mb-2">
                        {dictionary.email} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={dictionary.emailPlaceholder}
                        className={`w-full px-4 py-2 bg-white/5 backdrop-blur-sm border rounded-lg text-white focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "border-white"
                          }`}
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white mb-2">
                      {dictionary.message} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder={dictionary.messagePlaceholder}
                      className={`w-full px-4 py-2 bg-white/5 backdrop-blur-sm border rounded-lg text-white focus:outline-none focus:ring-2 resize-vertical ${errors.message ? "border-red-500 focus:ring-red-400" : "border-white"
                        }`}
                      disabled={isSubmitting}
                    />
                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={handleInitialSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-black transition-all duration-200 ${isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-vitalYellow hover:opacity-80"
                      }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {dictionary.sending}
                      </span>
                    ) : (
                      dictionary.confirm
                    )}
                  </button>

                  <p className="text-gray-400 text-xs text-center">* {dictionary.requiredFields}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecureContactForm