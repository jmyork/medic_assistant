import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Assistente Médico - Sistema de Triagem",
  description: "Sistema de triagem de sintomas para pacientes e médicos",
  generator: "Assistente Médico WebApp (Next.js)",
  icons: {
    icon: "/stethoscope.png", 
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`font-sans antialiased ${_poppins.variable} ${_inter.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
