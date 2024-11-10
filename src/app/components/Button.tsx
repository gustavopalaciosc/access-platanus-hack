'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Optional onClick function
}

export default function Button({ label, onClick }: ButtonProps) {
  

  return (
    <button
      onClick={onClick} // Use onClick prop if provided
      className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-yellow-500 hover:bg-yellow-700"
    >
      {label}
    </button>
  );
}
