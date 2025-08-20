"use client"

import { useRouter } from "next/navigation"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResumeDownload({ className = "" }) {
  const router = useRouter()

  const handleDownloadResume = () => {
    // Navigate to resume page
    router.push("/resume")

    // Trigger download after a short delay to allow page navigation
    setTimeout(() => {
      // Create a temporary link element for download
      const link = document.createElement("a")
      link.href = "/api/download-resume" // We'll create this API route
      link.download = "Farhan_Aaqil_Durrani_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 500)
  }

  return (
    <Button
      onClick={handleDownloadResume}
      className={`bg-slate-700/80 hover:bg-slate-600 backdrop-blur-sm text-white px-6 py-6 rounded-lg flex items-center gap-2 text-lg shadow-lg hover:shadow-slate-700/20 transition-all duration-300 ${className}`}
    >
      <Download className="h-5 w-5" />
      Download Resume
    </Button>
  )
}
