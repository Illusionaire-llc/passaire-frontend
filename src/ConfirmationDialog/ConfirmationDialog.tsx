import {forwardRef, useImperativeHandle, useRef} from "react";
import {useGlobalContext} from "../Components/GlobalCTX.tsx";
import ErrorMsg from "../Components/ErrorMsg.tsx";


export type confirmationHandles = {
    confirm: () => void
    closeConfirmation: () => void
}

const ConfirmationDialog = forwardRef<confirmationHandles>((_, ref) => {
    const {selectedWorkshopIDs, availableWorkshops, loading, saveWorkshopData,resetErrorMsg } = useGlobalContext()
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
        resetErrorMsg()
    }


    return (
        <dialog
            className={"rounded-2xl w-full md:w-2/5 h-[60%] max-h-[70%] bg-gray-700 text-white p-6 backdrop:bg-black backdrop:bg-opacity-70 overflow-clip"}
            ref={ConfirmationDialogRef}>
            <article className={"flex flex-col justify-between h-full flex-1 md:h-[35svh]"}>
                <section className={"flex flex-col gap-5 flex-1 justify-between  h-[90%] "}>
                    <h1 className={"text-2xl"}>The <b className={"text-blue-400"}>Workshops</b> you've selected </h1>
                    {selectedWorkshopIDs.length < 2 &&
                        <h2 className={"text-center text-xl p-2 text-red-500 font-bold"}>You've only selected {selectedWorkshopIDs.length} / 2, you can only register once !</h2>}
                    <div className={"flex flex-col justify-center items-center gap-5 h-full overflow-auto"}>
                        {availableWorkshops.filter((workshop) => selectedWorkshopIDs.includes(workshop.id)).map((workshop) => (
                            <h2 className={"font-bold border border-white py-2 px-4 rounded-full text-center"} key={workshop.id}>{workshop.name}</h2>
                        ))}
                    </div>
                    <ErrorMsg/>
                </section>
                <section className={"p-4 flex justify-center gap-20"}>
                    <button
                        className={" w-[10rem] px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-400 duration-300"}
                        onClick={saveWorkshopData}> {!loading ? "Save" : <p className={"animate-spin"}>l</p>} </button>
                    <button
                        className={" w-[10rem] px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-400 duration-300"}
                        onClick={handleClose}>Cancel
                    </button>
                </section>
            </article>
        </dialog>
    );
});

export default ConfirmationDialog;