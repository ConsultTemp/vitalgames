import { getPlaiceholder } from "plaiceholder"
import fs from "fs/promises"
import path from "path"

// Function to generate blur data URL for images
export async function getBlurDataURL(src: string): Promise<string> {
  try {
    const file = await fs.readFile(path.join(process.cwd(), "public", src))
    const { base64 } = await getPlaiceholder(file)
    return base64
  } catch (error) {
    // Return a default blur data URL
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
  }
}

// Function to optimize image metadata
export function optimizeImageMetadata(alt: string, title?: string) {
  return {
    alt,
    title: title || alt,
    fetchPriority: "high" as const,
    loading: "eager" as const,
  }
}

// Function to generate responsive image sizes
export function getResponsiveImageSizes(defaultSize = "100vw") {
  return {
    sizes: {
      default: defaultSize,
      mobile: "100vw",
      tablet: "50vw",
      desktop: "33vw",
    },
  }
}

