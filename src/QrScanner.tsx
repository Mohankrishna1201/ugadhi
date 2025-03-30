import React, { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {
    const [scannedData, setScannedData] = useState("");
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (isScanning) {
            const scanner = new Html5Qrcode("qr-scanner");
            scanner.start(
                { facingMode: "environment" }, // Use back camera
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (decodedText) => {
                    setScannedData(decodedText);
                    scanner.stop();
                    setIsScanning(false);
                },
                (errorMessage) => console.error(`Error scanning: ${errorMessage}`)
            );
        }
    }, [isScanning]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            {/* Scanner Container */}
            <div className="relative w-80 h-80 border-4 border-green-500 rounded-lg overflow-hidden">
                {/* QR Scanner Area */}
                <div id="qr-scanner" className="absolute inset-0 bg-gray-800"></div>

                {/* Horizontal Scan Line Animation */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500 animate-scan"></div>
            </div>

            {/* Scanned Data Display */}
            {scannedData ? (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <p className="text-lg font-semibold">Scanned Data:</p>
                    <p className="text-sm">{scannedData}</p>
                </div>
            ) : (
                <p className="mt-4 text-gray-400">Point your camera at a QR code</p>
            )}

            {/* Start Scanning Button */}
            {!isScanning && (
                <button
                    onClick={() => setIsScanning(true)}
                    className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Start Scanning
                </button>
            )}
        </div>
    );
};

export default QRScanner;
