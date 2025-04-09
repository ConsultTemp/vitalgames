export default function About({ dictionary }: { dictionary: any }) {
  return (
    <section className="py-16 bg-black text-center">
      <p className="text-white text-xs w-full text-center mb-4">{dictionary.label}</p>
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl text-darkGray atacama mb-4">{dictionary.title}</h2>
        <p className="text-darkGray text-xs">{dictionary.paragraph1}</p>
      </div>
    </section>
  )
}

