// export const startDate = import.meta.env.VITE_START_DATE || "2024-08-10";
// export const startTime = import.meta.env.VITE_START_TIME || "06:00";

console.log(window.location);


// Get from the URL encoded
export const startDate = window.location.hash.split("#")[3] || "2024-06-17";
export const startTime = window.location.hash.split("#")[4] || "05:00";

export const mustHaveWorkshop = import.meta.env.VITE_MUST_HAVE_WORKSHOP || false;

console.log(startDate, startTime);

