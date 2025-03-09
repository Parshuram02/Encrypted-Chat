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
                    w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${uppercase ? 'uppercase' : ''}
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
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={onClick}
                >
                    {endIcon}
                </motion.button>
            )}
        </div>
    );
});

Input.displayName = 'Input';