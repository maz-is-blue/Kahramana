import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '@/app/context/AdminContext';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F1] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display mb-2">Kahramana</h1>
          <p className="text-sm text-[#6B6B6B] tracking-[0.3em] uppercase">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border-2 border-[#E8E5E0] p-8 lg:p-12">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#EC4899] to-[#A855F7] rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-display text-center mb-2">Welcome Back</h2>
            <p className="text-sm text-[#6B6B6B] text-center">Sign in to access the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kahramana.com"
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-4 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-[#101010]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#F59E0B] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-[#FAF7F1] border border-[#E8E5E0]">
            <p className="text-xs text-[#6B6B6B] mb-2 font-medium">Demo Credentials:</p>
            <p className="text-xs text-[#6B6B6B] font-mono">Email: admin@kahramana.com</p>
            <p className="text-xs text-[#6B6B6B] font-mono">Password: admin123</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-[#A0A0A0] mt-8">
          © 2026 Kahramana. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}