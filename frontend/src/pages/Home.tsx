import { MessageSquare, Shield, UserPlus, Lock, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();

    const features = [
        { icon: <Shield size={28} />, text: "Chat Safely, Stay Close!" },
        { icon: <Lock size={28} />, text: "We Do Not Save Your Messages" },
        { icon: <UserPlus size={28} />, text: "Talk Freely, No Login Required" },
        { icon: <MessageSquare size={28} />, text: "Have Secured Chats with Anyone" },
        { icon: <Heart size={28} />, text: "Having Fun? Let Us Know!" }
    ];

    return (
        <div className='min-h-screen gradient-bg'>
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='container mx-auto px-4 py-8'
            >
                <motion.h1 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-6xl text-center font-bold text-white mb-12 tracking-wider"
                >
                    Echo-Chat
                </motion.h1>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mt-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:w-1/2"
                    >
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-morphism p-6 rounded-xl flex items-center gap-4 transform hover:scale-105 transition-transform"
                                >
                                    <div className="text-white">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl text-white font-semibold">
                                        {feature.text}
                                    </h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:w-1/2 max-w-md w-full"
                    >
                        <div className="glass-morphism p-8 rounded-2xl">
                            <h2 className="text-3xl font-bold text-white text-center mb-8">
                                Start Chatting Now
                            </h2>
                            <div className="space-y-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate("/createroom")}
                                    className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors shadow-lg"
                                >
                                    Create Room
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate("/joinroom")}
                                    className="w-full bg-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-purple-600 transition-colors shadow-lg"
                                >
                                    Join Room
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;