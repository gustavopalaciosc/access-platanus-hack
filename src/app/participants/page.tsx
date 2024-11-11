'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Participant } from '../interfaces/Participant';


export default function ParticipantsPage() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null); 

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
            setLoading(false); 
        };

        fetchParticipants();
    }, []);

    const verifiedParticipants = participants.filter((participant) => participant.is_verified);

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Participantes Verificados</h1>

           
            {loading && <p className="text-center text-gray-500">Cargando participantes...</p>}

            {error && <p className="text-center text-red-600">{error}</p>}

            {verifiedParticipants.length === 0 && !loading && !error ? (
                <p className="text-center text-gray-500">Aún no hay participantes verificados.</p>
            ) : (
        <div className="space-y-4 max-w-md mx-auto h-96 bg-[#c2c2c2] overflow-y-auto p-4 rounded-md">
            {verifiedParticipants.map((participant) => (
            <div
                key={participant.id}
                className="p-4 bg-yellow-500 rounded-lg shadow-md transition-all"
            >
            <p className="text-xl font-semibold">{participant.name} {participant.last_name}</p>
            <p className="text-sm text-gray-500">Entrada: {new Date(participant.entry_time).toLocaleString()}</p>
        </div>
    ))}
    </div>
            )}
            <div className='flex justify-center mt-[10px] text-2xl'>    
                <a href="/home">volver</a>
            </div>
        </div>
    );
}
