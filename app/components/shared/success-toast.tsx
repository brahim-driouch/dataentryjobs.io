// In ErrorToast component - simplified
export const SuccessToast = ({message }: { message: string }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1">
        <ul className="space-y-1.5 text-green-800">
              <span>{message}</span>

        </ul>
      </div>
    </div>
  );
};