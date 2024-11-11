"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect, useRef } from "react";
import { supabase } from '../../lib/supabaseClient';
import Navbar from "../components/Navbar";

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
    const [message, setMessage] = useState<string | null>(null); 
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
                async (result) => {
                    console.log("QR Code detected:", result);
                    setScanResult(result || "No data"); 
                    newScanner.clear(); 

                    console.log(participants);

                    const matchedParticipant = participants.find(
                        (participant) => participant.validation_code == result
                    );

                    if (matchedParticipant) {
                        setMessage(`Participante ${matchedParticipant.name} ${matchedParticipant.last_name} verificado!`);
                        updateIsVerified(matchedParticipant.id);
                    
                    } else {
                        setMessage("Invalid QR code. Please try again.");
                    }
                },
                (error) => {
                    
                }
            );

            setScanner(newScanner); 
        }
    };

    const fetchParticipants = async () => {
        const { data, error } = await supabase
            .from('Participants')
            .select('*');
        if (error) {
            console.error('Error fetching participants:', error);
        } else {
            setParticipants(data as Participant[]);
        }
    };

    const updateIsVerified = async (id: number) => {
        const { data, error } = await supabase
            .from('Participants')
            .update({ is_verified: true })  // Cambia is_verified a true
            .eq('id', id);  // Filtra por el id del participante
    
        if (error) {
            console.error('Error updating is_verified:', error);
        } else {
            console.log('Participant verified:', data);
        }
    };

    useEffect(() => {
        fetchParticipants();
    }, []);

    useEffect(() => {
        if (participants.length > 0) {
            startScanner();
        }
    }, [participants]);


    const restartScanner = () => {
        window.location.reload();
    };

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
        <>
        <Navbar />
        <div className="flex flex-col justify-center items-center mt-6">
            <div className="w-[300px] h-[400px] m-[10px] p-4 bg-[#a8a8a8] rounded-lg shadow-lg">
                <h1 className="text-center text-xl font-semibold mb-4 text-[#4b4b4b]">QR Participante</h1>

                {!scanResult && (
                    <div
                        id="qr-reader"
                        ref={scannerRef}
                        className="w-full h-[270px] bg-black rounded-md"
                    ></div>
                )}

                {renderScanResult()}

                {message && (
                    <div className="mt-4 p-4 text-center">
                        <p className={`text-lg font-semibold ${message.includes('Invalid') ? 'text-red-600' : 'text-[#FFFF]'}`}>
                            {message}
                        </p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}
