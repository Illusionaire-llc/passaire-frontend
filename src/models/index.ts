import {
  CheckoutForm,
  CheckoutResponse,
  Tiers,
  Workspace,
} from "./../../types.d";
import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  "https://passapp-illusionaire-e3bd84430bf2.herokuapp.com/api/v1";
export const ENDPOINTS = {
  orders: {
    "ticket-tiers": "/orders/ticket-tiers",
    "ticket-downloads": "/orders/downloads",
    "order-info": "/orders/info",
    checkout: "/orders/checkout",
    payment: "/orders/payment/link/",
  },
  workspaces: "/amenities/workshops/available-register/",
  preLogin: "/business/prelogin/",
};

// export const venueID =
//   import.meta.env.VITE_VENUE_ID || "65c40432f81716c33f256691";
// Get venue id rom the URL query params
export const venueID = window.location.hash.split('#')[2] || "665cc4acf9f765ac1d097883";
// export const tenantID = import.meta.env.VITE_TENANT_ID || "techshift";
// Get tenant id from the URL
export const tenantID = window.location.hash.split('#')[1] || "ecotel-jam";
// Console log the venueID and tenantID
console.log(venueID, tenantID);

export async function getAllTiers(): Promise<Tiers[]> {
  try {
    const { data } = await axios({
      baseURL: BASE_URL,
      url: ENDPOINTS.orders["ticket-tiers"],
      headers: {
        accept: "application/json",
        "tenant-id": tenantID,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function sendCheckout(
  checkoutForm: CheckoutForm
): Promise<CheckoutResponse> {
  try {
    const checkoutResponse = await axios({
      baseURL: BASE_URL,
      url: ENDPOINTS.orders.checkout,
      method: "POST",
      headers: {
        // accept: "application/json",
        "tenant-id": tenantID,
        // 'Content-Type': 'application/json',
      },
      data: checkoutForm,
    });
    return checkoutResponse.data;
  } catch (error: any) {
    console.log(error.response.data.detail);
    throw error.response.data.detail || error;
  }
}

export function calculateEndTime(startTime: string) {
  const originalTime = new Date(startTime);

  const offsetTime = new Date(originalTime.getTime() + 12 * 60 * 60 * 1000);
  const endDate = offsetTime.toISOString();
  return endDate;
}

export async function getAllWorkspaces(): Promise<Workspace[]> {
  try {
    const { data } = await axios({
      baseURL: BASE_URL,
      url: ENDPOINTS.workspaces,
      headers: {
        "tenant-id": tenantID,
      },
      params: { venue_id: venueID },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBusinessImage(): Promise<{
  name: string;
  logo_link: string;
}> {
  try {
    const { data } = await axios({
      baseURL: BASE_URL,
      url: ENDPOINTS.preLogin,
      headers: {
        "tenant-id": tenantID,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
