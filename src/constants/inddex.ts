// export const startDate = import.meta.env.VITE_START_DATE || "2024-08-10";
// export const startTime = import.meta.env.VITE_START_TIME || "06:00";

// Get from the URL encoded
export const startDate = window.location.pathname.split("/")[3] || "2024-08-10";
export const startTime = window.location.pathname.split("/")[4] || "06:00";

export const mustHaveWorkshop = import.meta.env.VITE_MUST_HAVE_WORKSHOP || false;

console.log(startDate, startTime);