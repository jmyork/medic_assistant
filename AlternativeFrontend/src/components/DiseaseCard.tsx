import React from 'react';

interface DiseaseCardProps {
  name: string;
  percentage: number;
  recommendedExams: string[];
  onSelect: () => void;
}

const DiseaseCard: React.FC<DiseaseCardProps> = ({ name, percentage, recommendedExams, onSelect }) => (
  <div className="bg-white p-4 rounded shadow w-64 flex flex-col gap-2">
    <h3 className="font-bold">{name}</h3>
    <p>Probabilidade: {percentage}%</p>
    <p>Exames recomendados: {recommendedExams.join(', ')}</p>
    <button
      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-auto"
      onClick={onSelect}
    >
      Selecionar
    </button>
  </div>
);

export default DiseaseCard;
