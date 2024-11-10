'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

// Definir el tipo para un participante con los campos correspondientes
interface Participant {
    id: number;
    name: string;
    last_name: string;
    entry_time: string;
    is_verified: boolean;
    validation_code: string;
}

export default function ParticipantsPage() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Para manejar el estado de carga
    const [error, setError] = useState<string | null>(null); // Para manejar errores

    useEffect(() => {
        const fetchParticipants = async () => {
            const { data, error } = await supabase
                .from('Participants')
                .select('*');
            
            if (error) {
                setError('Error fetching participants.');
                console.error('Error fetching participants:', error);
            } else {
                setParticipants(data as Participant[]);
            }
            setLoading(false); // Una vez cargados los datos, cambiamos el estado de loading
        };

        fetchParticipants();
    }, []);

    // Filtrar los participantes verificados
    const verifiedParticipants = participants.filter((participant) => participant.is_verified);

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Lista de Participantes Verificados</h1>

            {/* Si estamos cargando, mostrar un loader */}
            {loading && <p className="text-center text-gray-500">Cargando participantes...</p>}

            {/* Si hay un error, mostrar un mensaje de error */}
            {error && <p className="text-center text-red-600">{error}</p>}

            {/* Si no hay participantes verificados, mostrar un mensaje */}
            {verifiedParticipants.length === 0 && !loading && !error ? (
                <p className="text-center text-gray-500">Aún no hay participantes verificados.</p>
            ) : (
                <div className="space-y-4">
                    {verifiedParticipants.map((participant) => (
                        <div
                            key={participant.id}
                            className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-all"
                        >
                            <p className="text-xl font-semibold">{participant.name} {participant.last_name}</p>
                            <p className="text-sm text-gray-500">Entrada: {new Date(participant.entry_time).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
