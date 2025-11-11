"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, CheckCircle, Clock } from "lucide-react"

export function DoctorReports() {
  const router = useRouter()

  const pendingReports = [
    {
      id: 1,
      patientName: "João Silva",
      patientNumber: "MED-001",
      date: "2025-10-22",
      symptoms: ["Dor de Cabeça", "Febre"],
      status: "Pendente",
    },
    {
      id: 2,
      patientName: "Maria Santos",
      patientNumber: "MED-002",
      date: "2025-10-21",
      symptoms: ["Tosse", "Fadiga"],
      status: "Pendente",
    },
  ]

  const validatedReports = [
    {
      id: 3,
      patientName: "Pedro Costa",
      patientNumber: "MED-003",
      date: "2025-10-20",
      symptoms: ["Dor no Peito"],
      status: "Validado",
      validatedBy: "Dr. António Silva",
    },
    {
      id: 4,
      patientName: "Ana Ferreira",
      patientNumber: "MED-004",
      date: "2025-10-19",
      symptoms: ["Náusea", "Dor de Estômago"],
      status: "Validado",
      validatedBy: "Dr. António Silva",
    },
  ]

  const handleValidate = (reportId: number) => {
    router.push(`/doctor/consultation/${reportId}`)
  }

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-6">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/doctor/dashboard")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao Dashboard
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Gestão de Relatórios</h1>
        <p className="text-muted-foreground">Valide relatórios gerados automaticamente pelo sistema</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pendentes
          </TabsTrigger>
          <TabsTrigger value="validated" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Validados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-semibold">{report.patientName}</h3>
                        <p className="text-sm text-muted-foreground">{report.patientNumber}</p>
                      </div>
                    </div>

                    <div className="ml-8 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Data: {new Date(report.date).toLocaleDateString("pt-PT")}
                      </p>
                      <div>
                        <p className="text-sm font-medium mb-1">Sintomas Reportados:</p>
                        <div className="flex flex-wrap gap-2">
                          {report.symptoms.map((symptom, index) => (
                            <Badge key={index} variant="secondary">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Badge variant="default">{report.status}</Badge>
                    <Button size="sm" onClick={() => handleValidate(report.id)}>
                      Validar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="validated" className="space-y-4 mt-6">
          {validatedReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-semibold">{report.patientName}</h3>
                        <p className="text-sm text-muted-foreground">{report.patientNumber}</p>
                      </div>
                    </div>

                    <div className="ml-8 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Data: {new Date(report.date).toLocaleDateString("pt-PT")}
                      </p>
                      <p className="text-sm text-muted-foreground">Validado por: {report.validatedBy}</p>
                      <div>
                        <p className="text-sm font-medium mb-1">Sintomas Reportados:</p>
                        <div className="flex flex-wrap gap-2">
                          {report.symptoms.map((symptom, index) => (
                            <Badge key={index} variant="secondary">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className="bg-green-50">
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => handleValidate(report.id)}>
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
