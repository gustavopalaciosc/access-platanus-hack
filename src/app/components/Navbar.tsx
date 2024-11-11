'use client';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="p-4 text-white mt-2">
            <div className="container mx-auto flex justify-center items-center">
                
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/home" className="text-2xl">
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

