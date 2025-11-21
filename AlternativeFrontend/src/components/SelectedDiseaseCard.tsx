import React from 'react';

interface SelectedDiseaseCardProps {
  name: string;
  percentage: number;
  doctor: string;
  examDate: string;
}

const SelectedDiseaseCard: React.FC<SelectedDiseaseCardProps> = ({ name, percentage, doctor, examDate }) => (
  <div className="bg-white p-4 rounded shadow w-64 flex flex-col gap-1">
    <h3 className="font-bold">{name}</h3>
    <p>Probabilidade: {percentage}%</p>
    <p>Médico: {doctor}</p>
    <p>Data do exame: {examDate}</p>
  </div>
);

export default SelectedDiseaseCard;
