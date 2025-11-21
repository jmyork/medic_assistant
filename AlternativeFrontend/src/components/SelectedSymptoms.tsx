import React, { useState } from 'react';
import SelectedSymptomCard from './SelectedSymptomCard';
import { useNavigate } from 'react-router-dom';

interface SelectedSymptomsProps {
  selectedSymptoms: string[];
  onRemoveSymptom: (name: string) => void;
}

const SelectedSymptoms: React.FC<SelectedSymptomsProps> = ({ selectedSymptoms, onRemoveSymptom }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = selectedSymptoms.filter(s =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const handleProcess = () => {
    navigate('/possible-disease');
  };

  return (
    <div className="w-1/3 px-12 p-4  bg-gray-50 flex flex-col h-full">
      <input
        type="text"
        placeholder="Filtrar selecionados..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {filtered.map(symptom => (
          <SelectedSymptomCard key={symptom} name={symptom} onRemove={() => onRemoveSymptom(symptom)} />
        ))}
      </div>

      {
        selectedSymptoms.length > 0 

        &&
        <button
          onClick={handleProcess}
          className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
        >
          Processar
        </button>

      }
    </div>
  );
};

export default SelectedSymptoms;
