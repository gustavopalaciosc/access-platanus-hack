'use client';
import Button from "./components/Button";
import { useRouter } from 'next/navigation';

function Home() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/login'); 
  };



  return (
    <div className="flex justify-center flex-col items-center mt-[300px]">
      <h1 className="text-3xl xl:text-6xl mb-[25px]">Access platanus Hack</h1>
        <Button onClick={handleClick} label="Acceso validador"/>
    </div>
 
  );
}


export default Home;