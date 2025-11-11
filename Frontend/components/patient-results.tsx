"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle2, FileText, Clock } from "lucide-react"

const reportData = {
  id: 1,
  status: "pending_validation", // pending_processing | pending_validation | validated
  symptoms: ["Dor de Cabeça", "Febre", "Fadiga"],
  intensity: "Alta",
  duration: "2 dias",
  frequency: "Contínua",
  submittedDate: "2025-10-27",
  recommendations: [
    { id: 1, title: "Repouso", description: "Descanse por pelo menos 24-48 horas" },
    { id: 2, title: "Hidratação", description: "Beba pelo menos 2 litros de água por dia" },
    { id: 3, title: "Medicação", description: "Paracetamol 500mg a cada 6 horas se necessário" },
  ],
  possibleConditions: [
    { name: "Gripe Comum", probability: "Alta", severity: "Leve" },
    { name: "Enxaqueca", probability: "Média", severity: "Moderada" },
    { name: "Sinusite", probability: "Baixa", severity: "Leve" },
  ],
}

export function PatientResults() {
  const router = useRouter()
  const isPending = reportData.status === "pending_processing" || reportData.status === "pending_validation"

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-6">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Análise de Sintomas</h1>
        <p className="text-muted-foreground">Resultados baseados nas informações fornecidas</p>
      </div>

      {isPending && (
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Clock className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-900">Análise em Progresso</AlertTitle>
          <AlertDescription className="text-blue-800">
            O seu relatório está a ser processado e aguarda validação médica. Receberá uma notificação quando estiver
            pronto.
          </AlertDescription>
        </Alert>
      )}

      <Card className="mb-6 border-gray-200">
        <CardHeader>
          <CardTitle className="text-base">Sintomas Reportados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Sintomas</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {reportData.symptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Intensidade</p>
              <p className="font-medium mt-1">{reportData.intensity}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Duração</p>
              <p className="font-medium mt-1">{reportData.duration}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Frequência</p>
              <p className="font-medium mt-1">{reportData.frequency}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Data de Submissão</p>
            <p className="font-medium mt-1">{new Date(reportData.submittedDate).toLocaleDateString("pt-PT")}</p>
          </div>
        </CardContent>
      </Card>

      {reportData.status === "validated" ? (
        <>
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-900">Relatório Validado</AlertTitle>
            <AlertDescription className="text-green-800">
              O seu relatório foi avaliado e validado por um médico. As recomendações abaixo baseiam-se na análise
              profissional.
            </AlertDescription>
          </Alert>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Possíveis Condições
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportData.possibleConditions.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{condition.name}</p>
                      <p className="text-sm text-muted-foreground">Gravidade: {condition.severity}</p>
                    </div>
                    <Badge variant={condition.probability === "Alta" ? "default" : "outline"}>
                      {condition.probability}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Recomendações Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.recommendations.map((rec) => (
                  <div key={rec.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-1">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="mb-6 opacity-50">
          <CardContent className="p-6 text-center">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">As recomendações aparecerão após a validação médica.</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
          variant="outline" 
          className="w-full justify-start bg-transparent"
          onClick={() => router.push ("/patient/")}
          >
            Agendar Consulta Médica
          </Button>
          <Button 
          variant="outline" 
          className="w-full justify-start bg-transparent"
          onClick={() => router.push ("/patient/history")}
          >
            Ver Histórico Completo
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={() => router.push("/patient/symptoms")}
          >
            Registar Novos Sintomas
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
