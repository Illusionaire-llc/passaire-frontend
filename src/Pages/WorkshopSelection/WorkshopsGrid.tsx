import WorkshopCard from "../../UI/WorkshopCard.tsx";
import {useGlobalContext, Workshop} from "../../Components/GlobalCTX.tsx";


const WorkshopsGrid = () => {
    const {selectedWorkshopIDs, availableWorkshops, handleWorkshopsSelection} = useGlobalContext()
    const isSelected = (workshopId: string): boolean => {
        return selectedWorkshopIDs.includes(workshopId);
    }


    return (
        <>
            <div
                className={`grid grid-cols-${Math.min(availableWorkshops.length, 2)} md:grid-cols-${Math.min(availableWorkshops.length, 3)} grid-rows-${Math.ceil(availableWorkshops.length / 3)} place-items-center gap-4 w-full h-full overflow-auto`}>
                {
                    availableWorkshops.map((workshopData: Workshop) => (
                        <WorkshopCard key={workshopData.id}
                                      workshopId={workshopData.id}
                                      workshopImage={workshopData.image_url}
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