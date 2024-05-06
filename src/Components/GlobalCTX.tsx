import React, {createContext, FormEvent, useContext, useEffect, useState} from 'react';
import {BASE_URL, ENDPOINTS, tenantID, venueID} from "../Utils/apiEndpoints.ts";
import { useWindowResize} from "../Utils/useWindowResize.ts";

export type globalCTXType = {
    ticketID : string | null
    isTicketVerified : boolean
    workshopDataSaved: boolean,
    loading:boolean,
    errorMsg : string|null,
    selectedWorkshopIDs: string[],
    availableWorkshops : Workshop[],
    handleWorkshopsSelection: (workShopID: string) => void
    saveWorkshopData: () => void,
    verifyTicketID: (ev: FormEvent<HTMLFormElement>) => void,
    isMobile: boolean
}

export type Workshop = {
    "_id": "string",
    "id": "string",
    "venue_id": "string",
    "name": "string",
    "description": "string",
    "image_url": string,
    "price": 0,
    "session_type": "workshop",
    "start_time": string,
    "end_time": string,
    "max_capacity": 0,
    "remaining_capacity": 0,
    "current_attendees": 0,
    "total_attended": 0,
    "is_active": true,
    "allowed_ticket_tiers": []
}



export const GlobalContext = createContext<globalCTXType | null>(null)
const GlobalCtx: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [ticketID, setTicketID] = useState<string|null>(null)
    const [isTicketVerified, setIsTicketVerified] = useState<boolean>(false)
    const [availableWorkshops, setAvailableWorkshops] = useState<Workshop[]>([])
    const [selectedWorkshopIDs, setSelectedWorkshopIDs] = useState<string[]>([]);
    const [workshopDataSaved, setWorkshopDataSaved] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string|null>(null)
    const [windowWidth , _] = useWindowResize()
    const handleWorkshopsSelection = (WorkshopID: string) => {
        const WorkshopExists = selectedWorkshopIDs.find(workshopID => WorkshopID === workshopID);
        if (WorkshopExists) {
            const filteredIDs = selectedWorkshopIDs.filter(workshopID => workshopID !== WorkshopID);
            setSelectedWorkshopIDs(filteredIDs);
        } else if (selectedWorkshopIDs.length < 3) setSelectedWorkshopIDs(prevState => [...prevState, WorkshopID])
    }


    const saveWorkshopData = async () => {
        if (selectedWorkshopIDs.length <= 3 && selectedWorkshopIDs.length >= 1) {
            console.log(JSON.stringify({
                "workshop_ids": selectedWorkshopIDs
            }))
            setLoading(true)
            try {
                setLoading(true)
                const request = await fetch(BASE_URL + ENDPOINTS.saveWorkshops + `${ticketID}?venue_id=${venueID}`, {
                    method : 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "tenant-id": tenantID
                    },
                    body: JSON.stringify({
                        "workshop_ids": selectedWorkshopIDs
                    })
                })

                if (request.ok) {
                    setWorkshopDataSaved(true)
                    setLoading(false)
                    errorMsg && setErrorMsg(null)
                }
                else {
                    console.error("something went wrong try again later")
                    setErrorMsg("something went wrong please try again later")
                }
            }
           catch (error) {
                console.error(error)
                setErrorMsg("Network error occurred")
           }
        }else {
            console.log("please select 3 workshops")
            setErrorMsg("please select at least 1 workshop")
        }
    }


    const verifyTicketID = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const fd = new FormData(ev.currentTarget);
        const TicketID = fd.get("TicketID") as string
        try{
            setLoading(true)
            const request = await fetch(BASE_URL + ENDPOINTS.verifyTicket + `venue_id=${venueID}&ticket_id=${TicketID}`,{
                headers : {
                    "tenant-id" : tenantID
                }
            })
            const response = await request.json()
            if(request.ok){
                setAvailableWorkshops(response)
                setTicketID(TicketID)
                setIsTicketVerified(true)
                console.log(response)
                setLoading(false)
                errorMsg && setErrorMsg(null)
            }
            else {
               console.error(response.detail)
                setErrorMsg(response.detail)
                setLoading(false)
            }
        }
        catch (error) {
            console.error("Network error occurred" , error)
            setErrorMsg("Network error occurred")
            setLoading(false)
        }
    }


    useEffect(() => {
        if(windowWidth<768) setIsMobile(true)
        else setIsMobile(false)
    }, [windowWidth]);
    return (
        <GlobalContext.Provider value={{
            ticketID,
            loading,
            errorMsg,
            isTicketVerified,
            workshopDataSaved,
            selectedWorkshopIDs,
            availableWorkshops,
            isMobile,
            handleWorkshopsSelection,
            saveWorkshopData,
            verifyTicketID,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalCtx;

export const useGlobalContext = () => {
    const context = useContext(GlobalContext) as globalCTXType;
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalCtxProvider');
    }
    return context;
};