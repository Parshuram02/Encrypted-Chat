// import { useRef, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Input } from "../ui/Input";
// import { ArrowRight, UserCircle2 } from "lucide-react";

// const JoiningRoom = () => {
//     const roomId = useParams().id;
//     const navigate = useNavigate();
//     const nameRef = useRef<HTMLInputElement>(null);
//     const [isHovered, setIsHovered] = useState(false);

//     const handleJoinChat = () => {
//         if (!nameRef.current?.value.trim()) {
//             toast.error("Please enter your name", {
//                 style: {
//                     background: "rgba(255, 255, 255, 0.9)",
//                     color: "#333"
//                 }
//             });
//             return;
//         }
//         navigate(`/room/${roomId}/${nameRef.current.value}`);
//     };

//     return (
//         <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
//             <Toaster position="top-center" />
            
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="max-w-md w-full"
//             >
//                 <motion.div
//                     className="glass-morphism rounded-2xl p-8 space-y-8"
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     <motion.div
//                         initial={{ scale: 0.9 }}
//                         animate={{ scale: 1 }}
//                         className="text-center space-y-4"
//                     >
//                         <motion.div
//                             className="mx-auto w-20 h-20 rounded-full glass-morphism flex items-center justify-center"
//                             animate={{ 
//                                 rotate: isHovered ? 360 : 0,
//                                 scale: isHovered ? 1.1 : 1
//                             }}
//                             transition={{ duration: 0.5 }}
//                             onMouseEnter={() => setIsHovered(true)}
//                             onMouseLeave={() => setIsHovered(false)}
//                         >
//                             <UserCircle2 size={48} className="text-white" />
//                         </motion.div>
//                         <h1 className="text-4xl font-bold text-white">
//                             Enter Your Name
//                         </h1>
//                         <p className="text-lg text-white/80">
//                             Room Code: <span className="font-mono font-bold">{roomId}</span>
//                         </p>
//                     </motion.div>

//                     <div className="space-y-6">
//                         <Input
//                             type="text"
//                             placeholder="Enter your name"
//                             ref={nameRef}
//                             endIcon={<ArrowRight className="w-6 h-6 text-gray-600" />}
//                             className="bg-white/90 rounded-xl px-6 py-4 text-lg"
//                             onClick={handleJoinChat}
//                         />

//                         <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={handleJoinChat}
//                             className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//                         >
//                             Join Chat
//                             <ArrowRight size={20} />
//                         </motion.button>
//                     </div>

//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.3 }}
//                         className="text-center text-white/70 text-sm"
//                     >
//                         By joining, you agree to our chat guidelines
//                     </motion.div>
//                 </motion.div>
//             </motion.div>
//         </div>
//     );
// };

// export default JoiningRoom;


"use client"

import { useRef, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Input } from "../ui/Input"
import { ArrowRight, UserCircle2, MessageSquare } from "lucide-react"

const JoiningRoom = () => {
  const roomId = useParams().id
  const navigate = useNavigate()
  const nameRef = useRef<HTMLInputElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleJoinChat = () => {
    if (!nameRef.current?.value.trim()) {
      toast.error("Please enter your name", {
        style: {
          background: "rgba(59, 130, 246, 0.9)",
          color: "white",
          borderRadius: "10px",
        },
        iconTheme: {
          primary: "white",
          secondary: "rgba(59, 130, 246, 0.9)",
        },
      })
      return
    }
    navigate(`/room/${roomId}/${nameRef.current.value}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4">
      <div className='absolute inset-0 bg-[url("/noise.svg")] opacity-5 z-0'></div>
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <motion.div
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-8 shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center space-y-4">
            <div className="flex justify-center">
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-md flex items-center justify-center"
                animate={{
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.1 : 1,
                  boxShadow: isHovered ? "0 0 25px rgba(147, 51, 234, 0.5)" : "0 0 0 rgba(147, 51, 234, 0)",
                }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <UserCircle2 size={48} className="text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              Enter Your Name
            </h1>
            <div className="flex items-center justify-center gap-2">
              <MessageSquare size={16} className="text-blue-300" />
              <p className="text-lg text-white/80">
                Room Code: <span className="font-mono font-bold bg-white/10 px-2 py-1 rounded">{roomId}</span>
              </p>
            </div>
          </motion.div>

          <div className="space-y-6">
            <Input
              type="text"
              placeholder="Enter your name"
              ref={nameRef}
              endIcon={<ArrowRight className="w-6 h-6 text-blue-500" />}
              className="bg-white/90 rounded-xl px-6 py-4 text-lg text-gray-800 placeholder-gray-500"
              onClick={handleJoinChat}
            />

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleJoinChat}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl 
                                      font-semibold text-lg transition-all duration-300 shadow-lg 
                                      flex items-center justify-center gap-2 group"
            >
              Join Chat
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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

      {/* Decorative elements */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
    </div>
  )
}

export default JoiningRoom

