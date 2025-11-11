"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, User, LogOut, FileText, AlertCircle, Stethoscope } from "lucide-react"

// --------------------- TYPES ---------------------
type Consultation = {
  id: number
  patientName: string
  patientNumber: string
  symptoms: string[]
  date: string
  status: "pending_validation" | "validated"
}

// --------------------- MOCK DATA ---------------------
const consultations: Consultation[] = [
  { id: 1, patientName: "João Silva", patientNumber: "MED-001", symptoms: ["Dor de Cabeça", "Febre"], date: "2025-10-16", status: "pending_validation" },
  { id: 2, patientName: "Maria Santos", patientNumber: "MED-002", symptoms: ["Dor de Estômago", "Náusea"], date: "2025-10-16", status: "pending_validation" },
  { id: 3, patientName: "Pedro Costa", patientNumber: "MED-003", symptoms: ["Tosse", "Fadiga"], date: "2025-10-15", status: "validated" },
]

// --------------------- STATUS MAP ---------------------
const statusMap = {
  pending_validation: { label: "Por Validar", color: "bg-orange-100 text-orange-800" },
  validated: { label: "Validado", color: "bg-green-100 text-green-800" },
}

// --------------------- PATIENT CARD ---------------------
function PatientCard({ consultation, onClick }: { consultation: Consultation; onClick: () => void }) {
  return (
    <Card
      className={`cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ${
        consultation.status === "pending_validation" ? "border-orange-200 bg-orange-50" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Avatar>
                <AvatarFallback>
                  {consultation.patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{consultation.patientName}</h3>
                <p className="text-sm text-muted-foreground">{consultation.patientNumber}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {consultation.symptoms.map((symptom) => (
                <Badge key={symptom} variant="secondary">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <Badge className={`${statusMap[consultation.status].color}`}>{statusMap[consultation.status].label}</Badge>
            <p className="text-sm text-muted-foreground mt-2">
              {new Date(consultation.date).toLocaleDateString("pt-PT")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// --------------------- DASHBOARD ---------------------
export function DoctorDashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleConsultationClick = (id: number) => router.push(`/doctor/consultation/${id}`)

  const filteredConsultations = consultations.filter(
    (c) =>
      c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.patientNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingCount = consultations.filter((c) => c.status === "pending_validation").length
  const validatedTodayCount = consultations.filter(
    (c) => c.status === "validated" && c.date === "2025-10-16",
  ).length

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-semibold">Medical Assistant</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <User className="h-5 w-5" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {pendingCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Médico</p>
                <p className="text-xs text-muted-foreground">Ordem: 12345</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/doctor/reports")}>
              <FileText className="mr-2 h-4 w-4" /> Relatórios
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/login")} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* CARDS MÉTRICAS */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Relatórios Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Relatórios Validados Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{validatedTodayCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{consultations.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* BUSCA */}
      <Card className="mb-6">
        <CardHeader>
          <div className="relative flex items-center gap-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar paciente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
      </Card>

      {/* LISTA DE PACIENTES */}
      <div className="space-y-4">
        {filteredConsultations.map((consultation) => (
          <PatientCard
            key={consultation.id}
            consultation={consultation}
            onClick={() => handleConsultationClick(consultation.id)}
          />
        ))}
      </div>
    </div>
  )
}
