import WorkshopCard from "../../UI/WorkshopCard.tsx";
import {useGlobalContext, Workshop} from "../../Components/GlobalCTX.tsx";


const WorkshopsGrid = () => {
    const {selectedWorkshopIDs, availableWorkshops , eventData, handleWorkshopsSelection} = useGlobalContext()
    const isSelected = (workshopId: string): boolean => {
        return selectedWorkshopIDs.includes(workshopId);
    }


    return (
        <>
            <div
                style={{
                    gridTemplateColumns: `repeat(${Math.min(availableWorkshops.length, 3)} ,minmax(0,1fr)`,
                        ...(window.innerWidth<768) && {
                            gridTemplateColumns: `unset`,
                        }
                }}
                className={`grid place-items-center gap-4 w-full h-fit overflow-auto`}>
                {
                    availableWorkshops.map((workshopData: Workshop) => (
                        <WorkshopCard key={workshopData.id}
                                      workshopId={workshopData.id}
                                      workshopImage={workshopData.image_url !== "none" ? workshopData.image_url : eventData!.logo_link }
                                      workshopName={workshopData.name}
                                      workshopDescription={workshopData.description}
                                      onSelect={() => handleWorkshopsSelection(workshopData.id)}
                                      selected={isSelected(workshopData.id)}
                        />
                    ))
                }
            </div>

        </>
    );
};

export default WorkshopsGrid;