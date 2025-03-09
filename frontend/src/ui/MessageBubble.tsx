// import { motion } from 'framer-motion';

// interface MessageBubbleProps {
//     message: string;
//     senderName: string;
//     myName: string;
// }

// export const MessageBubble = ({ message, senderName, myName }: MessageBubbleProps) => {
//     const isSentByMe = senderName === myName;

//     return (
//         <motion.div
//             className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-4`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//         >
//             <div
//                 className={`
//                     max-w-[70%] break-words rounded-2xl px-6 py-3 message-bubble
//                     ${isSentByMe 
//                         ? 'bg-blue-500 text-white sent' 
//                         : 'glass-morphism text-white received'
//                     }
//                 `}
//             >
//                 <div className="text-sm opacity-75 mb-1">{senderName}</div>
//                 <div className="text-lg">{message}</div>
//             </div>
//         </motion.div>
//     );
// };

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface MessageBubbleProps {
    message: string;
    senderName: string;
    myName: string;
}

export const MessageBubble = ({ message, senderName, myName }: MessageBubbleProps) => {
    const isSentByMe = senderName === myName;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.div
            className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div
                className={`
                    max-w-[80%] sm:max-w-[70%] break-words rounded-2xl px-6 py-4 
                    shadow-lg relative overflow-hidden
                    ${isSentByMe 
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-white sent rounded-tr-none' 
                        : 'bg-white/10 backdrop-blur-md border border-white/20 text-white received rounded-tl-none'
                    }
                `}
            >
                <div className="text-sm font-medium mb-1 flex justify-between items-center">
                    <span className={isSentByMe ? 'text-white/90' : 'text-primary-foreground/90'}>
                        {senderName}
                    </span>
                    <span className="text-xs opacity-70 flex items-center gap-1">
                        <Clock size={12} />
                        {time}
                    </span>
                </div>
                <div className="text-base sm:text-lg">{message}</div>
                
                {/* Decorative element */}
                <div className={`absolute ${isSentByMe ? 'right-0 top-0' : 'left-0 top-0'} w-4 h-4 
                    ${isSentByMe 
                        ? 'bg-gradient-to-r from-primary to-primary/80' 
                        : 'bg-white/10 backdrop-blur-md border-t border-l border-white/20'
                    }`}>
                </div>
            </div>
        </motion.div>
    );
};
