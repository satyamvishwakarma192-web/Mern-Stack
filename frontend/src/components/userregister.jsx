import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import { WelcomeScreen } from './ui/onboarding-welcome-screen';
import { Button } from './ui/button';
import ScrollVelocity from './ui/ScrollVelocity';
import SplitText from './ui/SplitText';

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ FullName: '', PhoneNumber: '', Address: '', Email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback('');
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/register',
        {
          FullName: formData.FullName,
          Email: formData.Email,
          password: formData.password,
          PhoneNumber: formData.PhoneNumber,
          Address: formData.Address,
        },
        { withCredentials: true },
      );

      setFeedback(response.data.message || 'User registered successfully');
      navigate('/user/login');
    } catch (error) {
      setFeedback(error?.response?.data?.message || error?.message || 'Unable to create account right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffffff_60%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-2xl lg:flex-row">
        <div className="w-full bg-orange-50 p-4 sm:p-8 lg:w-[45%] lg:p-10">
          <ScrollVelocity
            texts={['Join Doorin', 'Fresh deals', 'Better dining']}
            velocity={80}
            className="text-orange-500"
            parallaxClassName="mb-6 h-16"
            scrollerClassName="scroller"
            scrollerStyle={{ fontSize: '1.75rem', lineHeight: '2rem' }}
          />
          <WelcomeScreen
            imageUrl="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
            title={<>Create your <span className="text-primary">Doorin</span> account</>}
            description="Join Doorin to discover nearby food deals, book dining experiences, and save your favorites."
            buttonText="Start now"
            onButtonClick={() => document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' })}
            secondaryActionText={<>Already have an account? <span className="font-semibold text-primary">Sign in</span></>}
            onSecondaryActionClick={() => navigate('/user/login')}
            className="rounded-[1.5rem] border border-orange-100"
          />
        </div>

        <motion.div
          id="register-form"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-12"
        >
          <div className="mb-8 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">User Register</p>
            <SplitText
              text="Create your account"
              tag="h1"
              className="text-3xl font-semibold text-slate-900"
              delay={70}
              duration={0.8}
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
            />
            <p className="text-sm text-slate-600">Tell us a little about yourself and get started in minutes.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <User className="h-4 w-4 text-orange-500" /> Full name
              </span>
              <input name="FullName" value={formData.FullName} onChange={handleChange} placeholder="John Doe" className="w-full border-none bg-transparent text-sm outline-none" required />
            </label>

            <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Phone className="h-4 w-4 text-orange-500" /> Phone number
              </span>
              <input name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} placeholder="+1 234 567 8900" className="w-full border-none bg-transparent text-sm outline-none" required />
            </label>

            <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin className="h-4 w-4 text-orange-500" /> Address
              </span>
              <input name="Address" value={formData.Address} onChange={handleChange} placeholder="Your city or area" className="w-full border-none bg-transparent text-sm outline-none" required />
            </label>

            <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Mail className="h-4 w-4 text-orange-500" /> Email
              </span>
              <input name="Email" type="email" value={formData.Email} onChange={handleChange} placeholder="name@example.com" className="w-full border-none bg-transparent text-sm outline-none" required />
            </label>

            <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Lock className="h-4 w-4 text-orange-500" /> Password
              </span>
              <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter password" className="w-full border-none bg-transparent text-sm outline-none" required />
            </label>

            {feedback ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{feedback}</p> : null}

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create account'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            Already joined?{' '}
            <Link to="/user/login" className="font-semibold text-orange-600 hover:underline">
              Sign in instead
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UserRegister;
