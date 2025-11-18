// components/auth/FormToggle.tsx
interface FormToggleProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const FormToggle = ({ isLogin, setIsLogin }: FormToggleProps) => {
  return (
    <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
      <button
        type="button"
        onClick={() => setIsLogin(true)}
        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
          isLogin 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => setIsLogin(false)}
        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
          !isLogin 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Create Account
      </button>
    </div>
  );
};

export default FormToggle;