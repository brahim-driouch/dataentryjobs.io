import { ErrorToast } from "@/app/components/shared/ErrorToast";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export const showErrors = (errors: string[],reset:Dispatch<SetStateAction<string[]>>
) => {
  toast.error(<ErrorToast errors={errors} />, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: '!bg-red-50 !border !w-[500px] p-6 !border-red-200 !text-red-50',
  });
 
};
