import { ConsultationDetails } from "@/components/consultation-details"

export default function ConsultationPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <ConsultationDetails consultationId={params.id} />
    </div>
  )
}
