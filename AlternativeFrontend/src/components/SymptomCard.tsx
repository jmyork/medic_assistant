import React, { memo } from "react";

interface SymptomCardProps {
  name: string;
  checked: boolean;
  onChange: () => void;
}

const SymptomCard: React.FC<SymptomCardProps> = memo(
  ({ name, checked, onChange }) => {
    return (
      <div className="flex items-center justify-between p-2 border mb-2 rounded-lg border-gray-400">
        <span>{name}</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="cursor-pointer w-[15px] h-[15px]"
        />
      </div>
    );
  },
  (prev, next) => {
    // Retorna true se as props são iguais (não re-renderiza)
    return (
      prev.name === next.name &&
      prev.checked === next.checked &&
      prev.onChange === next.onChange
    );
  }
);

SymptomCard.displayName = "SymptomCard";

export default SymptomCard;
