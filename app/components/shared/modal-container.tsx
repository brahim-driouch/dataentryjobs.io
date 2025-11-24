


export const ModalContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="fixed w-full h-full top-0 left-0 bg-black/40 flex justify-center items-center z-[9999px]">
           {children}
        </div>
    );
}