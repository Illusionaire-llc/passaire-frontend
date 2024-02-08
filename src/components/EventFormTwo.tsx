import React from "react";
import { IoIosSend } from "react-icons/io";
import { MdOutlineCleaningServices } from "react-icons/md";
// import { FaLink } from "react-icons/fa";
import InputWrapper from "./InputWrapper";
import Select, { SingleValue } from "react-select";
import { tiersOptionsType } from "../hooks/useTickets";
import { startDate } from "../constants/inddex";

type Props = {
  onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
  setCurrentForm: React.Dispatch<
    React.SetStateAction<"FORM-EVENT-ONE" | "FORM-EVENT-TWO">
  >;
  handleSelectTicket: (selectedValue: SingleValue<tiersOptionsType>) => void;
  isFetchedTiers: boolean;
  isLoadingTiers: boolean;
  ticketsOptions: tiersOptionsType[] | undefined;
};
const EventFormTwo = ({
  onSubmit,
  handleSelectTicket,
  isLoadingTiers,
  // setCurrentForm,
  ticketsOptions,
}: Props) => {
  return (
    <form
      className="flex flex-col gap-3 items-start max-md:pb-6 justify-center"
      onSubmit={onSubmit}
    >
      <div className="w-full flex max-sm:flex-col items-center justify-center gap-6">
        <InputWrapper dir="column">
          <label
            htmlFor="fullName"
            className="text-zinc-700 font-medium capitalize"
            aria-required
          >
            full name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            required
            className="w-full px-3 py-2 border hover:border-secondary-100"
            placeholder="enter your full name..."
          />
        </InputWrapper>
        <InputWrapper dir="column">
          <label
            htmlFor="email"
            className="text-zinc-700 font-medium capitalize"
            aria-required
          >
            email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            aria-required
            className="w-full px-3 py-2 border hover:border-secondary-100"
            placeholder="enter email address..."
          />
        </InputWrapper>
      </div>
      <div className="w-full flex items-center justify-start gap-6">
        <InputWrapper dir="column">
          <label
            htmlFor="phoneNumber"
            className="text-zinc-700 font-medium capitalize"
            aria-required
          >
            phone number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            required
            className="w-full px-3 py-2 border hover:border-secondary-100"
            placeholder="enter your phone number..."
          />
        </InputWrapper>
        <InputWrapper dir="column">
          <label
            htmlFor="eventsDate"
            className="text-zinc-700 font-medium capitalize"
            aria-required
          >
            event's date
          </label>
          <input
            type="date"
            name="eventsDate"
            id="eventsDate"
            required
            aria-required
            defaultValue={startDate}
            className="w-full px-3 py-2 border  hover:border-secondary-100 focus:outline-none"
            disabled
          />
        </InputWrapper>
      </div>
      <div className="w-full max-md:flex-col flex items-center justify-center gap-6">
        {/* start select elements */}
        <InputWrapper dir="column">
          <label
            htmlFor="company"
            className="text-zinc-700 font-medium capitalize"
          >
            company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            placeholder="enter company name ..."
            className="w-full px-3 py-2 border hover:border-secondary-100 focus:outline-none"
          />
        </InputWrapper>
        <InputWrapper dir="column">
          <label
            htmlFor="ticketType"
            className="text-zinc-700 font-medium capitalize"
            aria-required
          >
            ticket type
          </label>
          <Select
            name="ticketType"
            id="ticketType"
            required
            isLoading={isLoadingTiers}
            options={ticketsOptions}
            loadingMessage={() => "loading tickets list ..."}
            noOptionsMessage={() => "sorry, there are no available tickets"}
            onChange={(newValue) => handleSelectTicket(newValue)}
            className="w-full border hover:border-secondary-100 focus:outline-none"
          />
        </InputWrapper>
        {/* end select elements */}
      </div>
      <div className="w-full max-md:flex-col flex items-center justify-center gap-6">
        {/* <InputWrapper dir="column" className="me-auto">
          <label
            htmlFor="promoCode"
            className="text-zinc-700 font-medium capitalize"
          >
            promo code
          </label>
          <input
            type="text"
            name="promoCode"
            id="promoCode"
            className="w-full px-3 py-2 border hover:border-secondary-100 focus:outline-none"
            placeholder="enter promo code ..."
          />
        </InputWrapper> */}
      </div>
      {/* <div className="flex max-xs:flex-col max-xs:items-start items-center justify-start gap-6 max-xs:gap-2">
        <label htmlFor="" className="font-medium capitalize">
          payment method
        </label>
        <div className="flex items-center justify-center gap-3 max-xs:justify-start">
          <span className="flex items-center justify-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              id="cash-method"
              value={"cash"}
              hidden
              className="peer"
            />
            <label
              htmlFor="cash-method"
              className="capitalize font-medium cursor-pointer text-lg px-5 py-2 rounded-md border bg-gray-300 peer-checked:bg-gradient-to-tl peer-checked:from-secondary-200 peer-checked:to-secondary-100 peer-checked:font-bold peer-checked:text-white peer-checked:border-white hover:brightness-125"
            >
              cash
            </label>
          </span>
          <span className="flex items-center justify-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              id="card-method"
              value={"card"}
              hidden
              className="peer"
            />
            <label
              htmlFor="card-method"
              className="capitalize font-medium cursor-pointer text-lg px-5 py-2 rounded-md border bg-gray-300 peer-checked:bg-gradient-to-tl peer-checked:from-secondary-200 peer-checked:to-secondary-100 peer-checked:font-bold peer-checked:text-white peer-checked:border-white hover:brightness-125"
            >
              card
            </label>
          </span>
        </div>
      </div> */}
      <div className="w-full max-xs:flex-col flex gap-3 mt-4">
        <button
          type="submit"
          className="w-1/2 max-xs:w-full flex items-center justify-center gap-4 px-4 py-2 bg-gradient-to-tr from-secondary-100 to-secondary-200 text-white font-semibold capitalize rounded-md hover:brightness-125"
        >
          <span className="text-2xl">
            <IoIosSend />
          </span>
          <p>Registration Form</p>
        </button>
        <button
          type="reset"
          className="w-1/2 max-xs:w-full flex items-center justify-center gap-4 px-4 py-2 bg-red-200 text-red-800 font-semibold capitalize rounded-md hover:brightness-125"
        >
          <MdOutlineCleaningServices />
          <p>reset</p>
        </button>
      </div>
      {/* <button
        type="button"
        className="flex items-center justify-center gap-3 underline text-slate-800 mx-auto pt-3 capitalize"
        onClick={() => setCurrentForm("FORM-EVENT-ONE")}
      >
        <span className="text-lg">
          <FaLink />
        </span>
        <p>change event form</p>
      </button> */}
    </form>
  );
};

export default EventFormTwo;
