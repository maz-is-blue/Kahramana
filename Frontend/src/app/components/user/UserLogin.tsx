import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useUser } from '@/app/context/UserContext';

export function UserLogin() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let success;
      if (isSignup) {
        success = await signup(formData.name, formData.email, formData.password);
      } else {
        success = await login(formData.email, formData.password);
      }

      if (success) {
        navigate('/account');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F1] py-24 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <Link to="/">
              <h1 className="text-5xl font-display mb-2">Kahramana</h1>
              <p className="text-sm text-[#6B6B6B] tracking-[0.3em] uppercase">كهرمانة</p>
            </Link>
          </div>

          {/* Auth Card */}
          <div className="bg-white border-2 border-[#E8E5E0] p-8 lg:p-12">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-display mb-2">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-sm text-[#6B6B6B]">
                {isSignup 
                  ? 'Join our exclusive fragrance collection' 
                  : 'Sign in to view your orders and collection'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name (Signup only) */}
              {isSignup && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Sarah Al-Mansouri"
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                {isLoading 
                  ? (isSignup ? 'Creating Account...' : 'Signing In...') 
                  : (isSignup ? 'Create Account' : 'Sign In')}
              </button>
            </form>

            {/* Toggle Auth Mode */}
            <div className="mt-8 pt-8 border-t border-[#E8E5E0] text-center">
              <p className="text-sm text-[#6B6B6B]">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError('');
                  }}
                  className="text-[#EC4899] hover:text-[#A855F7] font-medium"
                >
                  {isSignup ? 'Sign In' : 'Create Account'}
                </button>
              </p>
            </div>

            {/* Demo Note */}
            <div className="mt-6 p-4 bg-[#FAF7F1] border border-[#E8E5E0]">
              <p className="text-xs text-[#6B6B6B] text-center">
                <strong>Demo Mode:</strong> Use any email and password to sign in
              </p>
            </div>

            {/* Admin Access Note */}
            <div className="mt-3 p-4 bg-gradient-to-r from-[#FFF4E6] to-[#FFF0F5] border border-[#F59E0B]/20">
              <p className="text-xs text-[#6B6B6B] text-center">
                <strong>Admin Access:</strong> admin@kahramana.com / admin123
              </p>
            </div>
          </div>

          {/* Back to Shop */}
          <div className="text-center mt-8">
            <Link to="/shop" className="text-sm text-[#6B6B6B] hover:text-[#101010] transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}