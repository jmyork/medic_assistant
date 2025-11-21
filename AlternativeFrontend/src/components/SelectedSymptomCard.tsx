import React from 'react';
import { FaTimes } from 'react-icons/fa';


interface SelectedSymptomCardProps {
  name: string;
  onRemove: () => void;
}

const SelectedSymptomCard: React.FC<SelectedSymptomCardProps> = ({ name, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-2 border mb-2 rounded-lg border-gray-400">
      <span>{name}</span>
      <button className="text-red-500 font-bold cursor-pointer" onClick={onRemove}>

        <FaTimes />

      </button>
    </div>
  );
};

export default SelectedSymptomCard;
