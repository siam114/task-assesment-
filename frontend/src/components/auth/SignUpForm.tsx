'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const signUpSchema = z
  .object({
    name: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type SignUpFormInputs = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      await registerUser(data.name, data.email, data.password);
      router.push('/task-list'); // or redirect wherever
    } catch (err: any) {
      setFormError(err.message || 'Registration failed');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-sm text-gray-600">Full Name</label>
        <input
          type="text"
          {...register('name')}
          placeholder="Enter your fullname"
          className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-600">Email Address</label>
        <input
          type="email"
          {...register('email')}
          placeholder="Enter your email"
          className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-600">Password</label>
        <input
          type="password"
          {...register('password')}
          placeholder="********"
          className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-600">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword')}
          placeholder="Retype password"
          className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      {formError && <p className="text-red-500 text-sm">{formError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpForm;
