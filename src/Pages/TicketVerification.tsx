import {useGlobalContext} from "../Components/GlobalCTX.tsx";
import ErrorMsg from "../Components/ErrorMsg.tsx";


const TicketVerification = () => {
    const testImage = "https://gcdnb.pbrd.co/images/NlhEN2vjzKC9.png?o=1"
    const {verifyTicketID,loading, errorMsg} = useGlobalContext()

    return (
        <article
            className={"w-full md:w-5/6 h-svh md:h-5/6 flex flex-col md:flex-row items-center justify-center rounded-2xl shadow-2xl"}>
                <img src={testImage} alt={"seko seko"}
                     className={"object-cover w-full md:w-3/4 h-1/3 md:h-full rounded-tl-2xl border-none md:rounded-tr-2xl md:rounded-bl-2xl"}/>
            <form onSubmit={verifyTicketID}
                  className={"flex flex-col justify-center items-center gap-8 md:gap-20 bg-black bg-opacity-55 backdrop-blur-lg flex-shrink-0 w-full md:w-[27%] h-2/3 md:h-full text-white p-4 rounded-none md:rounded-tr-2xl md:rounded-br-2xl"}>
                <section className={"text-center"}>
                    <h1 className={"text-3xl md:text-4xl font-bold"}>TECHSHIFT</h1>
                    <h2 className={"text-3xl md:text-4xl font-bold"}>Summit</h2>
                    <p className={"text-5xl md:text-6xl text-blue-400"}>2024</p>
                </section>
                <div className={" grid justify-between gap-10 place-items-center"}>
                    <h2 className={"font-light text-xl"}>Please verify you Ticket ID to continue</h2>
                    <input id={"TicketID"} name={"TicketID"} className={`p-2 w-full text-black rounded-xl outline-blue-600 border-2 ${ errorMsg ? "border-red-400" : "border-blue-500"}`}
                           placeholder="Enter your Ticket ID" required/>
                    <ErrorMsg/>
                </div>
                <button type={"submit"} className={" w-1/2 md:w-[7rem] p-2 text-white rounded-xl bg-blue-600 hover:bg-blue-500 duration-300"}>
                    {!loading ? "Verify now" : <p className={"animate-spin"}>l</p>}
                </button>
            </form>
        </article>
    );
};

export default TicketVerification;