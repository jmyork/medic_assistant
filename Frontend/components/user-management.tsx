"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Plus, Search, Edit, Trash2 } from "lucide-react"

export function UserManagement() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const users = [
    { id: 1, name: "João Silva", email: "joao@exemplo.com", role: "Utente", status: "Ativo" },
    { id: 2, name: "Dr. António Silva", email: "antonio@exemplo.com", role: "Médico", status: "Ativo" },
    { id: 3, name: "Maria Santos", email: "maria@exemplo.com", role: "Utente", status: "Ativo" },
    { id: 4, name: "Admin Sistema", email: "admin@exemplo.com", role: "Administrador", status: "Ativo" },
    { id: 5, name: "Pedro Costa", email: "pedro@exemplo.com", role: "Utente", status: "Inativo" },
  ]

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-6">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/admin/dashboard")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao Dashboard
      </Button>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Gestão de Utilizadores</h1>
          <p className="text-muted-foreground">Registe e gerencie utilizadores do sistema</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Utilizador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registar Novo Utilizador</DialogTitle>
              <DialogDescription>Preencha os dados do novo utilizador</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Digite o nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Perfil</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Selecione o perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Utente</SelectItem>
                    <SelectItem value="doctor">Médico</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password Inicial</Label>
                <Input id="password" type="password" placeholder="Digite a senha" />
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Criar Utilizador
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar utilizador por nome ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Utilizadores Registados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline">{user.role}</Badge>
                  <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>{user.status}</Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
