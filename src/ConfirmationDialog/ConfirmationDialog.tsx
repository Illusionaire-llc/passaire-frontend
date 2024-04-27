import {forwardRef, useImperativeHandle, useRef} from "react";
import {useGlobalContext} from "../Components/GlobalCTX.tsx";
import ErrorMsg from "../Components/ErrorMsg.tsx";


export type confirmationHandles = {
    confirm: () => void
    closeConfirmation: () => void
}

const ConfirmationDialog = forwardRef<confirmationHandles>((_, ref) => {
    const {selectedWorkshopIDs, availableWorkshops , loading , saveWorkshopData} = useGlobalContext()
    const ConfirmationDialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => ({
            confirm() {
                ConfirmationDialogRef.current?.showModal()
            },
            closeConfirmation() {
                ConfirmationDialogRef.current?.close()
            }
        })
    )

    const handleClose = () => {
        ConfirmationDialogRef.current?.close()
    }


    return (
        <dialog className={"rounded-2xl min-h-[25%] max-h-[70%] bg-gray-700 text-white backdrop:bg-black backdrop:bg-opacity-70 overflow-clip"} ref={ConfirmationDialogRef}>
            <section className={"grid gap-5 p-6 h-[80%] "}>
                <h1 className={"text-2xl"}>The <b className={"text-blue-400"}>Workshops</b> you've selected </h1>
                <div className={"flex flex-col justify-center gap-5 h-full overflow-auto"}>
                    {availableWorkshops.filter((workshop) => selectedWorkshopIDs.includes(workshop.id)).map((workshop , index) => (
                        <h2 className={"font-bold"} key={workshop.id}>{index+1} - {workshop.name}</h2>
                    ))}
                </div>
                <ErrorMsg/>
            </section>
            <section className={"p-4 flex mt-5 justify-center gap-20"}>
                <button
                    className={" w-1/4 h-[20%] px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-400 duration-300"}
                    onClick={saveWorkshopData}> {!loading ? "Save" : <p className={"animate-spin"}>l</p>} </button>
                <button className={" w-1/4 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-400 duration-300"} onClick={handleClose}>Cancel</button>
            </section>
        </dialog>
    );
});

export default ConfirmationDialog;