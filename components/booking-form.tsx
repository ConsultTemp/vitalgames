"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"

export default function BookingForm({ dictionary }: { dictionary: any }) {
  const { lang } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [differentVehicles, setDifferentVehicles] = useState(false)
  const [openPickupLocation, setOpenPickupLocation] = useState(false)
  const [pickupLocation, setPickupLocation] = useState("")

  // Mock data for pickup locations
  const locations = [
    { value: "roma_termini", label: "Roma Termini" },
    { value: "roma_tiburtina", label: "Roma Tiburtina" },
    { value: "roma_fiumicino", label: "Aeroporto Fiumicino" },
    { value: "roma_ciampino", label: "Aeroporto Ciampino" },
    { value: "napoli_centrale", label: "Napoli Centrale" },
    { value: "milano_centrale", label: "Milano Centrale" },
    { value: "firenze_smn", label: "Firenze S.M.N." },
  ]

  // Country codes for phone prefixes
  const countryCodes = [
    { value: "+39", label: "Italy (+39)" },
    { value: "+1", label: "USA (+1)" },
    { value: "+44", label: "UK (+44)" },
    { value: "+33", label: "France (+33)" },
    { value: "+49", label: "Germany (+49)" },
    { value: "+34", label: "Spain (+34)" },
    { value: "+41", label: "Switzerland (+41)" },
    { value: "+43", label: "Austria (+43)" },
    { value: "+31", label: "Netherlands (+31)" },
    { value: "+32", label: "Belgium (+32)" }
  ]

  // Hours for time selection
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return { value: hour, label: hour }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create hidden inputs for date and time
    const form = e.target as HTMLFormElement

    // Add date value
    if (date) {
      const dateInput = document.createElement("input")
      dateInput.type = "hidden"
      dateInput.name = "date"
      dateInput.value = format(date, "yyyy-MM-dd")
      form.appendChild(dateInput)
    }

    // Add time value
    if (time) {
      const timeInput = document.createElement("input")
      timeInput.type = "hidden"
      timeInput.name = "time"
      timeInput.value = time
      form.appendChild(timeInput)
    }

    // Add pickup location value
    if (pickupLocation) {
      const pickupInput = document.createElement("input")
      pickupInput.type = "hidden"
      pickupInput.name = "pickupLocation"
      pickupInput.value = pickupLocation
      form.appendChild(pickupInput)
    }

    // Submit the form
    form.submit()

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
        <h2 className="text-3xl text-center mb-8 atacama">{dictionary.title}</h2>
        <p className="text-center text-darkGray font-light mb-12">{dictionary.subtitle}</p>

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
            action="https://formsubmit.co/14f7eed24c722a9bcf728d63f1e3d6bf"
            method="POST"
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* FormSubmit configuration fields */}
            <input type="hidden" name="_subject" value="New Booking Request from Patty Car Website" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={`https://pattycar.com/${lang}/`} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="language" value={lang} />

            {/* Full width name field */}
            <div className="md:col-span-2 transition-all duration-300 ">
              <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
                {dictionary.nameLabel}
              </label>
              <Input type="text" id="name" name="name" required />
              <p className="text-xs text-gray-500 mt-1">{dictionary.nameHelperText}</p>
            </div>

            {/* Email and phone on the same row */}
            <div className="transition-all duration-300 ">
              <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                {dictionary.emailLabel}
              </label>
              <Input type="email" id="email" name="email" required />
            </div>

            <div className="transition-all duration-300 ">
              <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
                {dictionary.phoneLabel}
              </label>
              <div className="flex space-x-2">
                <Select name="phonePrefix">
                  <SelectTrigger className="w-1/3">
                    <SelectValue placeholder="+39" defaultValue="+39" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        {code.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input type="tel" id="phone" name="phoneNumber" className="w-2/3" required />
              </div>
            </div>

            <div className="transition-all duration-300 ">
              <label htmlFor="vehicleType" className="block text-sm text-gray-600 mb-1">
                {dictionary.vehicleTypeLabel}
              </label>
              <Select name="vehicleType" required>
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder={dictionary.selectVehicle} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="luxury">Luxury Sedan</SelectItem>
                  <SelectItem value="minibus">Mini Bus</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="transition-all duration-300 ">
              <label htmlFor="vehicleCount" className="block text-sm text-gray-600 mb-1">
                {dictionary.vehicleCountLabel}
              </label>
              <Select name="vehicleCount" defaultValue="1">
                <SelectTrigger id="vehicleCount">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="transition-all duration-300 ">
              <label htmlFor="date" className="block text-sm text-gray-600 mb-1">
                {dictionary.dateLabel}
              </label>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-100 border-transparent hover:bg-gray-200",
                        !date && "text-gray-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : ""}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} className="bg-white" />
                  </PopoverContent>
                </Popover>
                <Select name="time" onValueChange={setTime}>
                  <SelectTrigger className="w-1/3">
                    <SelectValue placeholder={dictionary.timeLabel || "Time"} />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour.value} value={hour.value}>
                        {hour.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="transition-all duration-300 ">
              <label htmlFor="pickupLocation" className="block text-sm text-gray-600 mb-1">
                {dictionary.departureLocationLabel || "Luogo di partenza"}
              </label>
              <Popover open={openPickupLocation} onOpenChange={setOpenPickupLocation}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPickupLocation}
                    className="w-full justify-between font-normal bg-gray-100 border-transparent hover:bg-gray-200"
                  >
                    {pickupLocation
                      ? locations.find((location) => location.value === pickupLocation)?.label
                      : dictionary.selectDepartureLocation || "Seleziona luogo di partenza"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder={dictionary.searchDepartureLocation || "Cerca luogo di partenza"} />
                    <CommandEmpty>{dictionary.noLocationsFound}</CommandEmpty>
                    <CommandGroup>
                      {locations.map((location) => (
                        <CommandItem
                          key={location.value}
                          value={location.value}
                          className="pickup-location-item"
                          onSelect={(currentValue) => {
                            setPickupLocation(currentValue === pickupLocation ? "" : currentValue)
                            setOpenPickupLocation(false)
                          }}
                        >
                          {location.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="transition-all duration-300 ">
              <label htmlFor="passengers" className="block text-sm text-gray-600 mb-1">
                {dictionary.passengersLabel}
              </label>
              <Input type="number" id="passengers" name="passengers" min="1" required />
            </div>

            <div className="transition-all duration-300 ">
              <label htmlFor="destination" className="block text-sm text-gray-600 mb-1">
                {dictionary.destinationLabel}
              </label>
              <Input type="text" id="destination" name="destination" required />
            </div>

            <div className="transition-all duration-300 ">
              <label htmlFor="luggage" className="block text-sm text-gray-600 mb-1">
                {dictionary.luggageLabel}
              </label>
              <Input type="number" id="luggage" name="luggage" min="0" required />
            </div>

            <div className="transition-all duration-300 ">
              <label htmlFor="flight" className="block text-sm text-gray-600 mb-1">
                {dictionary.flightTrainLabel}
              </label>
              <Input type="text" id="flight" name="flight" />
            </div>

            <div className="md:col-span-2 transition-all duration-300 ">
              <label htmlFor="billingInfo" className="block text-sm text-gray-600 mb-1">
                {dictionary.billingInfoLabel}
              </label>
              <Textarea id="billingInfo" name="billingInfo" rows={4} />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center mb-4 transition-all duration-300 hover:bg-gray-50 p-2">
                <Checkbox id="meetAndGreet" name="meetAndGreet" value="yes" className="mr-2" />
                <label htmlFor="meetAndGreet" className="text-sm text-gray-600">
                  {dictionary.meetAndGreetLabel}
                </label>
              </div>
              
              <div className="flex items-center mb-4 transition-all duration-300 hover:bg-gray-50 p-2">
                <Checkbox 
                  id="differentVehicles" 
                  name="differentVehicles" 
                  value="yes" 
                  className="mr-2"
                  checked={differentVehicles}
                  onCheckedChange={(checked) => setDifferentVehicles(checked as boolean)}
                />
                <label htmlFor="differentVehicles" className="text-sm text-gray-600">
                  {dictionary.differentVehiclesLabel}
                </label>
              </div>
              {differentVehicles && (
                <p className="text-xs text-gray-500 ml-6 mb-4">{dictionary.differentVehiclesHelperText}</p>
              )}
            </div>

            <div className="md:col-span-2 transition-all duration-300 ">
              <label htmlFor="notes" className="block text-sm text-gray-600 mb-1">
                {dictionary.notesLabel}
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