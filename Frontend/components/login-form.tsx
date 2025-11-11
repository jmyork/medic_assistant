"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Stethoscope, Shield } from "lucide-react"
import { LoadingScreen } from "./loading-screen"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [userType, setUserType] = useState<"patient" | "doctor" | "admin">("patient")

  const handlePatientLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setUserType("patient")
    setShowLoadingScreen(true)
    // Simulate login delay before showing loading screen
    setTimeout(() => {
      // In production, this would be an API call
    }, 100)
  }

  const handleDoctorLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setUserType("doctor")
    setShowLoadingScreen(true)
    // Simulate login delay before showing loading screen
    setTimeout(() => {
      // In production, this would be an API call
    }, 100)
  }

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setUserType("admin")
    setShowLoadingScreen(true)
    // Simulate login delay before showing loading screen
    setTimeout(() => {
      // In production, this would be an API call
    }, 100)
  }

  const handleLoadingComplete = () => {
    if (userType === "patient") {
      router.push("/patient/symptoms")
    } else if (userType === "doctor") {
      router.push("/doctor/dashboard")
    } else if (userType === "admin") {
      router.push("/admin/dashboard")
    }
  }

  if (showLoadingScreen) {
    return <LoadingScreen userType={userType} onLoadComplete={handleLoadingComplete} />
  }

  return (
    <Card className="w-full max-w-lg border-0 shadow-2xl">
      <CardHeader className="space-y-3 pb-6">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold text-center text-balance">Assistente Médico</CardTitle>
        <CardDescription className="text-center text-base">Sistema de Triagem de Sintomas</CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 mb-6">
            <TabsTrigger value="patient" className="flex items-center gap-2">
              <UserCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Utente</span>
            </TabsTrigger>
            <TabsTrigger value="doctor" className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              <span className="hidden sm:inline">Médico</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patient" className="mt-0">
            <form onSubmit={handlePatientLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="patient-bi" className="text-sm font-medium">
                  BI (Bilhete de Identidade)
                </Label>
                <Input id="patient-bi" placeholder="000000000XX00" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-password" className="text-sm font-medium">
                  Password
                </Label>
                <Input id="patient-password" type="password" placeholder="••••••••" required className="h-11" />
              </div>
              <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isLoading}>
                {isLoading ? "A entrar..." : "Entrar"}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                Primeiro acesso? Contacte a recepção para criar sua conta.
              </p>
            </form>
          </TabsContent>

          <TabsContent value="doctor" className="mt-0">
            <form onSubmit={handleDoctorLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="doctor-order" className="text-sm font-medium">
                  Número da Ordem dos Médicos
                </Label>
                <Input id="doctor-order" placeholder="12345" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor-password" className="text-sm font-medium">
                  Password
                </Label>
                <Input id="doctor-password" type="password" placeholder="••••••••" required className="h-11" />
              </div>
              <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isLoading}>
                {isLoading ? "A entrar..." : "Entrar"}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                Acesso restrito a profissionais de saúde registados.
              </p>
            </form>
          </TabsContent>

          <TabsContent value="admin" className="mt-0">
            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="admin-username" className="text-sm font-medium">
                  Username
                </Label>
                <Input id="admin-username" placeholder="admin" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-sm font-medium">
                  Password
                </Label>
                <Input id="admin-password" type="password" placeholder="••••••••" required className="h-11" />
              </div>
              <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isLoading}>
                {isLoading ? "A entrar..." : "Entrar"}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">Acesso administrativo ao sistema.</p>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
