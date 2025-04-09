import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"

export default async function NotFound({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">
        {lang === "it" ? "Pagina non trovata" : lang === "en" ? "Page not found" : "الصفحة غير موجودة"}
      </h2>
      <p className="mb-8">
        {lang === "it"
          ? "La pagina che stai cercando non esiste o è stata spostata."
          : lang === "en"
            ? "The page you are looking for doesn't exist or has been moved."
            : "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."}
      </p>
      <Link href={`/${lang}`} className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors">
        {lang === "it" ? "Torna alla Home" : lang === "en" ? "Back to Home" : "العودة إلى الصفحة الرئيسية"}
      </Link>
    </div>
  )
}

