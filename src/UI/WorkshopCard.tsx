import React, {useState} from "react";

export type props = {
    workshopId: string;
    workshopName: string;
    workshopImage: string;
    workshopDescription: string;
    selected :boolean
    onSelect : (workshopId: string) => void;
}

const WorkshopCard: React.FC<props> = (
    {
        workshopId,
        workshopImage,
        workshopName,
        workshopDescription,
        selected,
        onSelect
    }) => {

    const [expand , setExpand] = useState<boolean>(false)

    return (
        <div onTouchStart={()=>setExpand(true)} onTouchEnd={()=> setExpand(false)} onClick={()=>onSelect(workshopId)} className={`${selected ? "border-8 border-blue-600" : ""}  ${workshopImage !== "none" ? "bg-transparent" : "bg-purple-300"} shadow-lg rounded-3xl w-full h-[12rem] md:h-[15rem] relative grid place-items-end group overflow-clip`}>
            {workshopImage !== "none" && <img src={workshopImage } alt={workshopName} className={"absolute w-full h-full rounded-2xl object-cover"}/>}
            <div className={`flex flex-col justify-between relative z-10 text-white p-4 bg-black bg-opacity-85 rounded-2xl w-full ${ expand ? "h-full" : "h-2/5"}  md:group-hover:h-full delay-[175ms] md:delay-0 duration-300`}>
                <h2 className={" lg:text-sm xl:text-lg select-none"}>{workshopName}</h2>
                <h3 className={` lg:text-sm xl:text-lg font-bold  w-full ${ expand ? "visible opacity-100" : "invisible opacity-0"} md:group-hover:visible md:group-hover:opacity-100 delay-[175ms] md:delay-0 duration-300 select-none`}>Description :<p>{workshopDescription}</p></h3>
            </div>
        </div>
    );
};

export default WorkshopCard;