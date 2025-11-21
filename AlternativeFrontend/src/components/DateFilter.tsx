import React, { useState } from 'react';

interface DateFilterProps {
  onFilter: (startDate: string, endDate: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="flex gap-2 mb-4 items-center">
      <input type="date" className="p-2 border rounded" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" className="p-2 border rounded" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        onClick={() => onFilter(startDate, endDate)}
      >
        Filtrar
      </button>
    </div>
  );
};

export default DateFilter;
