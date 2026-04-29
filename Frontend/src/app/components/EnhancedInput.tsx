import { InputHTMLAttributes, useState } from 'react';
import { motion } from 'motion/react';

interface EnhancedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function EnhancedInput({
  label,
  error,
  className = '',
  ...props
}: EnhancedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
            props.onBlur?.(e);
          }}
          className={`
            w-full px-4 py-3.5 bg-white border-2 border-[#E8E5E0] rounded-lg
            transition-all duration-300 outline-none
            ${isFocused ? 'border-[#EC4899] shadow-lg shadow-[#EC4899]/5' : ''}
            ${error ? 'border-red-400' : ''}
            ${className}
          `}
        />

        {/* Floating label */}
        {label && (
          <motion.label
            animate={{
              y: isFocused || hasValue ? -32 : 0,
              scale: isFocused || hasValue ? 0.85 : 1,
              color: isFocused ? '#EC4899' : '#A0A0A0',
            }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 top-3.5 text-sm pointer-events-none origin-left"
          >
            {label}
          </motion.label>
        )}

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            opacity: isFocused ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, #EC4899, #A855F7, #F59E0B)',
            padding: '2px',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// Enhanced textarea
interface EnhancedTextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
}

export function EnhancedTextarea({
  label,
  error,
  className = '',
  rows = 4,
  ...props
}: EnhancedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <textarea
          {...props}
          rows={rows}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
            props.onBlur?.(e);
          }}
          className={`
            w-full px-4 py-3.5 bg-white border-2 border-[#E8E5E0] rounded-lg
            transition-all duration-300 outline-none resize-none
            ${isFocused ? 'border-[#EC4899] shadow-lg shadow-[#EC4899]/5' : ''}
            ${error ? 'border-red-400' : ''}
            ${className}
          `}
        />

        {/* Floating label */}
        {label && (
          <motion.label
            animate={{
              y: isFocused || hasValue ? -32 : 0,
              scale: isFocused || hasValue ? 0.85 : 1,
              color: isFocused ? '#EC4899' : '#A0A0A0',
            }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 top-3.5 text-sm pointer-events-none origin-left"
          >
            {label}
          </motion.label>
        )}

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            opacity: isFocused ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, #EC4899, #A855F7, #F59E0B)',
            padding: '2px',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
