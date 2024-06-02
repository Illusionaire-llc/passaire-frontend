import React, { useState } from "react";
import { IoIosSend, IoIosWarning } from "react-icons/io";
import Select, { MultiValue, SingleValue } from "react-select";
import InputWrapper from "./InputWrapper";
import { tiersOptionsType } from "../hooks/useTickets";
import { MentorshipOptionsType } from "../hooks/useMentorship";
import { mustHaveWorkshop, startDate } from "../constants/inddex";

type WorkspaceOptionsType = {
  label: string;
  value: string;
};

type Props = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  setCurrentForm: React.Dispatch<
    React.SetStateAction<"FORM-EVENT-ONE" | "FORM-EVENT-TWO">
  >;
  handleSelectTicket: (selectedValue: SingleValue<tiersOptionsType>) => void;
  handleSelectWorkshop: (
    selectedValue: MultiValue<WorkspaceOptionsType>
  ) => void;
  handleSelectMentorship: (
    selectedValue: MultiValue<MentorshipOptionsType>
  ) => void;
  isFetchedTiers: boolean;
  isLoadingTiers: boolean;
  isFetchedWorkspace: boolean;
  isLoadingWorkspace: boolean;
  isLoadingMentorship: boolean;
  isFetchedMentorship: boolean;
  ticketsOptions: tiersOptionsType[] | undefined;
  mentorshipOptions: MentorshipOptionsType[] | undefined;
  workspaceOptions: WorkspaceOptionsType[] | undefined;
  selectedMentorshipValue: MultiValue<MentorshipOptionsType>;
  selectedWorkshopValue: MultiValue<WorkspaceOptionsType>;
};
const EventFormOne = ({
  onSubmit,
  handleSelectWorkshop,
  handleSelectMentorship,
  handleSelectTicket,
  isLoadingWorkspace,
  isLoadingMentorship,
  isLoadingTiers,
  ticketsOptions,
  isFetchedMentorship,
  isFetchedWorkspace,
  workspaceOptions,
  mentorshipOptions,
  selectedMentorshipValue,
  selectedWorkshopValue,
}: Props) => {
  const [isEmptyWorkshop, setIsEmptyWorkshop] = useState(true);
  const [isEmptyMentorship, setIsEmptyMentorship] = useState(true);
  return (
    <form
      className="flex flex-col gap-3 items-start max-md:pb-6 justify-center"
      onSubmit={onSubmit}
    >
      <div className="w-full flex max-sm:flex-col items-center justify-center gap-6">
        <InputWrapper dir="column">
          <label
            htmlFor="firstName"
            className="text-zinc-700 font-medium capitalize"
            aria-required
          >
            first name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            className="w-full px-3 py-2 border hover:border-secondary-100 focus:outline-none"
            placeholder="enter your first name..."
          />
        </InputWrapper>
        <InputWrapper dir="column">
          <label
            htmlFor="lastName"
            className="text-zinc-700 font-medium capitalize"
            aria-required
          >
            last name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            aria-required
            className="w-full px-3 py-2 border hover:border-secondary-100 focus:outline-none"
            placeholder="enter last name..."
          />
        </InputWrapper>
      </div>
      <div className="w-full flex max-sm:flex-col items-center justify-center gap-6">
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
            className="w-full px-3 py-2 border hover:border-secondary-100 focus:outline-none"
            placeholder="enter your phone number..."
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
            className="w-full px-3 py-2 border hover:border-secondary-100 focus:outline-none"
            placeholder="enter email address..."
          />
        </InputWrapper>
      </div>
      <div className="w-full max-md:flex-col flex items-center justify-start gap-6">
        {/* start select elements */}
        {/* hide ticket type with display:none class */}
        {/* start ticket type select element */}
        <InputWrapper dir="column" className="visible">
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
            onChange={(newValue: SingleValue<tiersOptionsType>) =>
              handleSelectTicket(newValue)
            }
            className="w-full border hover:border-secondary-100 focus:outline-none"
          />
        </InputWrapper>
        {/* end ticket type select element */}
        <InputWrapper dir="column" className="hidden">
          <label
            htmlFor="workshop"
            className="text-zinc-700 font-medium capitalize"
            // aria-required
          >
            workshop
          </label>
          <Select
            name="workshop"
            id="workshop"
            isMulti
            isLoading={isLoadingWorkspace}
            options={workspaceOptions}
            loadingMessage={() => "loading workshops list ..."}
            noOptionsMessage={() =>
              "sorry, there are no available workshops now"
            }
            value={selectedWorkshopValue}
            className="w-full border hover:border-secondary-100 focus:outline-none"
            onChange={(newValue) => {
              if (newValue.length <= 0) {
                setIsEmptyWorkshop(true);
              } else {
                setIsEmptyWorkshop(false);
              }
              if (newValue.length > 2) return;
              handleSelectWorkshop(newValue);
            }}
          />
        </InputWrapper>
        {/* end select elements */}
        <InputWrapper dir="column" className="hidden">
          <label
            htmlFor="mentorship"
            className="text-zinc-700 font-medium capitalize"
          >
            mentorship
          </label>
          <Select
            name="mentorship"
            id="mentorship"
            isMulti
            isLoading={isLoadingMentorship}
            options={mentorshipOptions}
            value={selectedMentorshipValue}
            loadingMessage={() => "loading mentorship list ..."}
            noOptionsMessage={() =>
              "sorry, there are no available mentorship's"
            }
            onChange={(newValue) => {
              if (newValue.length <= 0) {
                setIsEmptyMentorship(true);
              } else {
                setIsEmptyMentorship(false);
              }
              if (newValue.length > 2) return;
              handleSelectMentorship(newValue);
            }}
            className="w-full border hover:border-secondary-100 focus:outline-none"
          />
        </InputWrapper>
        <InputWrapper dir="column">
          <label
            htmlFor="promoCode"
            className="text-zinc-700 font-medium capitalize"
            // aria-required
          >
            promocode
          </label>
          <input
            type="promoCode"
            name="promoCode"
            id="promoCode"
            // required
            // aria-required
            className="w-full px-3 py-2 border hover:border-secondary-100 focus:outline-none"
            placeholder="enter promocode..."
          />
        </InputWrapper>
      </div>
      <div className="w-full max-md:flex-col md:flex-row-reverse flex items-center justify-end max-md:justify-center gap-6">
        <InputWrapper dir="column" className="hidden">
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
            // required
            // aria-required
            defaultValue={startDate}
            // disabled
            className="w-full px-3 py-2 border hover:border-secondary-100 focus:outline-none"
          />
        </InputWrapper>
      </div>
      <div className="flex max-xs:flex-col max-xs:items-start items-center justify-start gap-6 max-xs:gap-2">
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
              card or other
            </label>
          </span>
        </div>
      </div>
      {false && isEmptyMentorship && isEmptyWorkshop && (
        <div className="w-full flex items-center justify-center gap-3 px-3 py-2 mt-2 mb-1">
          <IoIosWarning className="text-2xl text-red-500" />
          <small className="font-bold capitalize text-red-700">
            please select at least one of mentorships or one of workshops
          </small>
        </div>
      )}
      <div className="w-full max-xs:flex-col flex gap-3 mt-4">
        {isFetchedMentorship &&
        isFetchedWorkspace &&
        workspaceOptions &&
        workspaceOptions?.length >= 0 || !mustHaveWorkshop  ? ( 
          <>
            <button
              type="submit"
              className="w-full max-xs:w-full flex items-center justify-center gap-4 px-4 py-2 bg-gradient-to-tr from-secondary-100 to-secondary-200 text-white font-semibold capitalize rounded-md hover:brightness-125 disabled:from-slate-400 disabled:to-slate-300 disabled:cursor-not-allowed"
              // disabled={isEmptyMentorship && isEmptyWorkshop}
            >
              <span className="text-2xl">
                <IoIosSend />
              </span>
              <p>done</p>
            </button>
          </>
        ) : (
          <small className="py-3 px-4 rounded-md shadow-md bg-yellow-300 capitalize font-semibold text-yellow-800 bg-opacity-70">
            sorry, but you cant register now because there is no workspaces or
            Mentorships available.
          </small>
        )}
      </div>
      {/* <button
        type="button"
        className="flex items-center justify-center gap-3 underline text-slate-800 mx-auto pt-3 capitalize"
        onClick={() => setCurrentForm("FORM-EVENT-TWO")}
      >
        <span className="text-lg">
          <FaLink />
        </span>
        <p>change event form</p>
      </button> */}
    </form>
  );
};

export default EventFormOne;
