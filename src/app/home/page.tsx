'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();

    const handleLogout = () => {
        // Eliminar la cookie supabase-auth-token
        document.cookie = "supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        router.push('/login');  
        window.location.reload();
    };


    return (
    <div className="flex justify-center flex-col items-center mt-[100px]">
        <h1 className='text-3xl font-semibold text-center mb-6'>Platanus Hack Access System</h1>
        
        <div className="flex flex-col ">
            <a 
                href="/scan" 
                className="m-[10px] text-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-700 px-6 py-3 rounded-lg w-full text-center transition-colors duration-300 ease-in-out"
            >
                QR Scanner
            </a>
            <a 
                href="/manual-verify" 
                className="m-[10px] text-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-700 px-6 py-3 rounded-lg w-full text-center transition-colors duration-300 ease-in-out"
            >
                Validación Manual
            </a>
            <a 
                href="/participants" 
                className="m-[10px] text-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-700 px-6 py-3 rounded-lg w-full text-center transition-colors duration-300 ease-in-out"
            >
                Participantes no Validados
            </a>

            <div className='flex justify-center text-[25px] mt-[10px] hover:text-[#b9b9b9]'>
                <a href="#"
                 onClick={(e) => { 
                    e.preventDefault();  // Evitar la navegación por defecto
                    handleLogout(); 
                }}>
                    Salir
                </a>
            </div>

        
        </div>
    </div>

    );

}