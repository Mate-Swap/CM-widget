"use client"

import { useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import TopperWidget from "@/topper-widget"

export default function Home() {
  // Force dark class on html element for testing
  useEffect(() => {
    // This is just to ensure the dark mode toggle works in the preview
    // You wouldn't need this in a real application with ThemeProvider
    const htmlElement = document.documentElement
    const toggleDarkMode = (e: KeyboardEvent) => {
      if (e.key === "d") {
        htmlElement.classList.toggle("dark")
      }
    }

    window.addEventListener("keydown", toggleDarkMode)
    return () => window.removeEventListener("keydown", toggleDarkMode)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <TopperWidget />
      </div>
    </ThemeProvider>
  )
}

