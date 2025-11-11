"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react"

export function ProtocolManagement() {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const protocols = [
    {
      id: 1,
      name: "Protocolo de Gripe",
      description: "Diretrizes para diagnóstico e tratamento de gripe comum",
      symptoms: ["Febre", "Dor de Cabeça", "Fadiga"],
      lastUpdated: "2025-10-15",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Protocolo de Hipertensão",
      description: "Algoritmo de análise para casos de pressão alta",
      symptoms: ["Dor de Cabeça", "Tontura"],
      lastUpdated: "2025-09-20",
      status: "Ativo",
    },
    {
      id: 3,
      name: "Protocolo de Diabetes",
      description: "Diretrizes para monitoramento e controle de diabetes",
      symptoms: ["Fadiga", "Sede Excessiva"],
      lastUpdated: "2025-08-10",
      status: "Ativo",
    },
  ]

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-6">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/admin/dashboard")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao Dashboard
      </Button>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Gestão de Protocolos Clínicos</h1>
          <p className="text-muted-foreground">Crie e edite diretrizes médicas e algoritmos de análise</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Protocolo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Protocolo</DialogTitle>
              <DialogDescription>Defina as diretrizes e algoritmos de análise</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="protocol-name">Nome do Protocolo</Label>
                <Input id="protocol-name" placeholder="Ex: Protocolo de Gripe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protocol-description">Descrição</Label>
                <Textarea id="protocol-description" placeholder="Descreva as diretrizes médicas..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protocol-symptoms">Sintomas Associados</Label>
                <Input id="protocol-symptoms" placeholder="Ex: Febre, Dor de Cabeça, Fadiga" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protocol-algorithm">Algoritmo de Análise</Label>
                <Textarea
                  id="protocol-algorithm"
                  placeholder="Defina o algoritmo de análise e recomendações..."
                  rows={6}
                />
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Criar Protocolo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {protocols.map((protocol) => (
          <Card key={protocol.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{protocol.name}</h3>
                    <Badge variant="default">{protocol.status}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{protocol.description}</p>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium mb-1">Sintomas Associados:</p>
                      <div className="flex flex-wrap gap-2">
                        {protocol.symptoms.map((symptom, index) => (
                          <Badge key={index} variant="secondary">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Última atualização: {new Date(protocol.lastUpdated).toLocaleDateString("pt-PT")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
