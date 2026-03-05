import { useState, useEffect, useRef } from "react";
import { Camera, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function Photobooth() {
    const [isOpen, setIsOpen] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        let keys = "";
        const secretMap = ["cheese", "photo"];

        const handleKeyDown = (e: KeyboardEvent) => {
            keys += e.key.toLowerCase();
            if (keys.length > 10) keys = keys.slice(-10);

            if (secretMap.some(secret => keys.endsWith(secret))) {
                setIsOpen(true);
                keys = "";
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && !photo) {
            startCamera();
        } else {
            stopCamera();
        }
        return () => stopCamera();
    }, [isOpen, photo]);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            toast({
                title: "Camera access denied",
                description: "Please allow camera access to use the photobooth!",
                variant: "destructive"
            });
            setIsOpen(false);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                // Draw video frame
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Add branding
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.fillStyle = "#eff6ff"; // blue-50
                ctx.font = "bold 32px monospace";
                ctx.fillText("TEAM FATEH", 30, 50);

                ctx.fillStyle = "#fef08a"; // yellow-200
                ctx.font = "24px monospace";
                ctx.fillText("Formula Student EV", 30, 80);

                ctx.strokeStyle = "#000";
                ctx.lineWidth = 4;
                ctx.strokeText("TEAM FATEH", 30, 50);
                ctx.strokeText("Formula Student EV", 30, 80);

                const dataUrl = canvas.toDataURL("image/png");
                setPhoto(dataUrl);
            }
        }
    };

    const downloadPhoto = () => {
        if (photo) {
            const link = document.createElement("a");
            link.href = photo;
            link.download = "team-fateh-photobooth.png";
            link.click();
            setIsOpen(false);
            setPhoto(null);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-white p-4 border-4 border-black notebook-border max-w-2xl w-full relative"
                    >
                        <div className="tape"></div>
                        <button
                            onClick={() => { setIsOpen(false); setPhoto(null); }}
                            className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 border-2 border-black rounded-full transition-colors text-white hover:scale-110 active:scale-95"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="font-pixel text-2xl uppercase mb-4 text-center">Secret Photobooth</h2>

                        <div className="relative bg-black rounded overflow-hidden aspect-video flex items-center justify-center mb-6">
                            {!photo ? (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                            ) : (
                                <img src={photo} alt="Photobooth capture" className="w-full h-full object-cover" />
                            )}
                            <canvas ref={canvasRef} className="hidden" />
                        </div>

                        <div className="flex justify-center gap-4">
                            {!photo ? (
                                <Button
                                    onClick={takePhoto}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black font-pixel text-xl py-6 px-8 flex items-center gap-3 w-full sm:w-auto shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                                >
                                    <Camera className="w-6 h-6" />
                                    SNAP!
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => setPhoto(null)}
                                        className="bg-gray-200 hover:bg-gray-300 text-black border-2 border-black font-pixel text-lg py-6 px-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                                    >
                                        Retake
                                    </Button>
                                    <Button
                                        onClick={downloadPhoto}
                                        className="bg-blue-500 hover:bg-blue-600 text-white border-2 border-black font-pixel text-lg py-6 px-8 flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                                    >
                                        <Download className="w-6 h-6" />
                                        Save
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
