import { useState } from "react";
import { Copy, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateRoom = () => {
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    const createRoomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 10; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setRoomCode(code);
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
                    Create Your Room
                </motion.h1>

                {!roomCode ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <p className="text-xl text-white text-center">
                            Generate a Room Code
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={createRoomCode}
                            className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors shadow-lg"
                        >
                            Generate Code
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="glass-morphism p-4 rounded-xl flex justify-between items-center">
                            <span className="text-2xl font-mono text-white">
                                {roomCode}
                            </span>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    navigator.clipboard.writeText(roomCode);
                                    toast.success("Copied to clipboard", {
                                        style: {
                                            background: "rgba(255, 255, 255, 0.9)",
                                            color: "#333"
                                        }
                                    });
                                }}
                                className="text-white hover:text-blue-200 transition-colors"
                            >
                                <Copy size={24} />
                            </motion.button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(`/joiningroom/${roomCode}`)}
                            className="w-full bg-green-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                        >
                            Enter Room
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default CreateRoom;