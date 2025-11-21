import React, { useState, useEffect, useCallback, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import SymptomSearch from "../components/SymptomSearch";
import SelectedSymptoms from "../components/SelectedSymptoms";
import { api } from "../services";

const SymptomsPage: React.FC = () => {
  const [allSymptoms, setAllSymptoms] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [__loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        setLoading(true);
        const data = await api.get("/api/sintomas");
        if (Array.isArray(data)) {
          const symptoms = data.map(
            (symptom: any) => symptom.nome || symptom.name || symptom
          );
          setAllSymptoms(symptoms);
        }
      } catch (error) {
        console.error("Erro ao buscar sintomas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSymptoms();
  }, []);

  // Memoizar symptom set para O(1) lookups
  const symptomSet = useMemo(() => new Set(allSymptoms), [allSymptoms]);

  const handleToggleSymptom = useCallback(
    (name: string) => {
      if (!symptomSet.has(name)) return;
      setSelectedSymptoms((prev) =>
        prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
      );
    },
    [symptomSet]
  );

  const handleRemoveSymptom = useCallback((name: string) => {
    setSelectedSymptoms((prev) => prev.filter((s) => s !== name));
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <SymptomSearch
        symptoms={allSymptoms}
        selectedSymptoms={selectedSymptoms}
        onToggleSymptom={handleToggleSymptom}
      />
      <SelectedSymptoms
        selectedSymptoms={selectedSymptoms}
        onRemoveSymptom={handleRemoveSymptom}
      />
    </div>
  );
};

export default SymptomsPage;
