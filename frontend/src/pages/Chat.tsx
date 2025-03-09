// import { useEffect, useRef, useState } from 'react';
// import { Send, LogOut } from 'lucide-react';
// import { Input } from '../ui/Input.tsx';
// import { MessageBubble } from '../ui/MessageBubble.tsx';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// interface Data {
//     message: string;
//     senderName: string;
// }

// function Chat() {
//     const backendURL = import.meta.env.VITE_BACKEND_URL || "https://encrypted-chat-0a1v.onrender.com";
//     const wsURL = backendURL.replace(/^http/, 'ws'); // Ensure correct WebSocket URL scheme
//     const roomCode = useParams().id;
//     const myName = useParams().name ?? "";
//     const navigate = useNavigate();
//     const [messages, setMessages] = useState([""]);
//     const [data, setdata] = useState<Data[]>([]);
//     const wsRef = useRef<WebSocket>(null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const ws = new WebSocket(wsURL);
//         ws.onmessage = (event) => {
//             const eventData = JSON.parse(event.data);
//             setdata(data => [...data, eventData]);
//             setMessages(messages => [...messages, eventData.message]);
//         };
//         wsRef.current = ws;
        
//         ws.onopen = () => {
//             ws.send(JSON.stringify({
//                 type: "join",
//                 payload: {
//                     roomId: roomCode,
//                     name: myName
//                 }
//             }));
//         };
    
//         return () => {
//             ws.send(JSON.stringify({
//                 type: "leave",
//                 payload: {
//                     roomId: roomCode,
//                     name: myName
//                 }
//             }));
//             ws.close();
//         };
//     }, [backendURL, roomCode, myName, wsURL]); // ✅ Added dependencies
    

//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [messages]);

//     const handleLeaveChat = () => {
//         if (wsRef.current) {
//             wsRef.current.send(JSON.stringify({
//                 type: "leave",
//                 payload: {
//                     roomId: roomCode,
//                     name: myName
//                 }
//             }));
//             wsRef.current.close();
//         }
//         navigate("/");
//     }

//     return (
//         <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className='flex flex-col justify-between w-full h-screen gradient-bg'
//         >
//             <div className='flex justify-between items-center p-4 glass-morphism'>
//                 <h1 className='text-2xl font-bold text-white'>Room: {roomCode}</h1>
//                 <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className='flex items-center gap-2 bg-red-500/80 text-white px-6 py-3 rounded-full button-hover'
//                     onClick={handleLeaveChat}
//                 >
//                     <LogOut size={20} />
//                     Leave Chat
//                 </motion.button>
//             </div>

//             <div className='flex-1 p-6 overflow-auto custom-scrollbar'>
//                 <AnimatePresence>
//                     {data.map((message, index) => (
//                         <motion.div
//                             key={index}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -20 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             <MessageBubble 
//                                 message={message.message} 
//                                 senderName={message.senderName} 
//                                 myName={myName} 
//                             />
//                         </motion.div>
//                     ))}
//                 </AnimatePresence>
//                 <div ref={messagesEndRef} />
//             </div>

//             <div className='p-4 glass-morphism'>
//                 <div className='max-w-4xl mx-auto'>
//                     <Input
//                         type="text"
//                         placeholder="Type your message..."
//                         ref={inputRef}
//                         endIcon={<Send className="w-5 h-5 text-gray-600" />}
//                         width='w-full'
//                         className='bg-white/90 rounded-full px-6 py-4 text-lg'
//                         onClick={() => {
//                             if (!inputRef.current?.value.trim()) return;
//                             wsRef.current?.send(JSON.stringify({
//                                 type: "chat",
//                                 payload: {
//                                     message: inputRef.current.value,
//                                     name: myName
//                                 }
//                             }))
//                             inputRef.current.value = "";
//                         }}
//                     />
//                 </div>
//             </div>
//         </motion.div>
//     )
// }

// export default Chat;

import { useEffect, useRef, useState } from 'react';
import { Send, LogOut, Users, Info, MessageSquare } from 'lucide-react';
import { Input } from '../ui/Input';
import { MessageBubble } from '../ui/MessageBubble';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Data {
    message: string;
    senderName: string;
}

function Chat() {
    const backendURL = import.meta.env.VITE_BACKEND_URL || "https://encrypted-chat-0a1v.onrender.com";
    const wsURL = backendURL.replace(/^http/, 'ws'); // Ensure correct WebSocket URL scheme
    const roomCode = useParams().id;
    const myName = useParams().name ?? "";
    const navigate = useNavigate();
    const [messages, setMessages] = useState([""]);
    const [data, setdata] = useState<Data[]>([]);
    const wsRef = useRef<WebSocket | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(wsURL);
        ws.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            setdata(data => [...data, eventData]);
            setMessages(messages => [...messages, eventData.message]);
        };
        wsRef.current = ws;
        
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: roomCode,
                    name: myName
                }
            }));
        };
    
        return () => {
            ws.send(JSON.stringify({
                type: "leave",
                payload: {
                    roomId: roomCode,
                    name: myName
                }
            }));
            ws.close();
        };
    }, [backendURL, roomCode, myName, wsURL]);
    

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleLeaveChat = () => {
        if (wsRef.current) {
            wsRef.current.send(JSON.stringify({
                type: "leave",
                payload: {
                    roomId: roomCode,
                    name: myName
                }
            }));
            wsRef.current.close();
        }
        navigate("/");
    }

    const sendMessage = () => {
        if (!inputRef.current?.value.trim()) return;
        wsRef.current?.send(JSON.stringify({
            type: "chat",
            payload: {
                message: inputRef.current.value,
                name: myName
            }
        }))
        inputRef.current.value = "";
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex flex-col justify-between w-full h-screen bg-gradient-to-br from-violet-900 via-blue-800 to-indigo-900'
        >
            <div className='absolute inset-0 bg-[url("/noise.svg")] opacity-5 z-0'></div>
            
            <div className='flex justify-between items-center p-4 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg relative z-10'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-xl sm:text-2xl font-bold text-white'>
                        <span className='hidden sm:inline'>Room:</span> {roomCode}
                    </h1>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowInfo(!showInfo)}
                        className='bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors'
                    >
                        <Info size={18} className="text-white" />
                    </motion.button>
                </div>
                
                <div className='flex items-center gap-2'>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className='hidden sm:flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full'
                    >
                        <Users size={16} />
                        <span className='text-sm font-medium'>{myName}</span>
                    </motion.div>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex items-center gap-2 bg-red-500/80 hover:bg-red-600/80 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors shadow-lg'
                        onClick={handleLeaveChat}
                    >
                        <LogOut size={18} />
                        <span className='hidden sm:inline'>Leave Chat</span>
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className='bg-white/5 backdrop-blur-md border-b border-white/10 p-4 relative z-10'
                    >
                        <div className='max-w-4xl mx-auto text-white/80 text-sm'>
                            <p>You are chatting as <span className='font-semibold text-white'>{myName}</span> in room <span className='font-mono font-semibold text-white'>{roomCode}</span>. Messages are not stored on our servers.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='flex-1 p-4 sm:p-6 overflow-auto custom-scrollbar relative z-10'>
                <div className='max-w-4xl mx-auto'>
                    <AnimatePresence>
                        {data.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='flex flex-col items-center justify-center h-full text-white/70 text-center p-8'
                            >
                                <MessageSquare size={48} className='mb-4 opacity-50' />
                                <h3 className='text-xl font-medium mb-2'>No messages yet</h3>
                                <p>Start the conversation by sending a message below</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <AnimatePresence>
                        {data.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <MessageBubble 
                                    message={message.message} 
                                    senderName={message.senderName} 
                                    myName={myName} 
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className='p-4 bg-white/10 backdrop-blur-md border-t border-white/20 shadow-lg relative z-10'>
                <div className='max-w-4xl mx-auto'>
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        ref={inputRef}
                        endIcon={<Send className="w-5 h-5 text-blue-500" />}
                        width='w-full'
                        className='bg-white rounded-full outline-none border-none px-6 py-4 text-base sm:text-lg text-gray-900 placeholder-gray-900'
                        onClick={sendMessage}
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default Chat;
