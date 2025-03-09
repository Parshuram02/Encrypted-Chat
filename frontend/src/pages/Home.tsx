// import { MessageSquare, Shield, UserPlus, Lock, Heart } from 'lucide-react';
// import { useNavigate } from "react-router-dom";
// import { motion } from 'framer-motion';

// const Home = () => {
//     const navigate = useNavigate();

//     const features = [
//         { icon: <Shield size={28} />, text: "Chat Safely, Stay Close!" },
//         { icon: <Lock size={28} />, text: "We Do Not Save Your Messages" },
//         { icon: <UserPlus size={28} />, text: "Talk Freely, No Login Required" },
//         { icon: <MessageSquare size={28} />, text: "Have Secured Chats with Anyone" },
//         { icon: <Heart size={28} />, text: "Having Fun? Let Us Know!" }
//     ];

//     return (
//         <div className='min-h-screen gradient-bg'>
//             <motion.div 
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className='container mx-auto px-4 py-8'
//             >
//                 <motion.h1 
//                     initial={{ scale: 0.9 }}
//                     animate={{ scale: 1 }}
//                     className="text-6xl text-center font-bold text-white mb-12 tracking-wider"
//                 >
//                     Echo-Chat
//                 </motion.h1>

//                 <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mt-8">
//                     <motion.div 
//                         initial={{ opacity: 0, x: -50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.2 }}
//                         className="lg:w-1/2"
//                     >
//                         <div className="space-y-6">
//                             {features.map((feature, index) => (
//                                 <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0, x: -20 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ delay: index * 0.1 }}
//                                     className="glass-morphism p-6 rounded-xl flex items-center gap-4 transform hover:scale-105 transition-transform"
//                                 >
//                                     <div className="text-white">
//                                         {feature.icon}
//                                     </div>
//                                     <h3 className="text-xl text-white font-semibold">
//                                         {feature.text}
//                                     </h3>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </motion.div>

//                     <motion.div 
//                         initial={{ opacity: 0, x: 50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.4 }}
//                         className="lg:w-1/2 max-w-md w-full"
//                     >
//                         <div className="glass-morphism p-8 rounded-2xl">
//                             <h2 className="text-3xl font-bold text-white text-center mb-8">
//                                 Start Chatting Now
//                             </h2>
//                             <div className="space-y-4">
//                                 <motion.button
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                     onClick={() => navigate("/createroom")}
//                                     className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors shadow-lg"
//                                 >
//                                     Create Room
//                                 </motion.button>
//                                 <motion.button
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                     onClick={() => navigate("/joinroom")}
//                                     className="w-full bg-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-purple-600 transition-colors shadow-lg"
//                                 >
//                                     Join Room
//                                 </motion.button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default Home;

import { MessageSquare, Shield, UserPlus, Lock, Heart, ArrowRight } from 'lucide-react';
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

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-violet-900 via-blue-800 to-indigo-900 text-white'>
            <div className='absolute inset-0 bg-[url("/noise.svg")] opacity-5 z-0'></div>
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='container mx-auto px-4 py-12 relative z-10'
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                        Echo-Chat
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-200/80 max-w-2xl mx-auto">
                        Secure, private messaging for everyone
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mt-8">
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="lg:w-1/2 w-full"
                    >
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={item}
                                    className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl 
                                              flex items-center gap-4 transform hover:scale-105 transition-all duration-300
                                              hover:bg-white/15 hover:border-white/30 shadow-lg"
                                >
                                    <div className="text-primary-foreground bg-primary/20 p-3 rounded-full">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold">
                                        {feature.text}
                                    </h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="lg:w-1/2 max-w-md w-full"
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
                            <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                                Start Chatting Now
                            </h2>
                            <div className="space-y-4">
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate("/createroom")}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-xl 
                                              font-semibold text-lg transition-all duration-300 shadow-lg
                                              flex items-center justify-center gap-2 group"
                                >
                                    Create Room
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.5)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate("/joinroom")}
                                    className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-4 px-6 rounded-xl 
                                              font-semibold text-lg transition-all duration-300 shadow-lg
                                              flex items-center justify-center gap-2 group"
                                >
                                    Join Room
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="fixed top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="fixed bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
    );
};

export default Home;
