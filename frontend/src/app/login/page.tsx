"use client"
import Lottie from 'lottie-react';
import loginLottieData from '../../../public/lottie/login.json';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';
import AppFallbackSpinner from '@/components/base-components/AppFallbackSpinner';

const LoginPage = () => {

  const { loading, login } = useAuth();

  if (loading) {
    return <AppFallbackSpinner />
  }

  return (
    <section className="w-full h-screen flex">
      <div className="w-[50%] h-full bg-[#040612] flex items-center justify-center">
        <Lottie className="w-[80%]" animationData={loginLottieData} />
      </div>

      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="w-[80%] max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-center">Login</h2>
          <p className="text-gray-500 mb-6 text-center">
            Welcome back, Please enter your details to Log In.
          </p>

          <LoginForm login={login} />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
