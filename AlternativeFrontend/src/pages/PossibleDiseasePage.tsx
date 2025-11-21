import React, { useState } from 'react';
import PatientInfo from '../components/PatientInfo';
import DiseaseCard from '../components/DiseaseCard';
import SelectedDiseaseCard from '../components/SelectedDiseaseCard';
import DateFilter from '../components/DateFilter';
import { useNavigate } from 'react-router-dom';

interface Disease {
  name: string;
  percentage: number;
  recommendedExams: string[];
}

const PossibleDiseasePage: React.FC = () => {
  const navigate = useNavigate();

  const patient = {
    name: "João Silva",
    age: 35,
    height: 175,
    gender: "Masculino",
    phone: "912345678",
    email: "joao@email.com",
    address: "Rua Exemplo, 123",
    inherents: "Hipertensão"
  };

  const [possibleDiseases, setPossibleDiseases] = useState<Disease[]>([
    { name: "Gripe", percentage: 70, recommendedExams: ["Hemograma", "PCR"] },
    { name: "Resfriado", percentage: 50, recommendedExams: ["Exame físico"] },
    { name: "COVID-19", percentage: 30, recommendedExams: ["PCR", "Antígeno"] },
  ]);

  const [history, setHistory] = useState([
    { name: "Gripe", percentage: 70, doctor: "Dr. Pedro", examDate: "2025-11-01" }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  const handleSelectDisease = (disease: Disease) => {
    setSelectedDisease(disease);
    setModalOpen(true);
  };

  const confirmSelectDisease = () => {
    if (selectedDisease) {
      setHistory(prev => [
        ...prev,
        {
          ...selectedDisease,
          doctor: "Dr. Ana",
          examDate: new Date().toISOString().split('T')[0]
        }
      ]);
      setModalOpen(false);
      setSelectedDisease(null);
    }
  };

  const cancelSelect = () => {
    setModalOpen(false);
    setSelectedDisease(null);
  };

  const handleFilter = (start: string, end: string) => {
    console.log("Filtrando por datas:", start, end);
  };

  return (
    <div className="flex min-h-screen gap-4 p-4">
      {/* Seção esquerda */}
      <div className="w-2/3 flex flex-col gap-4">
        <PatientInfo {...patient} />

        <h2 className="text-xl font-bold">Possíveis doenças</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {possibleDiseases.map(d => (
            <DiseaseCard
              key={d.name}
              name={d.name}
              percentage={d.percentage}
              recommendedExams={d.recommendedExams}
              onSelect={() => handleSelectDisease(d)}
            />
          ))}
        </div>
      </div>

      {/* Seção direita */}
      <div className="w-1/3 flex flex-col">
        <div className="flex justify-between mb-2">
          <button
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            onClick={() => navigate('/symptoms')}
          >
            Voltar ao exame
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            onClick={() => navigate('/')}
          >
            Sair
          </button>
        </div>

        <h2 className="text-xl font-bold mb-2">Exames</h2>
        <DateFilter onFilter={handleFilter} />
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {history.map((h, idx) => (
            <SelectedDiseaseCard
              key={idx}
              name={h.name}
              percentage={h.percentage}
              doctor={h.doctor}
              examDate={h.examDate}
            />
          ))}
        </div>
      </div>

      {/* Modal de confirmação */}
      {modalOpen && selectedDisease && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-96 flex flex-col gap-4 shadow-lg">
            <h3 className="text-lg font-bold">Confirmar seleção</h3>
            <p>Deseja adicionar <strong>{selectedDisease.name}</strong> com probabilidade de {selectedDisease.percentage}%?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelSelect}
                className="bg-gray-300 p-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmSelectDisease}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PossibleDiseasePage;
