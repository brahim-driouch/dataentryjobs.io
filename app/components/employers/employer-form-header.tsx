
import { Building2 } from 'lucide-react';
import Link from 'next/link';

const EmployerFormHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link href="/" className="inline-block">
        <h1 className="text-3xl font-bold text-white">dataentryjobs.io</h1>
      </Link>
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mt-4">
        <Building2 className="w-4 h-4" />
        <span>Employer Portal</span>
      </div>
    </div>
  );
};

export default EmployerFormHeader;