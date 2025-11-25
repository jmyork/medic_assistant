"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  User,
  AlertCircle,
  LogOut,
  FileText,
  Stethoscope,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/services";

export function SymptomForm() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [intensity, setIntensity] = useState([5]);
  const [duration, setDuration] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 novo estado de pesquisa

  const [possibleSymptoms, setPossibleSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔍 filtra sintomas conforme o texto digitado
  const filteredSymptoms = possibleSymptoms.filter((symptom) =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Buscar sintomas da API no mount
  useEffect(() => {
    let mounted = true;
    async function loadSymptoms() {
      setLoading(true);
      setError(null);
      try {
        // (path: string, params?: Params, headers?: Record<string, string>)
        const res = await api.get("/sintomas", { method: "GET" });
        if (!res.ok)
          throw new Error(`Erro ao carregar sintomas: ${res.status}`);
        const json = await res.json();
        const items = Array.isArray(json.data) ? json.data : [];
        const names = items.map((it: any) => it.nome || it.name || String(it));
        if (mounted) setPossibleSymptoms(names);
      } catch (err: any) {
        if (mounted) setError(err.message || "Erro desconhecido");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadSymptoms();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCheckboxChange = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    if (description.trim()) {
      router.push("/patient/results");
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const isFormValid = description.trim().length > 0 && duration && frequency;

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold ml-2">Medical Assistant</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Utente</p>
                <p className="text-xs text-muted-foreground">BI: 123456789</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/patient/history")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Histórico Clínico</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 text-red-600" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Layout de duas colunas */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Coluna principal direita */}
        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Descrição dos Sintomas</CardTitle>
              <CardDescription className="text-sm">
                As suas informações ajudam-nos a entender melhor o seu estado de
                saúde
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="description">O que está a sentir?</Label>
              <Textarea
                id="description"
                placeholder="Exemplo: Estou com dor de cabeça forte há 3 dias, principalmente pela manhã..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                className="resize-none"
              />

              {/* 🔽 Mostra sintomas selecionados */}
              {selectedSymptoms.length > 0 && (
                <div className="mt-4">
                  <Label className="text-sm font-medium">
                    Sintomas selecionados:
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSymptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* 🔼 Fim da nova secção */}

              <p className="text-xs text-muted-foreground">
                Inclua informações com a localização da dor e sintomas
                associados
              </p>
            </CardContent>
          </Card>

          {description.trim().length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Informações Adicionais
                </CardTitle>
                <CardDescription>
                  Ajude-nos a entender melhor os seus sintomas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Intensidade: {intensity[0]}/10</Label>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Leve</span>
                    <span>Moderada</span>
                    <span>Severa</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">
                    Há quanto tempo tem estes sintomas?
                  </Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Selecione a duração" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">Minutos</SelectItem>
                      <SelectItem value="hours">Horas</SelectItem>
                      <SelectItem value="days">Dias</SelectItem>
                      <SelectItem value="weeks">Semanas</SelectItem>
                      <SelectItem value="months">Meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">
                    Com que frequência sente estes sintomas?
                  </Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="constant">
                        Constante (o tempo todo)
                      </SelectItem>
                      <SelectItem value="frequent">
                        Frequente (várias vezes ao dia)
                      </SelectItem>
                      <SelectItem value="occasional">
                        Ocasional (algumas vezes por semana)
                      </SelectItem>
                      <SelectItem value="rare">
                        Raro (menos de uma vez por semana)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {description.trim().length > 0 && !isFormValid && (
            <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">Informações incompletas</p>
                <p className="text-amber-700">
                  Por favor, preencha a duração e frequência dos sintomas.
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={!isFormValid}
          >
            Enviar Sintomas
          </Button>
        </div>

        {/* Coluna lateral esquerda */}
        <div className="md:w-1/3 space-y-4">
          <Card>
            <CardContent>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Procurar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-4xl border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              </div>

              <div className="space-y-2">
                <Label>Possíveis Sintomas</Label>
                {loading ? (
                  <p className="text-sm text-muted-foreground italic">
                    Carregando sintomas...
                  </p>
                ) : error ? (
                  <p className="text-sm text-red-600 italic">
                    Erro ao carregar: {error}
                  </p>
                ) : filteredSymptoms.length > 0 ? (
                  filteredSymptoms.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedSymptoms.includes(symptom)}
                        onCheckedChange={() => handleCheckboxChange(symptom)}
                        className="rounded-4xl border border-border"
                      />
                      <span className="text-sm">{symptom}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Nenhum sintoma encontrado
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
