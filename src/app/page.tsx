'use client';
import Image from "next/image";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

function Home() {
  const [validators, setValidators] = useState<any[]>([]); // Estado para almacenar los datos
  const [loading, setLoading] = useState<boolean>(true); // Estado para mostrar el loading
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/login'); // Redirige a la página de login
  };



  return (
    <div className="flex justify-center flex-col items-center mt-[300px]">
      <h1 className="text-4xl xl:text-6xl mb-[25px]">Access platanus Hack</h1>
        <Button onClick={handleClick} label="Acceso validador"/>
        <a href="/scan">Scanner</a>
    </div>
 
  );
}


export default Home;