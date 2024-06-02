import { FormEvent, useState } from "react";
// import eventReservation from "../assets/event-reservation.jpg";
import EventFormOne from "../components/EventFormOne";
import EventFormTwo from "../components/EventFormTwo";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BASE_URL,
  ENDPOINTS,
  calculateEndTime,
  getBusinessImage,
  sendCheckout,
  tenantID,
  venueID,
} from "../models";
import PortalWrapper from "../components/PortalWrapper";
import OrderSummeryModal from "../components/OrderSummeryModal";
import { calculateTotalPrice } from "../utils";
import { CheckoutInitialData, Tiers } from "../../types";
import useTickets from "../hooks/useTickets";
import useWorkspaces from "../hooks/useWorkspaces";
import useMentorship from "../hooks/useMentorship";
import { startDate, startTime } from "../constants/inddex";
const FormsPage = () => {
  const [currentForm, setCurrentForm] = useState<
    "FORM-EVENT-ONE" | "FORM-EVENT-TWO"
  >("FORM-EVENT-ONE");

  const {
    tiersList,
    tiersOptions,
    isFetchedTiers,
    isLoadingTiers,
    selectedTicket,
    methods: { handleSelectTicket },
  } = useTickets();

  const {
    isFetchedWorkspaces,
    isLoadingWorkspaces,
    selectedWorkshop,
    workspaceOptions,
    methods: { handleSelectWorkshop },
  } = useWorkspaces();

  const {
    isFetchedMentorship,
    isLoadingMentorship,
    selectedMentorship,
    mentorShipOptions,
    methods: { handleSelectMentorship },
  } = useMentorship();

  const {
    data: businessImage,
    isLoading: isLoadingBusinessImage,
    isFetched: isFetchedBusinessImage,
  } = useQuery({
    queryKey: ["business-image"],
    queryFn: getBusinessImage,
  });

  const {
    isPending: isPendingCheckout,
    mutateAsync: mutateAsyncCheckout,
    isSuccess: isSuccessCheckout,
    error: errorCheckout,
    isError: isErrorCheckout,
  } = useMutation({
    mutationFn: sendCheckout,
    mutationKey: ["checkout"],
  });
  const [isShownPaymentModal, setIsShownPaymentModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ticketsQuantity, setTicketsQuantity] = useState(0);
  const [ticketPrice, setTicketsPrice] = useState(0);
  const [checkoutFormData, setCheckoutFormData] =
    useState<CheckoutInitialData | null>(null);

  const handlePrice = () => {
    let ticket: Tiers | undefined;
    if (!tiersList) throw new Error(`Could not find tickets list ${tiersList}`);
    if (selectedTicket) {
      ticket = tiersList?.find(
        (ticket) => ticket._id === selectedTicket?.value
      );
    }
    ticket = tiersList[0];
    if (!ticket) throw new Error(`Could not find ticket ${selectedTicket}`);
    const totalPrice = calculateTotalPrice({
      price: ticket.price,
      quantity: 1,
    });
    setTotalPrice(totalPrice);
    setTicketsQuantity(1);
    setTicketsPrice(ticket.price);
  };

  const handlePay = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const data = {
      firstName: fd.get("firstName") as string,
      lastName: fd.get("lastName") as string,
      email: fd.get("email") as string,
      phoneNumber: fd.get("phoneNumber") as string,
      company: fd.get("company") as string,
      ticketType: fd.get("ticketType") as string,
      workspace: fd.get("workspace") as string,
      paymentMethod: fd.get("paymentMethod") as string,
      eventsDate: fd.get("eventsDate") as string,
      numberOfTickets: Number(fd.get("numberOfTickets")),
      promoCode: fd.get("promoCode") as string,
    };
    handlePrice();
    if (!data)
      throw new Error(
        `there is no available data received from form submission`
      );
    setIsShownPaymentModal(true);
    setCheckoutFormData(data);
  };
  const handleRedirect = (orderId: string) => {
    const anchor = document.createElement("a");
    anchor.href = `${BASE_URL}${ENDPOINTS.orders.payment}${tenantID}/${orderId}/`;
    anchor.click();
  };

  const sendData = ({
    checkoutFormData,
    date_expire,
    date_start,
    mentorship_ids,
    workshop_ids,
    ticket_price,
    ticket_name,
    ticket_id,

  }: {
    checkoutFormData: CheckoutInitialData;
    date_start: string;
    date_expire: string;
    ticket_id: string;
    ticket_name: string;
    ticket_price: number;
    workshop_ids: Array<string>;
    mentorship_ids: Array<string>;
  }) => {
    mutateAsyncCheckout(
      {
        buyer: {
          _id: null,
          email: checkoutFormData?.email,
          name: `${checkoutFormData?.firstName} ${checkoutFormData?.lastName}`,
          phone: checkoutFormData?.phoneNumber,
        },
        order_items: [
          {
            customer: {
              _id: null,
              email: checkoutFormData?.email,
              name: `${checkoutFormData?.firstName} ${checkoutFormData.lastName}`,
              phone: checkoutFormData?.phoneNumber,
            },
            ticket_tier_id: ticket_id,
            ticket_tier_name: ticket_name,
            date_start: date_start,
            date_expire: date_expire,
            ticket_id: null,
            ticket_tier_price: ticket_price,
            workshop_ids: [...workshop_ids, ...mentorship_ids],
          },
        ],
        payment_method: checkoutFormData.paymentMethod,
        promocode: checkoutFormData.promoCode,
        venue_id: venueID,
      },
      {
        onSuccess: (data) => {
          setIsShownPaymentModal(false);
          handleRedirect(data.order_id);
        },
      }
    );
  };
  const handleSubmit = async () => {
    let tier: Tiers | undefined;
    if (selectedTicket) {
      tier = tiersList?.find((tier) => tier._id === selectedTicket?.value);
    } else {
      tier = tiersList?.find((tier) => tier._id === tiersList[0]._id);
    }
    const calculatedStartDate = new Date(
      `${startDate} ${startTime}`
    ).toISOString();
    if (checkoutFormData) {
      const endDate = calculateEndTime(checkoutFormData.eventsDate);
      sendData({
        checkoutFormData: checkoutFormData,
        date_expire: endDate,
        date_start: calculatedStartDate,
        mentorship_ids: selectedMentorship.map((mentor) => mentor.value),
        workshop_ids: selectedWorkshop.map((w) => w.value),
        ticket_id: tier?._id as string,
        ticket_name: tier?.name as string,
        ticket_price: tier?.price as number,
      });
    }
  };

  return (
    <main className="relative w-full h-dvh flex items-center justify-center bg-slate-900">
      <div className="w-[68%] max-lg:w-[90%] max-tablet:w-[95%] max-md:w-[85%] max-md:flex-col max-md:h-[90dvh] max-md:overflow-y-auto flex items-center max-md:items-center justify-start max-md:justify-center bg-gray-100 rounded-lg transition-transform duration-500 shadow-xl hover:scale-105">
        {isLoadingBusinessImage && (
          <div className="relative w-[40%] max-tablet:w-[50%] max-md:w-full min-h-full max-md:h-[40dvh] md:h-[90dvh] max-md:min-h-[40%] flex items-center justify-center bg-gray-500 rounded-l-md overflow-hidden max-md:rounded-t-md max-md:rounded-l-none animate-pulse"></div>
        )}
        {isFetchedBusinessImage && (
          <figure className="relative w-[40%] max-tablet:w-[50%] md:h-[90dvh] max-md:w-full min-h-full h-full max-md:min-h-[40%] max-md:h-[40%] flex items-center justify-center rounded-l-md overflow-hidden max-md:rounded-t-md max-md:rounded-l-none">
            <img
              src={businessImage?.logo_link}
              alt="event-reservation.jpg"
              className="w-full h-full object-cover object-center"
            />
            <span className="absolute bottom-0 left-0 w-full h-[45%] max-md:h-[70%] flex flex-col gap-4 px-8 py-10 bg-gradient-to-t from-secondary-200">
              {/* <h4 className="text-3xl text-white font-semibold text-center mt-12">
              illusionaire
            </h4>
            <p className="text-slate-200 text-lg text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Veritatis quibusdam explicabo dolore. Ex fugit, dolorem earum rem
              aliquam cumque iure.
            </p> */}
            </span>
          </figure>
        )}
        <div className="w-[60%] max-md:w-full max-md:h-[60%] flex flex-col px-6 py-8">
          <h3 className="text-2xl font-bold uppercase mb-10 text-center ">
            Ticket Reservation
          </h3>
          {currentForm === "FORM-EVENT-ONE" && (
            <EventFormOne
              onSubmit={handlePay}
              setCurrentForm={setCurrentForm}
              isFetchedTiers={isFetchedTiers}
              isLoadingTiers={isLoadingTiers}
              isFetchedWorkspace={isFetchedWorkspaces}
              isLoadingWorkspace={isLoadingWorkspaces}
              isFetchedMentorship={isFetchedMentorship}
              isLoadingMentorship={isLoadingMentorship}
              mentorshipOptions={mentorShipOptions}
              ticketsOptions={tiersOptions}
              workspaceOptions={workspaceOptions!}
              selectedWorkshopValue={selectedWorkshop}
              selectedMentorshipValue={selectedMentorship}
              handleSelectTicket={handleSelectTicket}
              handleSelectWorkshop={handleSelectWorkshop}
              handleSelectMentorship={handleSelectMentorship}
            />
          )}
          {currentForm === "FORM-EVENT-TWO" && (
            <EventFormTwo
              onSubmit={handlePay}
              setCurrentForm={setCurrentForm}
              isFetchedTiers={isFetchedTiers}
              isLoadingTiers={isLoadingTiers}
              ticketsOptions={tiersOptions}
              handleSelectTicket={handleSelectTicket}
            />
          )}
        </div>
      </div>
      {isShownPaymentModal && (
        <PortalWrapper elementId="modal">
          <OrderSummeryModal
            ticketPrice={ticketPrice}
            quantity={ticketsQuantity}
            totalPrice={totalPrice}
            isPending={isPendingCheckout}
            isSuccess={isSuccessCheckout}
            setClose={() => setIsShownPaymentModal(false)}
            isError={isErrorCheckout}
            error={errorCheckout}
            submitHandler={() => handleSubmit()}
          />
        </PortalWrapper>
      )}
    </main>
  );
};

export default FormsPage;
