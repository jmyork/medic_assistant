const API_BASE = 'http://localhost:8080/api/';

// Objeto que contém as rotas da API
export const endpoint = {
  // Auth endpoints
  login: `${API_BASE}auth/login`,
  logout: `${API_BASE}auth/logout`,
  register: `${API_BASE}auth/register`,
  requestPasswordReset: `${API_BASE}auth/request-password-reset`,
  resetPassword: `${API_BASE}auth/reset-password`,
  getUserCount: `${API_BASE}auth/get-user-count`,
  getQtdConsultas: `${API_BASE}auth/get-qtd-consultas`,
  getQtdConsultasMes: `${API_BASE}auth/get-qtd-consultas-mes`,
  // Doenças endpoints
  doencas: `${API_BASE}doencas`,
  doencaById: (id: string) => `${API_BASE}doencas/${id}`,
  doencaSintomasQtdProtocolos: `${API_BASE}doenca-sintomas/count/qtd-protocolos`,


  // Médicos endpoints
  medicos: `${API_BASE}medicos`,
  medicoById: (id: string) => `${API_BASE}medicos/${id}`,

  // Sintomas endpoints
  sintomas: `${API_BASE}sintomas`,
  sintomaById: (id: string) => `${API_BASE}sintomas/${id}`,

  // Consultas endpoints
  consultas: `${API_BASE}consultas`,
  consultaById: (id: string) => `${API_BASE}consultas/${id}`,
  consultaApprove: (id: string) => `${API_BASE}consultas/${id}/approve`,
  consultaCancel: (id: string) => `${API_BASE}consultas/${id}/cancel`,
  consultaMarkAsDone: (id: string) => `${API_BASE}consultas/${id}/mark-as-done`,
  consultaDiagnose: (id: string) => `${API_BASE}consultas/${id}/diagnose`,
  consultaValidatedReports: `${API_BASE}consultas/reports`,
  consultaValidatedReportDetails: (id: string) => `${API_BASE}consultas/reports/${id}`,


  // http://localhost:8080/api/consultas/reports/6925f351ba0bcf5dc936888b
  // Consulta-Sintomas endpoints
  consultaSintomas: (consultaId: string) => `${API_BASE}consultas/${consultaId}/sintomas`,
  consultaSintomaDelete: (id: string) => `${API_BASE}consultas/sintomas/${id}`,

  // Pacientes endpoints
  pacientes: `${API_BASE}pacientes`,
  pacienteById: (id: string) => `${API_BASE}pacientes/${id}`,
  pacienteDetails: (patientId?: string) =>
    patientId
      ? `${API_BASE}pacientes/patient/details/${patientId}`
      : `${API_BASE}pacientes/patient/details`,
  pacienteHistory: (patientId: string) => `${API_BASE}pacientes/patient/history/${patientId}`,
};
