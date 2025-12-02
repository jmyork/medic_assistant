"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  FileText,
  Settings,
  BarChart,
  User,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getQtdConsultasMesRequest,
  getQtdConsultasRequest,
  getUserCountRequest,
} from "@/api/requests/auth";
import { getProtocolosDoencaSintomasRequest } from "@/api/requests/doenca";

export function AdminDashboard() {
  const router = useRouter();
  const [userCount, setUserCount] = useState();
  const [protocolosCount, setProtocolosCount] = useState();
  const [consultaQtdMes, setConsultaQtdMes] = useState();
  const [consultaQtd, setConsultaQtd] = useState();

  useEffect(() => {
    const getPrimaryData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (token && user.tipo !== "admin") {
          router.push("/login");
        }
        const userCountResponse = await getUserCountRequest(
          localStorage.getItem("token")!
        );
        const protocolosCountResponse =
          await getProtocolosDoencaSintomasRequest(token!);
        const consultasQtdMesResponse = await getQtdConsultasMesRequest(token!);
        const consultasQtdResponse = await getQtdConsultasRequest(token!);

        if (
          userCountResponse.ok &&
          protocolosCountResponse.ok &&
          consultasQtdMesResponse.ok &&
          consultasQtdResponse.ok
        ) {
          setUserCount((await userCountResponse.json()).data);
          setConsultaQtd((await consultasQtdResponse.json()).data);
          setConsultaQtdMes((await consultasQtdMesResponse.json()).data);
          setProtocolosCount((await protocolosCountResponse.json()).data);
        }
      } catch (e: any) {
        throw new Error(e);
      }
    };
  }, []);
  const stats = [
    { label: "Total de Utilizadores", value: userCount, icon: Users },
    { label: "Relatórios Gerados", value: consultaQtd, icon: FileText },
    { label: "Protocolos Ativos", value: protocolosCount, icon: Settings },
    { label: "Consultas Este Mês", value: consultaQtdMes, icon: BarChart },
  ];

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Painel de Administração
          </h1>
          <p className="text-muted-foreground">
            Gestão do sistema de assistente médico
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Administrador</p>
                <p className="text-xs text-muted-foreground">
                  admin@sistema.pt
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/login")}
              className="text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Gerir Utilizadores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Registe novos utilizadores, atribua perfis e gerencie permissões
            </p>
            <Button
              className="w-full"
              onClick={() => router.push("/admin/users")}
            >
              Gerir Utilizadores
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Protocolos Clínicos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Crie e edite diretrizes médicas e algoritmos de análise
            </p>
            <Button
              className="w-full"
              onClick={() => router.push("/admin/protocols")}
            >
              Gerir Protocolos
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Relatórios do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Visualize estatísticas e relatórios de uso do sistema
            </p>
            <Button className="w-full bg-transparent" variant="outline">
              Ver Relatórios
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Auditoria de Acessos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Monitore acessos e atividades dos utilizadores
            </p>
            <Button className="w-full bg-transparent" variant="outline">
              Ver Auditoria
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
