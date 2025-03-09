import { useEffect, useRef, useState } from 'react';
import { sendIcon } from "../icons/sendIcon.tsx";
import { Input } from '../ui/Input.tsx';
import { MessageBubble } from '../ui/MessageBubble.tsx';
import { useParams, useNavigate } from 'react-router-dom';

interface Data {
    message: string,
    senderName: string
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
            console.log(event);
            const eventData = JSON.parse(event.data);
            setdata(data => [...data, eventData]);
            console.log(data);
            setMessages(messages => [...messages, eventData.message]);
        }
        wsRef.current = ws;
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: roomCode,
                    name: myName
                }
            }))
        }

        return () => {
            ws.send(JSON.stringify({
                type: "leave",
                payload: {
                    roomId: roomCode,
                    name: myName
                }
            }));
            ws.close();
        }
    }, []);

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
        <div className='flex flex-col justify-between w-full h-screen items-center bgimage text-white'>
            <div className='absolute top-5 right-5'>
                <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={handleLeaveChat}>
                    Leave Chat
                </button>
            </div>
            <div className={`h-5/6 pt-16 flex flex-col gap-5 overflow-auto w-full justify-start items-end custom-scrollbar`}>
                {data.map((message, index) => (
                    <MessageBubble key={index} message={message.message} senderName={message.senderName} myName={myName} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className='h-1/6 w-screen p-5 flex justify-between gap-3 text-black'>
                <Input
                    type="text"
                    placeholder="Message"
                    ref={inputRef}
                    endIcon={sendIcon()}
                    width='w-full'
                    onClick={() => {
                        if (!inputRef.current) return;
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
    )
}

export default Chat;
