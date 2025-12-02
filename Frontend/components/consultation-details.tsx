"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Trash2, Plus } from "lucide-react";
import {
  consultaMarkAsDone,
  getValidatedReportDetailsRequest,
} from "@/api/requests/consultas";

const patientData = {
  name: "João Silva",
  number: "MED-001",
  bi: "123456789",
  age: 35,
  weight: "75 kg",
  height: "1.75 m",
  symptoms: ["Dor de Cabeça", "Febre", "Fadiga"],

  history: [
    { date: "2025-09-10", diagnosis: "Gripe", result: "Positivo" },
    { date: "2025-08-15", diagnosis: "Check-up", result: "Normal" },
  ],
  exams: [
    { name: "Raio-X", date: "2025-10-15", result: "Normal" },
    { name: "Exame de Sangue", date: "2025-10-14", result: "Pendente" },
  ],
};
type patientDataType = {
  id: string;
  patientName: string;
  patientNumber: string;
  bi: string;
  age: number;
  data_consulta: Date;
  quantidade_consultas: number;
  date?: Date;
  documento: string;
  data_nascimento?: Date;
  weight: string;
  height: string;
  symptoms: string[];
  history: { date: string; diagnosis: string; result: string }[];
  exams: { name: string; date: string; result: string }[];
};

export function ConsultationDetails({
  consultationId,
}: {
  consultationId: string;
}) {
  const router = useRouter();

  const [opinion, setOpinion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [exams, setExams] = useState(patientData.exams);
  const [recommendations, setRecommendations] = useState<string[]>([
    "Repouso",
    "Hidratação",
    "Medicação para Febre",
  ]);
  const [reports, setReports] = useState<patientDataType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        setLoading(true);
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (!token) {
          // setError("Token não encontrado. Por favor, faça login.");
          return;
        }

        const response = await getValidatedReportDetailsRequest(
          token,
          consultationId
        );

        if (response.ok) {
          const data = await response.json();

          setReports(data.data || []);
        } else {
          console.error(
            "Erro ao buscar relatórios validados:",
            response.status
          );
          setError("Erro ao carregar relatórios validados");
        }
      } catch (err) {
        console.error("Erro ao carregar relatórios:", err);
        setError("Erro ao carregar relatórios validados");
      } finally {
        setLoading(false);
      }
    };

    fetchReportDetails();
  }, []);
  const [newExam, setNewExam] = useState("");
  const [newRecommendation, setNewRecommendation] = useState("");

  const handleAddExam = () => {
    if (newExam.trim() === "") return;
    setExams([
      ...exams,
      { name: newExam, date: new Date().toISOString(), result: "Pendente" },
    ]);
    setNewExam("");
  };

  const handleRemoveExam = (index: number) => {
    setExams(exams.filter((_, i) => i !== index));
  };

  const handleAddRecommendation = () => {
    if (newRecommendation.trim() === "") return;
    setRecommendations([...recommendations, newRecommendation]);
    setNewRecommendation("");
  };

  const handleRemoveRecommendation = (index: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };

  const markAsDone = (consultationId: string) => {
    consultaMarkAsDone(localStorage.getItem("token") || "", consultationId);
    router.push("/doctor/dashboard");
  };

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-6">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      {/* Dados do paciente */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-lg">{""}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{reports?.patientName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {reports?.patientNumber}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">BI:</span>
                <span className="ml-2 font-medium">{reports?.documento}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Idade:</span>
                <span className="ml-2 font-medium">
                  {reports?.data_nascimento
                    ? new Date(reports.data_nascimento).toLocaleDateString(
                        "pt-PT"
                      )
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Peso:</span>
                <span className="ml-2 font-medium">{reports?.weight}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Altura:</span>
                <span className="ml-2 font-medium">{reports?.height}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Consultas Totais</p>
              <p className="text-2xl font-bold">
                {reports?.quantidade_consultas}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Última Consulta</p>
              <p className="text-sm font-medium">
                {reports?.date
                  ? new Date(reports.date).toLocaleDateString("pt-PT")
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aba de informações */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar informações..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="symptoms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="symptoms">Sintomas</TabsTrigger>
              <TabsTrigger value="exams">Exames</TabsTrigger>
              <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
            </TabsList>

            {/* Sintomas (somente leitura) */}
            <TabsContent value="symptoms" className="space-y-4 mt-4">
              <h3 className="font-semibold mb-3">Sintomas Reportados</h3>
              <div className="flex flex-wrap gap-2">
                {reports?.symptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant="secondary"
                    className="px-4 py-2"
                  >
                    {symptom}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            {/* Exames (adicionar/remover) */}
            <TabsContent value="exams" className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold mb-3">Exames Solicitados</h3>
                <div className="space-y-3">
                  {exams.map((exam, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{exam.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(exam.date).toLocaleDateString("pt-PT")}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() => handleRemoveExam(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Input
                    placeholder="Adicionar novo exame..."
                    value={newExam}
                    onChange={(e) => setNewExam(e.target.value)}
                  />
                  <Button onClick={handleAddExam}>
                    <Plus className="h-4 w-4 mr-2" /> Adicionar
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Recomendações (adicionar/remover) */}
            <TabsContent value="recommendations" className="space-y-4 mt-4">
              <h3 className="font-semibold mb-3">Recomendações Médicas</h3>
              <div className="flex flex-wrap gap-2">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 border px-3 py-2 rounded-full"
                  >
                    <span>{rec}</span>
                    <button
                      onClick={() => handleRemoveRecommendation(index)}
                      className="text-red-500 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder="Adicionar nova recomendação..."
                  value={newRecommendation}
                  onChange={(e) => setNewRecommendation(e.target.value)}
                />
                <Button onClick={handleAddRecommendation}>
                  <Plus className="h-4 w-4 mr-2" /> Adicionar
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Opinião médica final */}
          <div className="mt-6 space-y-4">
            <Label htmlFor="opinion">Opinião Médica</Label>
            <Textarea
              id="opinion"
              placeholder="Escreva sua avaliação e recomendações finais..."
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              rows={6}
              className="mt-2"
            />
            <Button onClick={() => markAsDone(reports?.id!)} className="w-full">
              Validar Pré-Diagnóstico
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
