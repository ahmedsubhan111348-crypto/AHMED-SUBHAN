import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, EyeOff, ArrowRight, X, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  savedUsername?: string;
  savedPassword?: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  savedUsername = 'admin',
  savedPassword = 'khusboo2026',
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username.trim().toLowerCase() === savedUsername.toLowerCase() &&
      password === savedPassword
    ) {
      setError(null);
      setUsername('');
      setPassword('');
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080808]/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md bg-[#111111] border-2 border-[rgba(201,162,39,0.4)] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(201,162,39,0.2)] p-7 sm:p-9 text-[#FFFFFF] overflow-hidden rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 text-[#A6A6A6] hover:text-[#FFFFFF] transition-colors"
            aria-label="Close login modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-7">
            <div className="w-12 h-12 rounded-full bg-[#1A1614] border border-[#C9A227] flex items-center justify-center mx-auto mb-3 text-[#D8C27A] shadow-[0_0_15px_rgba(201,162,39,0.3)]">
              <Lock className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A227]">
                KHUSBOO BEAUTY SALON
              </span>
              <Sparkles className="w-3 h-3 text-[#D8C27A]" />
            </div>

            <h3 className="font-primary text-2xl font-black uppercase text-[#FFFFFF]">
              ADMIN <span className="text-metallic-gold">PORTAL</span>
            </h3>

            <p className="text-xs text-[#A6A6A6] mt-1.5 font-medium">
              Enter your authorized credentials to access salon administration.
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-5 p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold rounded">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* Username Input */}
            <div>
              <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] focus:border-[#C9A227] p-3 text-xs text-[#FFFFFF] outline-none rounded-sm transition-colors font-medium placeholder:text-[#555555]"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] focus:border-[#C9A227] p-3 pr-10 text-xs text-[#FFFFFF] outline-none rounded-sm transition-colors font-medium placeholder:text-[#555555]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A6A6A6] hover:text-[#FFFFFF]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-4 text-xs font-black tracking-[0.25em] uppercase bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.4)] flex items-center justify-center gap-2 rounded-sm"
              >
                <span>LOGIN TO PORTAL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
