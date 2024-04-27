import {useGlobalContext} from "../Components/GlobalCTX.tsx";


const Receipt = () => {
    const {ticketID, selectedWorkshopIDs, availableWorkshops} = useGlobalContext()
    return (
        <article className={"flex flex-col justify-center items-center gap-20 w-full md:w-4/6 h-full md:h-4/6 bg-black bg-opacity-55 text-white md:rounded-2xl relative"}>
            <section className={"grid gap-5"}>
                <h1 className={"text-5xl text-center font-light"}>Your <b className={"text-blue-400"}>Workshops</b> are now saved !</h1>
                <h2 className={"text-3xl text-center font-light"}>We're looking forward to seeing you &#128513; </h2>
            </section>
            <section className={"border-white  p-6 rounded-2xl bg-blue-800  grid gap-5"}>
                <h2 className={"text-3xl font-light"}>Ticket details : </h2>
                <div className={"grid gap-2"} >
                    <h3 className={"text-lg font-bold"}><span className={"text-2xl text-blue-200"}>Your Ticket id :</span> {ticketID}</h3>
                    <h3 className={"text-2xl text-blue-200 font-bold"}>Your selected Workshops : </h3>
                    {
                        availableWorkshops.filter((workshop) => selectedWorkshopIDs.includes(workshop.id)).map((workshop, index) => (
                            <h3 className={"font-bold"} key={workshop.id}>{index + 1} - {workshop.name}</h3>
                        ))
                    }
                </div>
            </section>
        </article>
    );
};

export default Receipt;