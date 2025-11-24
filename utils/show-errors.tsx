// In show-errors.ts
import { ErrorToast } from "@/app/components/shared/ErrorToast";
import { Dispatch, SetStateAction } from "react";
import { toast, Id } from "react-toastify";

let activeToastId: Id | null = null;

export const showErrors = (
  errors: string[],
  reset: Dispatch<SetStateAction<string[]>>
) => {
  // If there's already an active error toast, don't show another
  if (activeToastId !== null && toast.isActive(activeToastId)) {
    return;
  }

  activeToastId = toast.error(<ErrorToast errors={errors} />, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: '!bg-red-50 !border !w-[500px] p-6 !border-red-200 !text-red-50',
    onClose: () => {
      activeToastId = null; // Reset when toast closes
    }
  });
  
  reset([]);
};