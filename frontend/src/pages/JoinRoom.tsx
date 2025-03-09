// import { useRef } from "react";
// import { ArrowRight } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { Input } from "../ui/Input";
// import { motion } from "framer-motion";

// const JoinRoom = () => {
//     const navigate = useNavigate();
//     const roomCodeRef = useRef<HTMLInputElement>(null);

//     const handleJoinRoom = () => {
//         if (roomCodeRef.current?.value) {
//             const uppercaseRoomCode = roomCodeRef.current.value.toUpperCase();
//             navigate(`/joiningroom/${uppercaseRoomCode}`);
//         } else {
//             toast.error("Please enter a room code", {
//                 style: {
//                     background: "rgba(255, 255, 255, 0.9)",
//                     color: "#333"
//                 }
//             });
//         }
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
//                     Join Room
//                 </motion.h1>

//                 <div className="space-y-6">
//                     <Input
//                         type="text"
//                         placeholder="Enter Room Code"
//                         ref={roomCodeRef}
//                         endIcon={<ArrowRight className="w-6 h-6 text-gray-600" />}
//                         uppercase={true}
//                         className="bg-white/90 rounded-xl px-6 py-4 text-lg"
//                         onClick={handleJoinRoom}
//                     />

//                     <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={handleJoinRoom}
//                         className="w-full bg-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-purple-600 transition-colors shadow-lg flex items-center justify-center gap-2"
//                     >
//                         Join Room
//                         <ArrowRight size={20} />
//                     </motion.button>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default JoinRoom;

"use client"

import { useRef } from "react"
import { ArrowRight, MessageSquare } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Input } from "../ui/Input"
import { motion } from "framer-motion"

const JoinRoom = () => {
  const navigate = useNavigate()
  const roomCodeRef = useRef<HTMLInputElement>(null)

  const handleJoinRoom = () => {
    if (roomCodeRef.current?.value) {
      const uppercaseRoomCode = roomCodeRef.current.value.toUpperCase()
      navigate(`/joiningroom/${uppercaseRoomCode}`)
    } else {
      toast.error("Please enter a room code", {
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
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4">
      <div className='absolute inset-0 bg-[url("/noise.svg")] opacity-5 z-0'></div>
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/30 rounded-full mb-4">
            <MessageSquare size={32} className="text-purple-200" />
          </div>
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
            Join Room
          </h1>
          <p className="text-white/70 mt-2">Enter a room code to join an existing chat</p>
        </motion.div>

        <div className="space-y-6">
          <Input
            type="text"
            placeholder="Enter Room Code"
            ref={roomCodeRef}
            endIcon={<ArrowRight className="w-6 h-6 text-purple-500" />}
            uppercase={true}
            className="bg-white/90 rounded-xl px-6 py-4 text-lg text-gray-800 placeholder-gray-500"
            onClick={handleJoinRoom}
          />

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleJoinRoom}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-4 px-6 rounded-xl 
                                  font-semibold text-lg transition-all duration-300 shadow-lg
                                  flex items-center justify-center gap-2 group"
          >
            Join Room
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-white/70 text-sm mt-6"
        >
          Share the room code with friends to chat together
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
    </div>
  )
}

export default JoinRoom

