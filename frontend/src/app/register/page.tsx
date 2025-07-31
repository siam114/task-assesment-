'use client';

import Lottie from 'lottie-react';
import signupLottieData from '../../../public/lottie/signup.json';
import SignUpForm from '@/components/auth/SignUpForm';
import { useAuth } from '@/context/AuthContext';
import AppFallbackSpinner from '@/components/base-components/AppFallbackSpinner';

const SignUpPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <AppFallbackSpinner />
  }

  return (
    <section className="w-full h-screen flex font-sans">
      {/* Left Section (Illustration) */}
      <div className="w-1/2 h-full bg-gradient-to-br bg-[#040612] flex items-center justify-center">
        <Lottie className="w-[80%]" animationData={signupLottieData} />
      </div>

      {/* Right Section (Form) */}
      <div className="w-1/2 h-full flex items-center justify-center bg-white">
        <div className="w-[80%] max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-center">Sign Up</h2>
          <p className="text-gray-500 mb-6 text-center">
            To Create Account, Please Fill in the Form Below.
          </p>

          <SignUpForm />

          <div className="mt-6 text-center text-gray-600">
            <span>Or</span>
            <br />
            <span>
              Already have an account?{' '}
              <a href="/login" className="text-black font-medium hover:underline">
                Log in
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
