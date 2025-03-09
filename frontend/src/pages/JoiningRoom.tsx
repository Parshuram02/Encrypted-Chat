import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../ui/Input";
import { ArrowRight, UserCircle2 } from "lucide-react";

const JoiningRoom = () => {
    const roomId = useParams().id;
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleJoinChat = () => {
        if (!nameRef.current?.value.trim()) {
            toast.error("Please enter your name", {
                style: {
                    background: "rgba(255, 255, 255, 0.9)",
                    color: "#333"
                }
            });
            return;
        }
        navigate(`/room/${roomId}/${nameRef.current.value}`);
    };

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
            <Toaster position="top-center" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <motion.div
                    className="glass-morphism rounded-2xl p-8 space-y-8"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-center space-y-4"
                    >
                        <motion.div
                            className="mx-auto w-20 h-20 rounded-full glass-morphism flex items-center justify-center"
                            animate={{ 
                                rotate: isHovered ? 360 : 0,
                                scale: isHovered ? 1.1 : 1
                            }}
                            transition={{ duration: 0.5 }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <UserCircle2 size={48} className="text-white" />
                        </motion.div>
                        <h1 className="text-4xl font-bold text-white">
                            Enter Your Name
                        </h1>
                        <p className="text-lg text-white/80">
                            Room Code: <span className="font-mono font-bold">{roomId}</span>
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        <Input
                            type="text"
                            placeholder="Enter your name"
                            ref={nameRef}
                            endIcon={<ArrowRight className="w-6 h-6 text-gray-600" />}
                            className="bg-white/90 rounded-xl px-6 py-4 text-lg"
                            onClick={handleJoinChat}
                        />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleJoinChat}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            Join Chat
                            <ArrowRight size={20} />
                        </motion.button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center text-white/70 text-sm"
                    >
                        By joining, you agree to our chat guidelines
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default JoiningRoom;
