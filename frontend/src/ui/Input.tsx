// import { forwardRef, ReactNode } from 'react';
// import { motion } from 'framer-motion';

// interface InputProps {
//     type: string;
//     placeholder: string;
//     width?: string;
//     endIcon?: ReactNode;
//     uppercase?: boolean;
//     className?: string;
//     onClick?: () => void;
// }

// export const Input = forwardRef<HTMLInputElement, InputProps>(({
//     type,
//     placeholder,
//     width = 'w-full',
//     endIcon,
//     uppercase = false,
//     className = '',
//     onClick
// }, ref) => {
//     return (
//         <div className={`relative ${width}`}>
//             <input
//                 type={type}
//                 placeholder={placeholder}
//                 ref={ref}
//                 className={`
//                     w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500
//                     ${uppercase ? 'uppercase' : ''}
//                     ${className}
//                 `}
//                 onKeyDown={(e) => {
//                     if (e.key === 'Enter' && onClick) {
//                         onClick();
//                     }
//                 }}
//             />
//             {endIcon && (
//                 <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                     onClick={onClick}
//                 >
//                     {endIcon}
//                 </motion.button>
//             )}
//         </div>
//     );
// });

// Input.displayName = 'Input';

import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
    type: string;
    placeholder: string;
    width?: string;
    endIcon?: ReactNode;
    uppercase?: boolean;
    className?: string;
    onClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    type,
    placeholder,
    width = 'w-full',
    endIcon,
    uppercase = false,
    className = '',
    onClick
}, ref) => {
    return (
        <div className={`relative ${width}`}>
            <input
                type={type}
                placeholder={placeholder}
                ref={ref}
                className={`
                    w-full pr-12 focus:outline-none focus:ring-2 focus:ring-primary/70 
                    transition-all duration-300 ease-in-out
                    border-none  bg-white/10 backdrop-blur-md
                    text-black placeholder-white/60
                    py-4 px-6 rounded-xl shadow-lg
                    ${uppercase ? 'uppercase tracking-wider' : ''}
                    ${className}
                `}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && onClick) {
                        onClick();
                    }
                }}
            />
            {endIcon && (
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white/80 hover:text-white transition-colors"
                    onClick={onClick}
                >
                    {endIcon}
                </motion.button>
            )}
        </div>
    );
});

Input.displayName = 'Input';
