import React from 'react';

interface PatientInfoProps {
    name: string;
    age: number;
    height: number;
    gender: string;
    phone: string;
    email: string;
    address: string;
    inherents?: string;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ name, age, height, gender, phone, email, address, inherents }) => (
    <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-bold mb-2">Informações do paciente</h2>
        <div className='flex gap-16'>

            <ul className="text-gray-700">
                <li>Nome: {name}</li>
                <li>Idade: {age}</li>
                <li>Altura: {height} cm</li>
                <li>Gênero: {gender}</li>
            </ul>
            <ul>
                <li>Telefone: {phone}</li>
                <li>Email: {email}</li>
                <li>Morada: {address}</li>
                {inherents && <li>Inerentes: {inherents}</li>}
            </ul>
        </div>

    </div>
);

export default PatientInfo;
