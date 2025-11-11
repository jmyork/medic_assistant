"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, CreditCard, Activity, FileText, Stethoscope, Scale } from "lucide-react"

export function PatientHistory() {
  const router = useRouter()

  const patientData = {
    name: "João Silva",
    bi: "123456789LA041",
    email: "joao.silva@email.com",
    avatar: "/patient-consultation.png",
    weight: "75 kg",
    height: "1.75 m",
    chronicDiseases: ["Hipertensão", "Diabetes Tipo 2"],
  }

  const symptomsHistory = [
    {
      id: 1,
      date: "2025-10-15",
      symptoms: "Dor de cabeça intensa, náuseas e sensibilidade à luz",
      intensity: "Alta",
      duration: "3 dias",
      status: "Avaliado",
    },
    {
      id: 2,
      date: "2025-09-20",
      symptoms: "Fadiga constante e falta de energia",
      intensity: "Média",
      duration: "2 semanas",
      status: "Avaliado",
    },
  ]

  const examsHistory = [
    {
      id: 1,
      date: "2025-10-10",
      type: "Hemograma Completo",
      result: "Normal",
      status: "Concluído",
    },
    {
      id: 2,
      date: "2025-08-15",
      type: "Glicemia em Jejum",
      result: "110 mg/dL",
      status: "Concluído",
    },
  ]

  const consultationsHistory = [
    {
      id: 1,
      date: "2025-10-16",
      doctor: "Dr. Maria Santos",
      specialty: "Clínica Geral",
      diagnosis: "Enxaqueca",
      status: "Validado",
    },
    {
      id: 2,
      date: "2025-09-25",
      doctor: "Dr. Pedro Costa",
      specialty: "Endocrinologia",
      diagnosis: "Anemia Leve",
      status: "Validado",
    },
  ]

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Patient Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Perfil do Paciente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={patientData.avatar || "/placeholder.svg"} alt={patientData.name} />
                  <AvatarFallback className="text-2xl">
                    {patientData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{patientData.name}</h3>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3 text-sm">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">BI</p>
                    <p className="font-medium">{patientData.bi}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{patientData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Scale className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Peso Atual</p>
                    <p className="font-medium">{patientData.weight}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Altura</p>
                    <p className="font-medium">{patientData.height}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chronic Diseases Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Doenças Agregadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patientData.chronicDiseases.length > 0 ? (
                <div className="space-y-2">
                  {patientData.chronicDiseases.map((disease, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm">{disease}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma doença crônica registrada</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Histórico Clínico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="symptoms" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="symptoms">Sintomas</TabsTrigger>
                  <TabsTrigger value="exams">Exames</TabsTrigger>
                  <TabsTrigger value="consultations">Consultas</TabsTrigger>
                </TabsList>

                {/* Symptoms Tab */}
                <TabsContent value="symptoms" className="space-y-4 mt-4">
                  {symptomsHistory.map((record) => (
                    <Card key={record.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(record.date).toLocaleDateString("pt-PT")}
                            </p>
                          </div>
                          <Badge variant={record.status === "Avaliado" ? "default" : "secondary"}>
                            {record.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-3">{record.symptoms}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>
                            <strong>Intensidade:</strong> {record.intensity}
                          </span>
                          <span>
                            <strong>Duração:</strong> {record.duration}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Exams Tab */}
                <TabsContent value="exams" className="space-y-4 mt-4">
                  {examsHistory.map((exam) => (
                    <Card key={exam.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-sm">{exam.type}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(exam.date).toLocaleDateString("pt-PT")}
                            </p>
                          </div>
                          <Badge variant={exam.status === "Concluído" ? "default" : "secondary"}>{exam.status}</Badge>
                        </div>
                        <div className="text-sm">
                          <strong>Resultado:</strong> {exam.result}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Consultations Tab */}
                <TabsContent value="consultations" className="space-y-4 mt-4">
                  {consultationsHistory.map((consultation) => (
                    <Card key={consultation.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-sm">{consultation.doctor}</h4>
                            <p className="text-xs text-muted-foreground">{consultation.specialty}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(consultation.date).toLocaleDateString("pt-PT")}
                            </p>
                          </div>
                          <Badge variant={consultation.status === "Validado" ? "default" : "secondary"}>
                            {consultation.status}
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <strong>Diagnóstico:</strong> {consultation.diagnosis}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
