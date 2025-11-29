"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  CreditCard,
  Activity,
  FileText,
  Stethoscope,
  Scale,
} from "lucide-react";
import {
  getPacienteDetailsRequest,
  getPacienteHistoryRequest,
} from "@/api/requests";

interface PatientData {
  name: string;
  documento: string;
  email: string;
  avatar?: string;
  weight: string;
  height: string;
  chronicDiseases: string[];
}

interface SymptomRecord {
  id: string;
  date: string;
  symptoms: string | string[];
  intensity: string;
  status: string;
}

export function PatientHistory({ patientId }: { patientId?: string }) {
  const router = useRouter();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [symptomsHistory, setSymptomsHistory] = useState<SymptomRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const pId = patientId || "6925a07bd79f36372924a8ca";

        if (!token) {
          setError("Token não encontrado. Por favor, faça login.");
          return;
        }

        // Buscar dados do paciente
        const patientDataResponse = await getPacienteDetailsRequest(token, pId);
        if (patientDataResponse.ok) {
          const { data } = await patientDataResponse.json();
          setPatientData(data);
        } else {
          console.error(
            "Erro ao buscar dados do paciente:",
            patientDataResponse.status
          );
        }

        // Buscar histórico de sintomas
        const patientHistoryResponse = await getPacienteHistoryRequest(
          token,
          pId
        );
        if (patientHistoryResponse.ok) {
          const { data } = await patientHistoryResponse.json();
          setSymptomsHistory(data || []);
        } else {
          console.error(
            "Erro ao buscar histórico do paciente:",
            patientHistoryResponse.status
          );
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar dados do paciente");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  // Dados padrão enquanto carrega
  const defaultPatientData: PatientData = {
    name: "João Silva",
    documento: "123456789LA041",
    email: "joao.silva@email.com",
    avatar: "/patient-consultation.png",
    weight: "75 kg",
    height: "1.75 m",
    chronicDiseases: ["Hipertensão", "Diabetes Tipo 2"],
  };

  const currentPatientData = patientData || defaultPatientData;

  // Dados de histórico padrão
  const defaultSymptomsHistory = [
    {
      id: "1",
      date: "2025-10-15",
      symptoms: "Dor de cabeça intensa, náuseas e sensibilidade à luz",
      intensity: "Alta",
      status: "Avaliado",
    },
    {
      id: "2",
      date: "2025-09-20",
      symptoms: "Fadiga constante e falta de energia",
      intensity: "Média",
      status: "Avaliado",
    },
  ];

  const currentSymptomsHistory =
    symptomsHistory.length > 0 ? symptomsHistory : defaultSymptomsHistory;

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
  ];

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
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Carregando dados do paciente...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="text-center py-8">
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

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
                  <AvatarImage
                    src={currentPatientData.avatar || "/placeholder.svg"}
                    alt={currentPatientData.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {currentPatientData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">
                  {currentPatientData.name}
                </h3>
              </div>

              <div className="space-y-3 pt-4 border-t">
                {/* <div className="flex items-center gap-3 text-sm">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">BI</p>
                    <p className="font-medium">{currentPatientData.documento}</p>
                  </div>
                </div> */}

                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{currentPatientData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Scale className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Peso Atual</p>
                    <p className="font-medium">{currentPatientData.weight}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Altura</p>
                    <p className="font-medium">{currentPatientData.height}</p>
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
              {currentPatientData.chronicDiseases.length > 0 ? (
                <div className="space-y-2">
                  {currentPatientData.chronicDiseases.map((disease, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-muted rounded-md"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm">{disease}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhuma doença crônica registrada
                </p>
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
                  {currentSymptomsHistory.map((record) => (
                    <Card key={record.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(record.date).toLocaleDateString(
                                "pt-PT"
                              )}
                            </p>
                          </div>
                          <Badge
                            variant={
                              record.status === "Avaliado"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {record.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-3">
                          {Array.isArray(record.symptoms)
                            ? record.symptoms.join(", ")
                            : record.symptoms}
                        </p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>
                            <strong>Intensidade:</strong> {record.intensity}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {currentSymptomsHistory.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nenhum sintoma registrado
                    </p>
                  )}
                </TabsContent>

                {/* Exams Tab */}
                <TabsContent value="exams" className="space-y-4 mt-4">
                  {examsHistory.map((exam) => (
                    <Card key={exam.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-sm">
                              {exam.type}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(exam.date).toLocaleDateString("pt-PT")}
                            </p>
                          </div>
                          <Badge
                            variant={
                              exam.status === "Concluído"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {exam.status}
                          </Badge>
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
                            <h4 className="font-semibold text-sm">
                              {consultation.doctor}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {consultation.specialty}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(consultation.date).toLocaleDateString(
                                "pt-PT"
                              )}
                            </p>
                          </div>
                          <Badge
                            variant={
                              consultation.status === "Validado"
                                ? "default"
                                : "secondary"
                            }
                          >
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
  );
}
