import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { loginSchema } from '../../lib/schemas';
import { errorMessage } from '../../api/client';
import { FieldError } from '../../components/ui';

const DEFAULT_PATH_BY_ROLE = {
  user: '/',
  vendor: '/vendor',
  admin: '/admin',
};

export default function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async values => {
    try {
      setSubmitting(true);
      const user = await login(values.email, values.password);
      toast.success(`Welcome back, ${user.name.split(' ')[0]}`);
      const from = location.state?.from?.pathname;
      navigate(from || DEFAULT_PATH_BY_ROLE[user.role] || '/', { replace: true });
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-lg place-items-center px-4 py-16">
      <div className="w-full">
        <div className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-600 text-white font-bold text-xl mb-4 shadow-lg shadow-accent-600/20">E</div>
          <h1 className="text-3xl font-bold text-ink-900 tracking-tight">Welcome to Eventix</h1>
          <p className="mt-2 text-ink-500 font-medium">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card p-10 space-y-6 shadow-premium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div>
            <label className="label" htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="name@company.com" className="input" {...register('email')} />
            <FieldError>{errors.email?.message}</FieldError>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label mb-0 ml-1" htmlFor="password">Password</label>
              <Link to="#" className="text-[10px] font-bold text-accent-600 uppercase tracking-widest hover:text-accent-700">Forgot?</Link>
            </div>
            <input id="password" type="password" placeholder="••••••••" className="input" {...register('password')} />
            <FieldError>{errors.password?.message}</FieldError>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base">
              {submitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>

          <p className="pt-2 text-center text-xs text-ink-500 font-medium">
            Don&apos;t have an account yet?{' '}
            <Link to="/signup" className="font-bold text-accent-600 hover:text-accent-700 transition-colors">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
