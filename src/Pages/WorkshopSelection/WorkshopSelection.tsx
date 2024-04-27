import WorkshopsGrid from "./WorkshopsGrid.tsx";
import {createPortal} from "react-dom";
import ConfirmationDialog, {confirmationHandles} from "../../ConfirmationDialog/ConfirmationDialog.tsx";
import {useRef} from "react";
import {useGlobalContext} from "../../Components/GlobalCTX.tsx";


const WorkshopSelection = () => {
    const {selectedWorkshopIDs} = useGlobalContext()
    const confirmationDialogRef = useRef<confirmationHandles>(null);

    const openConfirmation = () => selectedWorkshopIDs.length>= 1 && confirmationDialogRef.current?.confirm()

    return (
        <div
            className={"flex flex-col justify-center gap-4 bg-black bg-opacity-65 backdrop-blur-lg w-full md:w-5/6 h-svh md:h-2/3 md:max-h-5/6 text-white md:rounded-2xl p-6"}>
            <h1 className={"text-4xl"}>Let's select some <b className={"text-blue-300"}>Workshops</b></h1>
            <h2 className={"text-xl"}>Select at least one and up to three workshops to continue</h2>
            <WorkshopsGrid/>
            <button disabled={selectedWorkshopIDs.length === 0} type={"button"} onClick={openConfirmation}
                    className={"disabled:bg-gray-400 self-center bg-gray-700 shadow-xl rounded-2xl w-1/3 h-[4rem] text-xl font-bold hover:bg-blue-900 hover:text-white duration-300"}>Continue
            </button>
            {createPortal(<ConfirmationDialog ref={confirmationDialogRef}/>,document.body)}
        </div>
    );
};

export default WorkshopSelection;