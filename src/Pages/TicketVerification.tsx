import {useGlobalContext} from "../Components/GlobalCTX.tsx";
import ErrorMsg from "../Components/ErrorMsg.tsx";
import {useEffect} from "react";
import MainTitle from "../UI/MainTitle.tsx";



const TicketVerification = () => {

    const {verifyTicketID, loading, errorMsg , eventData , getEventData} = useGlobalContext()


    useEffect(() => {
        getEventData()
    }, []);

    return (
        <article
            className={"w-full lg:w-5/6 h-svh lg:h-[75%] flex flex-col lg:flex-row items-center justify-center rounded-2xl shadow-2xl"}>
            <img src={eventData?.logo_link} alt={eventData?.name}
                 className={"object-fill flex-1 w-full lg:w-[70%] h-1/3 lg:h-full rounded-tl-2xl border-none lg:rounded-tr-2xl lg:rounded-bl-2xl"}/>
            <form onSubmit={verifyTicketID}
                  className={"flex flex-col justify-center items-center gap-8 lg:gap-20 bg-black bg-opacity-55 backdrop-blur-lg flex-shrink-0 w-full lg:w-[27%] h-2/3 lg:h-full text-white p-4 rounded-none lg:rounded-tr-2xl lg:rounded-br-2xl"}>
                <MainTitle title={eventData?.name}/>
                <div className={" grid justify-between gap-10 place-items-center"}>
                    <h2 className={"font-light text-xl"}>Please verify you Ticket ID to continue</h2>
                    <input id={"TicketID"} name={"TicketID"}
                           className={`p-2 w-full text-black rounded-xl outline-blue-600 border-2 ${errorMsg ? "border-red-400" : "border-blue-500"}`}
                           placeholder="Enter your Ticket ID" required/>
                    <ErrorMsg/>
                </div>
                <button type={"submit"}
                        className={" w-1/2 lg:w-[7rem] p-2 text-white rounded-xl bg-blue-600 hover:bg-blue-700 duration-300"}>
                    {!loading ? "Verify now" : <p className={"animate-spin"}>l</p>}
                </button>
            </form>
        </article>
    );
};

export default TicketVerification;