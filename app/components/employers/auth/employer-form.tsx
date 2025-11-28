"use client";

import { useState } from 'react';
import FormToggle from './form-toggle';
import EmployerLoginForm from './employer-login-form';
import EmployerSignupForm from './employer-registration-form';


interface EmployerFormProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const EmployerForm = ({ isLogin, setIsLogin }: EmployerFormProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8">
      <FormToggle isLogin={isLogin} setIsLogin={setIsLogin} />
      
      {isLogin ? (
        <EmployerLoginForm setIsLogin={setIsLogin} />
      ) : (
        <EmployerSignupForm setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default EmployerForm;