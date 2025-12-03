import { ConsultationDetails } from "@/components/consultation-details"

export default async function ConsultationPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <ConsultationDetails consultationId={id} />
    </div>
  )
}
