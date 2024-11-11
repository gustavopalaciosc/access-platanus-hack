'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Participant } from '../interfaces/Participant';
import Navbar from '../components/Navbar';


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

    const noVerifiedParticipants = participants.filter((participant) => !participant.is_verified);

    return (
        <>
        <Navbar />
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Participantes No Validados</h1>

           
            {loading && <p className="text-center text-gray-500">Cargando participantes...</p>}

            {error && <p className="text-center text-red-600">{error}</p>}

            {noVerifiedParticipants.length === 0 && !loading && !error ? (
                <p className="text-center text-gray-500">No quedan participantes por validar.</p>
            ) : (
        <div className="space-y-4 max-w-md mx-auto h-96 bg-[#c2c2c2] overflow-y-auto p-4 rounded-md">
            {noVerifiedParticipants.map((participant) => (
            <div
                key={participant.id}
                className="p-4 bg-yellow-500 rounded-lg shadow-md transition-all"
            >
            <p className="text-xl font-semibold">{participant.name} {participant.last_name}</p>
        </div>
        ))}
        </div>
            )}
           
        </div>
        </>
    );
}
