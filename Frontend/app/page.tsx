import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Brain, CheckCircle2, FileText, Heart, Shield, Stethoscope, TrendingUp, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-brfrom-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
              <Stethoscope className="h-7 w-7 text-primary" />
            </div>
            <span className="font-serif text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Medical Assistant
            </span>
          </Link>
          <Button asChild size="lg" className="h-11 px-6 font-medium">
            <Link href="/login">Entrar no Sistema</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 bg-linear-to-b from-background via-primary/5 to-background py-12 md:py-20">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container relative mx-auto px-6 ">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 text-sm backdrop-blur">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">Sistema de Apoio Clínico</span>
            </div>

            <h1 className="font-serif text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
              Assistência Médica com{" "}
              <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Recomendações Sob Medida
              </span>
            </h1>

            <p className="mt-8 text-xl text-muted-foreground text-balance leading-relaxed max-w-3xl mx-auto">
              Análise inteligente de sintomas, histórico médico e factores de risco para recomendações.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/login">Começar Agora</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-semibold border-2 bg-transparent"
              >
                <Link href="#recursos">Explorar Recursos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="recursos" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Recursos Inteligentes</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Tecnologia avançada para cuidados de saúde personalizados
            </p>
          </div>

          <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500/20 to-blue-600/10">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="font-serif text-xl">Análise de Sintomas</CardTitle>
                <CardDescription className="leading-relaxed">
                  Cruzamento inteligente entre sintomas reportados e condições médicas conhecidas
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-accent/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-green-500/20 to-green-600/10">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="font-serif text-xl">Histórico Completo</CardTitle>
                <CardDescription className="leading-relaxed">
                  Integração com histórico médico familiar e pessoal para análise contextualizada
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-brrom-primary/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-500/20 to-purple-600/10">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="font-serif text-xl">IA Avançada</CardTitle>
                <CardDescription className="leading-relaxed">
                  Algoritmos de machine learning para identificação de padrões e correlações médicas
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-accent/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-500/20 to-orange-600/10">
                  <Heart className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="font-serif text-xl">Recomendações Personalizadas</CardTitle>
                <CardDescription className="leading-relaxed">
                  Planos de exercícios, orientação nutricional e recomendações de estilo de vida
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-red-500/20 to-red-600/10">
                  <CheckCircle2 className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="font-serif text-xl">Sistema de Triagem</CardTitle>
                <CardDescription className="leading-relaxed">
                  Identificação de predisposições e fatores de risco para prevenção proativa
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-accent/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-brrom-teal-500/20 to-teal-600/10">
                  <TrendingUp className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle className="font-serif text-xl">Acompanhamento Contínuo</CardTitle>
                <CardDescription className="leading-relaxed">
                  Monitoramento da evolução do estado de saúde e ajuste de tratamentos
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works*/}
      <section className="border-y bg-muted/30 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Como Funciona</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Processo simples em 3 etapas</p>
          </div>

          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent text-primary-foreground font-bold text-2xl font-serif shadow-lg">
                1
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Descreva</h3>
              <p className="text-muted-foreground leading-relaxed">
                Registre seus sintomas de forma detalhada através de formulário intuitivo
              </p>
            </div>

            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-accent to-primary text-accent-foreground font-bold text-2xl font-serif shadow-lg">
                2
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Analise</h3>
              <p className="text-muted-foreground leading-relaxed">
                IA processa informações com base em dados médicos e seu histórico
              </p>
            </div>

            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent text-primary-foreground font-bold text-2xl font-serif shadow-lg">
                3
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Receba</h3>
              <p className="text-muted-foreground leading-relaxed">
                Obtenha recomendações personalizadas validadas por profissionais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Para Todos os Perfis</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Interface adaptada para cada necessidade
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/20 to-blue-600/10 group-hover:from-blue-500/30 group-hover:to-blue-600/20 transition-all">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="font-serif text-2xl">Paciente</CardTitle>
                <CardDescription>Cuide da sua saúde</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Registrar sintomas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Visualizar diagnósticos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Acessar histórico médico</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Receber recomendações</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-green-500/20 to-green-600/10 group-hover:from-green-500/30 group-hover:to-green-600/20 transition-all">
                  <Stethoscope className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="font-serif text-2xl">Médico</CardTitle>
                <CardDescription>Ferramentas profissionais</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Revisar diagnósticos IA</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Gerenciar consultas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Gerar relatórios</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Acompanhar pacientes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500/20 to-purple-600/10 group-hover:from-purple-500/30 group-hover:to-purple-600/20 transition-all">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="font-serif text-2xl">Administrador</CardTitle>
                <CardDescription>Controle total</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Gerenciar usuários</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Configurar protocolos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Monitorar sistema</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Análise de dados</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/login">Acessar Agora</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-start gap-6 text-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <span className="font-serif text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Medical Assistant
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Sistema de diagnóstico assistido por inteligência artificial. Esta ferramenta é um apoio à decisão médica
              e não substitui consulta profissional.
            </p>
            <div className="flex flex-col text-center w-full">
              <p className="text-xs text-center text-muted-foreground">© 2025 Medical Assistant. Todos os direitos reservados.</p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  )
}
