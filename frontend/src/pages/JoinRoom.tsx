import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { motion } from "framer-motion";

const JoinRoom = () => {
    const navigate = useNavigate();
    const roomCodeRef = useRef<HTMLInputElement>(null);

    const handleJoinRoom = () => {
        if (roomCodeRef.current?.value) {
            const uppercaseRoomCode = roomCodeRef.current.value.toUpperCase();
            navigate(`/joiningroom/${uppercaseRoomCode}`);
        } else {
            toast.error("Please enter a room code", {
                style: {
                    background: "rgba(255, 255, 255, 0.9)",
                    color: "#333"
                }
            });
        }
    };

    return (
        <div className='min-h-screen gradient-bg flex items-center justify-center px-4'>
            <Toaster position="top-center" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='max-w-md w-full glass-morphism rounded-2xl p-8'
            >
                <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold text-white text-center mb-8"
                >
                    Join Room
                </motion.h1>

                <div className="space-y-6">
                    <Input
                        type="text"
                        placeholder="Enter Room Code"
                        ref={roomCodeRef}
                        endIcon={<ArrowRight className="w-6 h-6 text-gray-600" />}
                        uppercase={true}
                        className="bg-white/90 rounded-xl px-6 py-4 text-lg"
                        onClick={handleJoinRoom}
                    />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleJoinRoom}
                        className="w-full bg-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-purple-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        Join Room
                        <ArrowRight size={20} />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default JoinRoom;
