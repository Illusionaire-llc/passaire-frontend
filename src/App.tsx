
import WorkshopSelection from "./Pages/WorkshopSelection/WorkshopSelection.tsx";
import {useGlobalContext} from "./Components/GlobalCTX.tsx";
import TicketVerification from "./Pages/TicketVerification.tsx";
import Receipt from "./Pages/Receipt.tsx";

function App() {
   const {isTicketVerified, workshopDataSaved} = useGlobalContext()

    return (

        <main className={"flex justify-center items-center w-full h-full bg-purple-500 "}>
            {workshopDataSaved ? <Receipt/>
                : !isTicketVerified ? <TicketVerification/>
                    : <WorkshopSelection/>
            }
        </main>
    )
}

export default App
