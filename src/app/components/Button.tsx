'use client';

import { useRouter } from 'next/navigation';

interface ButtonProps {
  label: string;
}

export default function Button({ label }: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login'); // Redirige a la página de login
  };

  return (
    <button
      onClick={handleClick}
      className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-yellow-500 hover:bg-yellow-700"
    >
      {label}
    </button>
  );
}
