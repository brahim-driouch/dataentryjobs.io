"use client";

import { useState } from "react";
import EmployerBenefits from "./employer-benefits";
import EmployerFormBackground from "./employer-form-background";
import EmployerFormHeader from "./employer-form-header";
import EmployerForm from "./employer-form";


export const EmployerAuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      <EmployerFormBackground />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmployerFormHeader />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <EmployerForm isLogin={isLogin} setIsLogin={setIsLogin} />
          <EmployerBenefits />
        </div>
      </div>

      <EmployerFormBackground.Wave />
    </div>
  );
};

