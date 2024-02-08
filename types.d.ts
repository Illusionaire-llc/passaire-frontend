export interface Tiers {
  _id: string;
  name: string;
  price: number;
  max_quantity: number;
  quantity_sold: number;
  description: string | null;
  amenities: Array<string> | null;
  venue_id: string;
  enabled: boolean;
}

export interface CheckoutForm {
  buyer: {
    _id: string | null;
    name: string;
    email: string;
    phone: string;
  };
  order_items: {
    customer: {
      _id: string | null;
      name: string;
      email: string;
      phone: string;
    };
    ticket_id: string | null;
    ticket_tier_id: string;
    ticket_tier_name: string;
    ticket_tier_price: number;
    date_start: string;
    date_expire: string;
    workshop_ids: Array<string>;
  }[];
  payment_method: string;
  promocode: string;
  venue_id: string;
}

export interface CheckoutResponse {
  order_id: string;
  payment_method: string;
  payment_url: string;
  status: string;
}

export interface CheckoutInitialData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phoneNumber: string;
  ticketType: string;
  workspace: string;
  paymentMethod: string;
  eventsDate: string;
  numberOfTickets: number;
  promoCode: string;
}

export interface Workspace {
  id: string;
  venue_id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  start_time: string;
  end_time: string;
  max_capacity: number;
  remaining_capacity: number;
  current_attendees: number;
  total_attended: number;
  is_active: boolean;
  session_type: "workshop" | "mentorship";
  allowed_ticket_tiers: [];
}

export interface Membership {}
