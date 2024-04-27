export const BASE_URL =
    import.meta.env.VITE_BASE_URL ||
    "https://passapp-illusionaire-e3bd84430bf2.herokuapp.com/api/v1";
export const venueID =
    import.meta.env.VITE_VENUE_ID || "65c40432f81716c33f256691";

export const tenantID =   import.meta.env.VITE_TENANT_ID
export const ENDPOINTS = {
    verifyTicket : "/amenities/workshops/available-register/?",
    saveWorkshops : "/amenities/workshops/register/"
}