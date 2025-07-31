"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  remember: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

type Props = {
  login: (email: string, password: string) => Promise<void>
}

const LoginForm = ({ login }: Props) => {
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      setFormError(null);
    } catch (err: any) {
      setFormError(err.message || 'Login failed');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="block text-sm mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="m32220@gmail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="********"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="accent-green-500" {...register('remember')} />
          <span>Remember me</span>
        </label>
        <a href="#" className="hover:underline">
          Forgot password?
        </a>
      </div>

      {formError && <p className="text-red-500 text-sm">{formError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </button>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 pt-2">
        <span>Don't have an account?</span>
        <a href="/register" className="text-black font-medium hover:underline">
          Sign Up
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
