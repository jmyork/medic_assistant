"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, CheckCircle, Clock } from "lucide-react";
import { getValidatedReportsRequest } from "@/api/requests";

interface Report {
  id: string;
  patientName: string;
  patientNumber: string;
  date: string;
  symptoms: string[];
  status: string;
  validatedBy: string;
}

interface PreliminarReport {
  id: number;
  patientName: string;
  patientNumber: string;
  date: string;
  symptoms: string[];
  status: string;
}

export function DoctorReports() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchValidatedReports = async () => {
      try {
        setLoading(true);
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (!token) {
          setError("Token não encontrado. Por favor, faça login.");
          return;
        }

        const response = await getValidatedReportsRequest(token);

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

    fetchValidatedReports();
  }, []);

  // const pendingReports: PreliminarReport[] = [
  //   {
  //     id: 1,
  //     patientName: "João Silva",
  //     patientNumber: "MED-001",
  //     date: "2025-10-22",
  //     symptoms: ["Dor de Cabeça", "Febre"],
  //     status: "Pendente",
  //   },
  //   {
  //     id: 2,
  //     patientName: "Maria Santos",
  //     patientNumber: "MED-002",
  //     date: "2025-10-21",
  //     symptoms: ["Tosse", "Fadiga"],
  //     status: "Pendente",
  //   },
  // ];

  // // Dados padrão enquanto carrega ou se houver erro
  // const defaultValidatedReports: Report[] = [
  //   {
  //     id: "3",
  //     patientName: "Pedro Costa",
  //     patientNumber: "MED-003",
  //     date: "2025-10-20",
  //     symptoms: ["Dor no Peito"],
  //     status: "Validado",
  //     validatedBy: "Dr. António Silva",
  //   },
  //   {
  //     id: "4",
  //     patientName: "Ana Ferreira",
  //     patientNumber: "MED-004",
  //     date: "2025-10-19",
  //     symptoms: ["Náusea", "Dor de Estômago"],
  //     status: "Validado",
  //     validatedBy: "Dr. António Silva",
  //   },
  // ];

  const preliminarReports = reports.filter(
    (report) => report.status === "preliminar"
  );
  const validatedReports = reports.filter(
    (report) => report.status !== "preliminar"
  );

  const handleValidate = (reportId: string | number) => {
    router.push(`/doctor/consultation/${reportId}`);
  };

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-6">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push("/doctor/dashboard")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao Dashboard
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Gestão de Relatórios
        </h1>
        <p className="text-muted-foreground">
          Valide relatórios gerados automaticamente pelo sistema
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive rounded-md">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Carregando relatórios validados...
          </p>
        </div>
      )}

      {!loading && (
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Preliminar
            </TabsTrigger>
            <TabsTrigger value="validated" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Outros Estados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {preliminarReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">
                            {report.patientName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {report.patientNumber}
                          </p>
                        </div>
                      </div>

                      <div className="ml-8 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Data:{" "}
                          {new Date(report.date).toLocaleDateString("pt-PT")}
                        </p>
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Sintomas Reportados:
                          </p>
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
                      <Badge variant="default">{report.status.toUpperCase()}</Badge>
                      <Button
                        size="sm"
                        onClick={() => handleValidate(report.id)}
                      >
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
                          <h3 className="font-semibold">
                            {report.patientName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {report.patientNumber}
                          </p>
                        </div>
                      </div>

                      <div className="ml-8 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Data:{" "}
                          {new Date(report.date).toLocaleDateString("pt-PT")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Validado por: {report.validatedBy}
                        </p>
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Sintomas Reportados:
                          </p>
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleValidate(report.id)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {validatedReports.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum relatório validado encontrado
              </p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
