"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingForm({ dictionary }: { dictionary: any }) {
  const { lang } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    setIsSubmitting(true)
    // FormSubmit will handle the actual submission
    // This is just for the UI feedback
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
    }, 1000)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center mb-8">{dictionary.title}</h2>
        <p className="text-center text-gray-600 mb-12">{dictionary.subtitle}</p>

        {submitStatus === "success" ? (
          <div className="max-w-4xl mx-auto p-8 bg-green-50 border border-green-200 text-center fade-in">
            <h3 className="text-xl mb-4 text-green-800">{dictionary.successMessage}</h3>
            <p className="text-green-700 mb-6">
              {dictionary.successDescription || "We will contact you shortly to confirm your booking."}
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors duration-300"
            >
              {dictionary.newBooking || "Make another booking"}
            </button>
          </div>
        ) : (
          <form
            action="https://formsubmit.co/915048087f6b65d98e55fdda9ae6a9c6"
            method="POST"
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* FormSubmit configuration fields */}
            <input type="hidden" name="_subject" value="New Booking Request from Patty Car Website" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={`https://pattycar.com/${lang}/thank-you`} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="language" value={lang} />

            <div className="transition-all duration-300 hover:shadow-sm">
              <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
                {dictionary.nameLabel}
              </label>
              <Input type="text" id="name" name="name" required />
            </div>

            <div className="transition-all duration-300 hover:shadow-sm">
              <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
                {dictionary.phoneLabel}
              </label>
              <Input type="tel" id="phone" name="phone" required />
            </div>

            <div className="transition-all duration-300 hover:shadow-sm">
              <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                {dictionary.emailLabel}
              </label>
              <Input type="email" id="email" name="email" required />
            </div>

            <div className="transition-all duration-300 hover:shadow-sm">
              <label htmlFor="vehicleType" className="block text-sm text-gray-600 mb-1">
                {dictionary.vehicleTypeLabel}
              </label>
              <Select name="vehicleType" required>
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder={dictionary.selectVehicle} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="transition-all duration-300 hover:shadow-sm">
              <label htmlFor="vehicleCount" className="block text-sm text-gray-600 mb-1">
                {dictionary.vehicleCountLabel || "Number of Vehicles"}
              </label>
              <Select name="vehicleCount" defaultValue="1">
                <SelectTrigger id="vehicleCount">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="transition-all duration-300 hover:shadow-sm">
              <label htmlFor="date" className="block text-sm text-gray-600 mb-1">
                {dictionary.dateLabel}
              </label>
              <Input type="date" id="date" name="date" required />
            </div>

            <div className="transition-all duration-300 hover:shadow-sm">
              <label htmlFor="time" className="block text-sm text-gray-600 mb-1">
                {dictionary.timeLabel}
              </label>
              <Input type="time" id="time" name="time" required />
            </div>

            <div className="transition-all duration-300 hover:shadow-sm">
              <label htmlFor="passengers" className="block text-sm text-gray-600 mb-1">
                {dictionary.passengersLabel}
              </label>
              <Input type="number" id="passengers" name="passengers" min="1" required />
            </div>

            <div className="transition-all duration-300 hover:shadow-sm">
              <label htmlFor="destination" className="block text-sm text-gray-600 mb-1">
                {dictionary.destinationLabel || "Destination"}
              </label>
              <Input type="text" id="destination" name="destination" required />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center mb-4 transition-all duration-300 hover:bg-gray-50 p-2">
                <Checkbox id="meetAndGreet" name="meetAndGreet" value="yes" className="mr-2" />
                <label htmlFor="meetAndGreet" className="text-sm text-gray-600">
                  {dictionary.meetAndGreetLabel || "Meet and Greet service at the airport"}
                </label>
              </div>
            </div>

            <div className="md:col-span-2 transition-all duration-300 hover:shadow-sm">
              <label htmlFor="notes" className="block text-sm text-gray-600 mb-1">
                {dictionary.notesLabel || "Notes and extra requests"}
              </label>
              <Textarea id="notes" name="notes" rows={4} />
            </div>

            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-black text-white px-8 py-3 hover:bg-gray-800 transition-all duration-300 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? <span>{dictionary.submitting || "Submitting..."}</span> : dictionary.submitButton}
              </button>

              {submitStatus === "error" && (
                <p className="text-red-600 mt-4 fade-in">
                  {dictionary.errorMessage || "There was an error submitting your form. Please try again."}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

