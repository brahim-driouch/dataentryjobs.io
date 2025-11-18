// components/auth/FormInput.tsx
import { Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: 'mail' | 'lock' | 'building';
  showPassword?: boolean;
  onTogglePassword?: () => void;
  required?: boolean;
}

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  icon,
  showPassword,
  onTogglePassword,
  required = false
}: FormInputProps) => {
  const renderIcon = () => {
    switch (icon) {
      case 'mail':
        return <Mail className="w-5 h-5 text-gray-400" />;
      case 'lock':
        return <Lock className="w-5 h-5 text-gray-400" />;
      case 'building':
        return <Building2 className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const isPassword = type === 'password' || name.includes('password');

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {renderIcon()}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            icon ? 'pl-11' : 'px-4'
          } ${isPassword ? 'pr-11' : 'pr-4'}`}
          required={required}
        />
        {isPassword && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;