import React from 'react';
import Logo from './Logo';

const Sidebar: React.FC = () => {
  const sayings = [
    "Cuida da tua saúde!",
    "Cada sintoma conta.",
    "Consulta sempre um especialista."
  ];

  return (
    <div className="w-1/4 bg-gray-100 p-4 flex flex-col items-center">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-500">
          <Logo />
        </h1>
      </div>
      <div className="flex flex-col gap-3">
        {sayings.map((text, index) => (
          <p key={index} className="text-gray-700 text-center">{text}</p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
