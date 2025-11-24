// In ErrorToast component - simplified
export const ErrorToast = ({ errors }: { errors: string[] }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1">
        <ul className="space-y-1.5">
          {errors?.map((error, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-red-700">
              <span className="text-red-400 mt-1">•</span>
              <span>{error}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};