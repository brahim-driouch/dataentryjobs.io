// In show-errors.ts
import { ErrorToast } from "@/app/components/shared/error-toast";
import { SuccessToast } from "@/app/components/shared/success-toast";
import { Dispatch, SetStateAction } from "react";
import { toast, Id } from "react-toastify";

let activeToastId: Id | null = null;

export const showSuccess = (
  message: string,
) => {
  // If there's already an active error toast, don't show another
  if (activeToastId !== null && toast.isActive(activeToastId)) {
    return;
  }

  activeToastId = toast.success(<SuccessToast message={message} />, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: '!bg-green-100 !border !w-[500px] p-6 !border-green-200 !text-green-700',
    onClose: () => {
      activeToastId = null; // Reset when toast closes
    }
  });
  
};