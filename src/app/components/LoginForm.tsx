'use client';
import Button from "./Button";
import { useState } from "react";
import { supabase } from '../../lib/supabaseClient';

// Función para establecer una cookie
const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiración en días
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; Secure; SameSite=Strict`;
};

export default function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const HandleLogin = async (event: any) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                console.error("Error fetching data:", error.message);
                setErrorMessage(error.message);
            } else if (data?.session) {
                const accessToken = data.session.access_token;
                console.log(accessToken);

                // Almacenar el JWT en una cookie con una expiración de 7 días
                setCookie('supabase-auth-token', accessToken, 7);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg m-5">
                <form className="flex flex-col" action="">
                    <label htmlFor="email" className="mb-2 text-gray-300">Email</label>
                    <input 
                        className="m-[5px] w-full h-[40px] rounded-md text-white bg-gray-700 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500" 
                        type="text" 
                        id="email" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password" className="mb-2 text-gray-300">Contraseña</label>
                    <input 
                        className="m-[5px] w-full h-[40px] rounded-md text-white bg-gray-700 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500" 
                        type="password" 
                        id="password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="text-red-500 text-center capitalize mt-2">
                        {errorMessage}
                    </div>
                    <div className="mt-6 flex justify-center">
                        <Button onClick={HandleLogin} label="Iniciar sesión" />
                    </div>
                </form>
            </div>
            <a href="/">Volver</a>
        </div>
    );
}

