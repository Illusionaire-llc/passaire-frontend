import WorkshopsGrid from "./WorkshopsGrid.tsx";
import {createPortal} from "react-dom";
import ConfirmationDialog, {confirmationHandles} from "../../ConfirmationDialog/ConfirmationDialog.tsx";
import {useRef} from "react";
import {useGlobalContext} from "../../Components/GlobalCTX.tsx";


const WorkshopSelection = () => {
    const {selectedWorkshopIDs, isMobile} = useGlobalContext()
    const confirmationDialogRef = useRef<confirmationHandles>(null);
    const openConfirmation = () => selectedWorkshopIDs.length >= 1 && confirmationDialogRef.current?.confirm()

    return (
        <div
            className={"select-none flex flex-col justify-center gap-2 bg-black bg-opacity-65 backdrop-blur-lg w-full md:w-5/6 h-svh md:h-5/6 text-white md:rounded-2xl py-6 px-2 md:px-8"}>
            <h1 className={"text-4xl"}>Let's select some <b className={"text-blue-400"}>Workshops</b></h1>
            <span className={"flex flex-col gap-4 md:flex-row justify-between items-center"}>
                <h2 className={"md:text-xl"}>Select at least one and up to three workshops to continue</h2>
                <h2 className={"md:text-xl text-center font-bold text-red-500 border border-red-500 p-2 md:p-4 rounded"}>You can only register your workshops once</h2>
            </span>
            {isMobile &&
                <small className={"text-center text-blue-400 font-extrabold "}>Touch and hold a workshop to view extra details</small>}
            <WorkshopsGrid/>
            <button disabled={selectedWorkshopIDs.length === 0} type={"button"} onClick={openConfirmation}
                    className={"disabled:bg-gray-400 self-center bg-blue-600 shadow-xl rounded-2xl py-3 w-[20rem] h-[5rem] lg:h-[4rem] text-xl hover:bg-blue-700 hover:text-white duration-300"}>
                Continue <span>{`${selectedWorkshopIDs.length}/2`}</span>
            </button>
            {createPortal(<ConfirmationDialog ref={confirmationDialogRef}/>, document.body)}
        </div>
    );
};

export default WorkshopSelection;