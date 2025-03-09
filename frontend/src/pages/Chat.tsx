import { useEffect, useRef, useState } from 'react';
import { Send, LogOut } from 'lucide-react';
import { Input } from '../ui/Input.tsx';
import { MessageBubble } from '../ui/MessageBubble.tsx';
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
    const wsRef = useRef<WebSocket>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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
    }, [backendURL, roomCode, myName, wsURL]); // ✅ Added dependencies
    

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

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex flex-col justify-between w-full h-screen gradient-bg'
        >
            <div className='flex justify-between items-center p-4 glass-morphism'>
                <h1 className='text-2xl font-bold text-white'>Room: {roomCode}</h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center gap-2 bg-red-500/80 text-white px-6 py-3 rounded-full button-hover'
                    onClick={handleLeaveChat}
                >
                    <LogOut size={20} />
                    Leave Chat
                </motion.button>
            </div>

            <div className='flex-1 p-6 overflow-auto custom-scrollbar'>
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

            <div className='p-4 glass-morphism'>
                <div className='max-w-4xl mx-auto'>
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        ref={inputRef}
                        endIcon={<Send className="w-5 h-5 text-gray-600" />}
                        width='w-full'
                        className='bg-white/90 rounded-full px-6 py-4 text-lg'
                        onClick={() => {
                            if (!inputRef.current?.value.trim()) return;
                            wsRef.current?.send(JSON.stringify({
                                type: "chat",
                                payload: {
                                    message: inputRef.current.value,
                                    name: myName
                                }
                            }))
                            inputRef.current.value = "";
                        }}
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default Chat;