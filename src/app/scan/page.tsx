// app/scan/page.tsx
"use client"; 
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";

export default function ScanPage() {
    const scannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scannerRef.current) {
            const scanner = new Html5QrcodeScanner("qr-reader", {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 2,
                aspectRatio: 1.0,
            }, false);

            scanner.render((result) => {
                console.log("QR Code detected:", result);
            }, (error) => {
                
            });
        }

        return () => {
            // Cleanup scanner when component unmounts
            const scannerInstance = new Html5QrcodeScanner("qr-reader", {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 10, // same configuration as before
            }, false);
            scannerInstance.clear();
        };
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-[400px] p-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-center text-xl font-semibold mb-4">Scan QR Code</h1>
                <div
                    id="qr-reader"
                    ref={scannerRef}
                    className="w-full h-[300px] bg-black rounded-lg"
                ></div>
                <p className="text-center mt-4 text-sm text-gray-500">
                    Scan a QR code to see the result.
                </p>
            </div>
        </div>
    );
}
