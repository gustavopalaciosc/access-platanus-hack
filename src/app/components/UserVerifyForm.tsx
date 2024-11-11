'use client';
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Participant } from "../interfaces/Participant";
import Button from "./Button";
import Link from "next/link";

export default function UserVerifyForm() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
    const [name, setName] = useState('');
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const fetchAllParticipants = async () => {
        const { data, error } = await supabase
            .from('Participants')
            .select('*')
            .eq('is_verified', false);
            
        if (error) {
            console.log(error);
        } else {
            setParticipants(data || []);
        }
    };

    const handleSearch = (search: string) => {
        const searchResults = participants.filter(participant => 
            (participant.name.toLowerCase().includes(search.toLowerCase()) ||
            participant.last_name.toLowerCase().includes(search.toLowerCase()) || 
            `${participant.name} ${participant.last_name}`.toLowerCase().includes(search.toLowerCase())) &&
            !participant.is_verified
        );
        setFilteredParticipants(searchResults);
    };

    const selectParticipant = (participant: Participant) => {
        setSelectedParticipant(participant);
        setStatusMessage(null); // Reset status message when selecting a new participant
    };

    const validateUser = async (id: any) => {
        setIsLoading(true);
        setStatusMessage("Validando...");
        try {
            const { data, error } = await supabase
                .from('Participants')
                .update({ is_verified: true })
                .eq('id', id);
    
            if (error) {
                console.error('Error updating is_verified:', error);
                setStatusMessage("Error al validar");
            } else {
                console.log('Participant verified:', data);
                setStatusMessage("Validado con éxito");
                // Optionally, update the participants list after successful validation
                fetchAllParticipants();
            }
        } catch (error) {
            console.log(error);
            setStatusMessage("Error al validar");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllParticipants();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center mt-[50px]">
            <h1 className="text-xl font-semibold text-center mb-6">Validación Manual de Participantes</h1>
            <div className="h-[350px] max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <form className="flex flex-col space-y-4">
                    <label htmlFor="name" className="text-gray-700 font-semibold">Ingrese Nombre o Apellido</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            handleSearch(e.target.value);
                        }}
                        placeholder="Buscar"
                        className="px-4 py-2 border text-[#000] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </form>

                {filteredParticipants.length > 0 && (
                    <ul className="mt-4 border border-gray-200 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                        {filteredParticipants.map((participant) => (
                            <li 
                                key={participant.id} 
                                onClick={() => selectParticipant(participant)}
                                className="p-2 hover:bg-blue-100 cursor-pointer"
                            >
                                <span className="font-medium text-gray-700">{participant.name}</span> 
                                <span className="text-gray-600"> {participant.last_name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {selectedParticipant && (
                <div className="flex flex-col items-center">
                    <div className="max-w-[300px] h-[180px] mx-auto mt-8 mb-2 p-6 bg-white rounded-lg overflow-auto">
                        <h3 className="text-lg font-semibold text-[#000]">Detalles del Participante</h3>
                        <p className="text-[#000]"><strong>Nombre:</strong> {selectedParticipant.name}</p>
                        <p className="text-[#000]"><strong>Apellido:</strong> {selectedParticipant.last_name}</p>
                        <p className="text-[#000] mt-4"><strong>{statusMessage}</strong></p>
                    </div>
                    <Button 
                        onClick={() => validateUser(selectedParticipant.id)} 
                        label={isLoading ? "Validando..." : "Validar"} 
                    />
                </div>
            )}
        </div>
    );
}



