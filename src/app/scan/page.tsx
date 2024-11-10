"use client";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useState, useEffect, useRef } from "react";
import { supabase } from '../../lib/supabaseClient';

interface Participant {
    id: number;
    name: string;
    last_name: string;
    entry_time: string;
    is_verified: boolean;
    validation_code: string;
}

export default function ScanPage() {
    const scannerRef = useRef<HTMLDivElement>(null);
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [message, setMessage] = useState<string | null>(null); // Nuevo estado para el mensaje
    const qrconfig = {qrbox: {
        width: 250,
        height: 250,
    },
    fps: 2,
    aspectRatio: 1.0};

    // Inicialización del escáner
    const startScanner = async () => {
        if (scannerRef.current) {
            const newScanner = new Html5QrcodeScanner("qr-reader", qrconfig, false);

            newScanner.render(
                (result) => {
                    console.log("QR Code detected:", result);
                    setScanResult(result || "No data"); // Guardar el resultado
                    newScanner.clear(); // Detener el escáner

                    console.log(participants);

                    // Comprobar si el resultado coincide con algún validation_code
                    const matchedParticipant = participants.find(
                        (participant) => participant.validation_code == result
                    );

                    if (matchedParticipant) {
                        setMessage(`Welcome, ${matchedParticipant.name} ${matchedParticipant.last_name}!`);
                        // Aca se tiene que hacer la logica


                    } else {
                        setMessage("Invalid QR code. Please try again.");
                    }
                },
                (error) => {
                    // Manejo de errores
                
                }
            );

            setScanner(newScanner); // Guardar la instancia del escáner
        }
    };

    const fetchParticipants = async () => {
        
        const { data, error } = await supabase
            .from('Participants')
            .select('*');
        
        if (error) {
            console.error('Error fetching participants:', error);
        } else {
            console.log(data);
            
            setParticipants(data as Participant[]);
            

        }
    };

    useEffect(() => {
        fetchParticipants();
    }, []);

    // Iniciar el escáner solo si los participantes están cargados
    useEffect(() => {
        if (participants.length > 0) {
            startScanner();
        }
    }, [participants]);


    // Función para reiniciar el escáner
    const restartScanner = () => {
        window.location.reload();
    };

    // Componente para mostrar el resultado del escaneo
    const renderScanResult = () => {
        return scanResult ? (
            <div className="mt-4 p-4 bg-[#cccc] rounded-lg">
                <h2 className="text-xl font-semibold">Scan Result:</h2>
                <p className="text-gray-700">{scanResult}</p>
                <div className="mt-4 text-center">
                    <button
                        onClick={restartScanner}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Scan Again
                    </button>
                </div>
            </div>
        ) : null;
    };




    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[400px] h-[500px] p-4 bg-[#6d6d6d] rounded-lg shadow-lg">
                <h1 className="text-center text-xl font-semibold mb-4">Scan QR Code</h1>

                {/* Mostrar el lector de QR solo si no hay un resultado */}
                {!scanResult && (
                    <div
                        id="qr-reader"
                        ref={scannerRef}
                        className="w-full h-[370px] bg-black rounded-md"
                    ></div>
                )}

                {/* Mostrar el resultado si existe */}
                {renderScanResult()}

                {/* Mostrar mensaje de éxito o error */}
                {message && (
                    <div className="mt-4 p-4 text-center">
                        <p className={`text-lg font-semibold ${message.includes('Invalid') ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
