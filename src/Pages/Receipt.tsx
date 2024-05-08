import {useGlobalContext} from "../Components/GlobalCTX.tsx";


const Receipt = () => {
    const {ticketID, selectedWorkshopIDs, availableWorkshops} = useGlobalContext()
    return (
        <article className={"flex flex-col justify-center items-center gap-20 w-full md:w-4/6 h-full md:h-4/6 bg-black bg-opacity-55 text-white md:rounded-2xl relative"}>
            <section className={"grid gap-5"}>
                <h1 className={"text-5xl text-center font-light"}>Your <b className={"text-blue-400"}>Workshops</b> are now saved !</h1>
                <h2 className={"text-3xl text-center font-light"}>We're looking forward to seeing you &#128513; </h2>
            </section>
            <section className={"p-6 rounded-2xl bg-blue-800 w-full md:w-1/2  grid gap-5"}>
                <h2 className={"text-3xl font-light"}>Ticket details : </h2>
                <div className={"grid gap-2"}>
                    <h3 className={"text-2xl text-blue-200"}>Your Ticket id : <span className={"text-white text-lg"}>{ticketID}</span></h3>
                    <h3 className={"text-2xl text-blue-200"}>Your selected Workshops : </h3>
                    <div className={"grid gap-2 px-4 py-1"}>
                        {
                            availableWorkshops.filter((workshop) => selectedWorkshopIDs.includes(workshop.id)).map((workshop) => (
                                <h3  key={workshop.id}>- {workshop.name}</h3>
                            ))
                        }
                    </div>
                </div>
            </section>
        </article>
    );
};

export default Receipt;