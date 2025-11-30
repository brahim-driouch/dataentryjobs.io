import { useEffect } from "react";

type ConfirmationPromptProps = {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary';
    show?: boolean;
    setShow?:(show:boolean)=>void
}

export const ConfirmationPrompt = ({
    message,
    onConfirm,
    onCancel,
    confirmText = "Yes",
    cancelText = "No",
    variant = "primary",
    show = true,
    setShow
}: ConfirmationPromptProps) => {
    
    // Handle escape key to cancel
useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onCancel]);

    if (!show) return null;

    const confirmColor = variant === 'danger' 
        ? 'bg-red-600 hover:bg-red-700' 
        : 'bg-blue-600 hover:bg-blue-700';

    return (
        <div className="fixed inset-0 bg-black/15 bg-opacity-50 flex items-center justify-center z-50">
            <div 
                className="bg-white flex flex-col justify-center items-center rounded-lg shadow-xl p-6 min-w-[400px] min-h-[200px] max-w-2xl mx-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirmation-message"
            >
                <p id="confirmation-message" className="text-gray-800 mb-4 text-center">
                    {message}
                </p>
                
                <div className="flex gap-3 justify-center">
                    <button 
                        className={`${confirmColor} outline-none text-white px-6 py-2 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        onClick={()=>{
                            if(setShow){    
                                setShow(false);
                            }
                            onConfirm();
                        }}
                        autoFocus
                    >
                        {confirmText}
                    </button>
                    <button 
                        className=" outline-none bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    )
}