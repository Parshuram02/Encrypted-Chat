// import { useState } from "react";
// import { Copy, ArrowRight } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const CreateRoom = () => {
//     const [roomCode, setRoomCode] = useState("");
//     const navigate = useNavigate();

//     const createRoomCode = () => {
//         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//         let code = '';
//         for (let i = 0; i < 10; i++) {
//             code += characters.charAt(Math.floor(Math.random() * characters.length));
//         }
//         setRoomCode(code);
//     };

//     return (
//         <div className='min-h-screen gradient-bg flex items-center justify-center px-4'>
//             <Toaster position="top-center" />
            
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className='max-w-md w-full glass-morphism rounded-2xl p-8'
//             >
//                 <motion.h1
//                     initial={{ scale: 0.9 }}
//                     animate={{ scale: 1 }}
//                     className="text-4xl font-bold text-white text-center mb-8"
//                 >
//                     Create Your Room
//                 </motion.h1>

//                 {!roomCode ? (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="space-y-6"
//                     >
//                         <p className="text-xl text-white text-center">
//                             Generate a Room Code
//                         </p>
//                         <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={createRoomCode}
//                             className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors shadow-lg"
//                         >
//                             Generate Code
//                         </motion.button>
//                     </motion.div>
//                 ) : (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="space-y-6"
//                     >
//                         <div className="glass-morphism p-4 rounded-xl flex justify-between items-center">
//                             <span className="text-2xl font-mono text-white">
//                                 {roomCode}
//                             </span>
//                             <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => {
//                                     navigator.clipboard.writeText(roomCode);
//                                     toast.success("Copied to clipboard", {
//                                         style: {
//                                             background: "rgba(255, 255, 255, 0.9)",
//                                             color: "#333"
//                                         }
//                                     });
//                                 }}
//                                 className="text-white hover:text-blue-200 transition-colors"
//                             >
//                                 <Copy size={24} />
//                             </motion.button>
//                         </div>

//                         <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => navigate(`/joiningroom/${roomCode}`)}
//                             className="w-full bg-green-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center gap-2"
//                         >
//                             Enter Room
//                             <ArrowRight size={20} />
//                         </motion.button>
//                     </motion.div>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default CreateRoom;

import { useState } from "react";
import { Copy, ArrowRight, RefreshCw } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateRoom = () => {
    const [roomCode, setRoomCode] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const navigate = useNavigate();

    const createRoomCode = () => {
        setIsGenerating(true);
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 10; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        // Simulate a slight delay for better UX
        setTimeout(() => {
            setRoomCode(code);
            setIsGenerating(false);
        }, 600);
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-violet-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4'>
            <div className='absolute inset-0 bg-[url("/noise.svg")] opacity-5 z-0'></div>
            <Toaster position="top-center" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl relative z-10'
            >
                <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200"
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
                            Generate a unique room code to start chatting
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={createRoomCode}
                            disabled={isGenerating}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-xl 
                                      font-semibold text-lg transition-all duration-300 shadow-lg
                                      flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw size={20} className="animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    Generate Code
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl 
                                      flex justify-between items-center shadow-inner">
                            <span className="text-2xl font-mono text-white tracking-wider">
                                {roomCode}
                            </span>
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    navigator.clipboard.writeText(roomCode);
                                    toast.success("Copied to clipboard", {
                                        style: {
                                            background: "rgba(59, 130, 246, 0.9)",
                                            color: "white",
                                            borderRadius: "10px",
                                        },
                                        iconTheme: {
                                            primary: 'white',
                                            secondary: 'rgba(59, 130, 246, 0.9)',
                                        }
                                    });
                                }}
                                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <Copy size={24} />
                            </motion.button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(`/joiningroom/${roomCode}`)}
                            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 px-6 rounded-xl 
                                      font-semibold text-lg transition-all duration-300 shadow-lg
                                      flex items-center justify-center gap-2 group"
                        >
                            Enter Room
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>
                )}
            </motion.div>
            
            {/* Decorative elements */}
            <div className="fixed top-20 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="fixed bottom-20 left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
    );
};

export default CreateRoom;
