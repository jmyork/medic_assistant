"use client"; // Necessário para o uso de hooks

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, FileText, Heart, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Tipagens das estruturas de dados
interface PossibleCondition {
  name: string;
  probability: string;
  severity: string;
  description: string;
}

interface RecommendedTest {
  id: number;
  name: string;
  description: string;
}

interface PreDiagnosis {
  id: number;
  patientName: string;
  patientBI: string;
  symptoms: string;
  intensity: number;
  duration: string;
  frequency: string;
  submittedDate: string;
  possibleConditions: PossibleCondition[];
  recommendedTests: RecommendedTest[];
  recommendations: string[];
}

// Dados simulados
const pendingPreDiagnoses: PreDiagnosis[] = [
  {
    id: 1,
    patientName: "João Silva",
    patientBI: "123456789",
    symptoms: "Dor de cabeça, febre, fadiga",
    intensity: 7,
    duration: "2 dias",
    frequency: "Contínua",
    submittedDate: "2025-10-27",
    possibleConditions: [
      { name: "Gripe Comum", probability: "Alta", severity: "Leve", description: "Infecção viral comum" },
      { name: "Enxaqueca", probability: "Média", severity: "Moderada", description: "Cefaleia vascular" },
      { name: "Sinusite", probability: "Baixa", severity: "Leve", description: "Inflamação dos seios nasais" },
    ],
    recommendedTests: [
      { id: 1, name: "Hemograma Completo", description: "Análise de sangue completa" },
      { id: 2, name: "Teste de COVID-19", description: "Teste rápido de COVID" },
    ],
    recommendations: [
      "Repouso por 24-48 horas",
      "Hidratação abundante",
      "Paracetamol 500mg a cada 6 horas",
    ],
  },
];

export function DoctorPreDiagnosisValidation(): JSX.Element {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState<PreDiagnosis>(pendingPreDiagnoses[0]);
  const [validationNotes, setValidationNotes] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const handleValidate = (): void => {
    setIsValidating(true);
    setTimeout(() => {
      alert("Pré-diagnóstico validado com sucesso!");
      setIsValidating(false);
      setValidationNotes("");
    }, 1500);
  };

  const handleLogout = (): void => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-8">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h1 className="text-3xl font-bold text-foreground">Validar Pré-Diagnósticos</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Analise e valide os pré-diagnósticos do sistema
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <User className="h-5 w-5" />
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
                <FileText className="mr-2 h-4 w-4" />
                <span>Relatórios</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Badge Alert */}
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <Clock className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-900">Pré-Diagnósticos Pendentes</AlertTitle>
          <AlertDescription className="text-amber-800">
            Você tem {pendingPreDiagnoses.length} pré-diagnóstico(s) aguardando validação.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de relatórios */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                <CardTitle className="text-lg">Fila de Validação</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2">
                {pendingPreDiagnoses.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition ${
                      selectedReport.id === report.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-sm">{report.patientName}</p>
                        <p className="text-xs text-muted-foreground">BI: {report.patientBI}</p>
                      </div>
                      <Badge className="flex-shrink-0" variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        Pendente
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Painel de Detalhes */}
          <div className="lg:col-span-2">
            {selectedReport && (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="conditions">Condições</TabsTrigger>
                  <TabsTrigger value="validate">Validar</TabsTrigger>
                </TabsList>

                {/* Aba Visão Geral */}
                <TabsContent value="overview" className="space-y-4">
                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Heart className="h-5 w-5 text-blue-600" />
                        {selectedReport.patientName}
                      </CardTitle>
                      <CardDescription>BI: {selectedReport.patientBI}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Sintomas</p>
                          <p className="font-medium mt-1">{selectedReport.symptoms}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Intensidade</p>
                          <p className="font-medium mt-1">{selectedReport.intensity}/10</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Duração</p>
                          <p className="font-medium mt-1">{selectedReport.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Frequência</p>
                          <p className="font-medium mt-1">{selectedReport.frequency}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Data de Submissão</p>
                        <p className="font-medium mt-1">{selectedReport.submittedDate}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                      <CardTitle className="text-lg">Recomendações Iniciais</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {selectedReport.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                      <CardTitle className="text-lg">Exames Recomendados</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-2">
                      {selectedReport.recommendedTests.map((test) => (
                        <div key={test.id} className="p-3 border rounded-lg">
                          <p className="font-semibold text-sm">{test.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{test.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Aba Condições */}
                <TabsContent value="conditions" className="space-y-4">
                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                      <CardTitle className="text-lg">Possíveis Condições</CardTitle>
                      <CardDescription>
                        Análise preliminar baseada nos sintomas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      {selectedReport.possibleConditions.map((condition, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <h3 className="font-semibold">{condition.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {condition.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Gravidade: {condition.severity}
                            </p>
                          </div>
                          <Badge
                            variant={condition.probability === "Alta" ? "default" : "outline"}
                          >
                            {condition.probability}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Aba Validar */}
                <TabsContent value="validate" className="space-y-4">
                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                      <CardTitle className="text-lg">Validar Pré-Diagnóstico</CardTitle>
                      <CardDescription>Adicione suas anotações profissionais</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-base font-medium">
                          Anotações Médicas
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Adicione qualquer observação ou ajuste ao pré-diagnóstico..."
                          value={validationNotes}
                          onChange={(e) => setValidationNotes(e.target.value)}
                          rows={6}
                          className="resize-none"
                        />
                      </div>

                      <Alert className="border-blue-200 bg-blue-50">
                        <AlertDescription className="text-blue-800">
                          Ao validar, o paciente será notificado e receberá as recomendações e exames
                          necessários.
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => setValidationNotes("")}
                        >
                          Limpar Notas
                        </Button>
                        <Button
                          onClick={handleValidate}
                          disabled={isValidating}
                          className="w-full"
                          size="lg"
                        >
                          {isValidating ? "Validando..." : "Validar Pré-Diagnóstico"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}