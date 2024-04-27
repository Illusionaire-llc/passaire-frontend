import React from "react";

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
    const placeHolderImg = "https://gcdnb.pbrd.co/images/NlhEN2vjzKC9.png?o=1"

    return (
        <div onClick={()=>onSelect(workshopId)} className={`${selected ? "border-8 border-blue-600" : ""}  bg-transparent shadow-lg rounded-3xl w-full h-[15rem] relative grid place-items-end group overflow-clip`}>
            <img src={workshopImage !== "none" ? workshopImage : placeHolderImg} alt={workshopName} className={"absolute w-full h-full rounded-2xl object-cover"}/>
            <div className={"flex flex-col justify-between relative z-10 text-white p-4 bg-black bg-opacity-85 rounded-2xl w-full h-2/5 group-hover:h-full duration-300"}>
                <h2 className={" lg:text-sm xl:text-lg"}>{workshopName}</h2>
                <h3 className={" lg:text-sm xl:text-lg font-bold invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-300"}>Description :<p>{workshopDescription}</p></h3>
            </div>
        </div>
    );
};

export default WorkshopCard;