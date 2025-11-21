import React, { useState, useMemo, useCallback, useEffect } from "react";
import SymptomCard from "./SymptomCard";

interface SymptomSearchProps {
  symptoms: string[];
  selectedSymptoms: string[];
  onToggleSymptom: (name: string) => void;
}

const SymptomSearch: React.FC<SymptomSearchProps> = ({
  symptoms,
  selectedSymptoms,
  onToggleSymptom,
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce a busca por 300ms para evitar re-renders excessivos
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Memoizar sintomas filtrados com índice de busca otimizado
  const filteredSymptoms = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return symptoms;
    }
    const query = debouncedSearch.toLowerCase();
    return symptoms.filter((s) => s.toLowerCase().includes(query));
  }, [symptoms, debouncedSearch]);

  // Memoizar set de selecionados para lookup O(1)
  const selectedSet = useMemo(
    () => new Set(selectedSymptoms),
    [selectedSymptoms]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleToggle = useCallback(
    (name: string) => {
      onToggleSymptom(name);
    },
    [onToggleSymptom]
  );

  return (
    <div className="w-1/2 p-4 px-12">
      <input
        type="text"
        placeholder="Pesquisar sintomas..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={handleChange}
      />
      <div className="flex flex-col">
        {filteredSymptoms.map((symptom) => (
          <SymptomCard
            key={symptom}
            name={symptom}
            checked={selectedSet.has(symptom)}
            onChange={() => handleToggle(symptom)}
          />
        ))}
      </div>
    </div>
  );
};

export default SymptomSearch;
