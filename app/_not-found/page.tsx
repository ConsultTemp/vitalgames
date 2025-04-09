export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-6">Page not found</h2>
        <p className="mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <a href="/" className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors">
          Back to Home
        </a>
      </div>
    )
  }