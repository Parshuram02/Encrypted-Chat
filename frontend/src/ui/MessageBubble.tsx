import { motion } from 'framer-motion';

interface MessageBubbleProps {
    message: string;
    senderName: string;
    myName: string;
}

export const MessageBubble = ({ message, senderName, myName }: MessageBubbleProps) => {
    const isSentByMe = senderName === myName;

    return (
        <motion.div
            className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div
                className={`
                    max-w-[70%] break-words rounded-2xl px-6 py-3 message-bubble
                    ${isSentByMe 
                        ? 'bg-blue-500 text-white sent' 
                        : 'glass-morphism text-white received'
                    }
                `}
            >
                <div className="text-sm opacity-75 mb-1">{senderName}</div>
                <div className="text-lg">{message}</div>
            </div>
        </motion.div>
    );
};