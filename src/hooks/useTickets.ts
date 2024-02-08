import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getAllTiers } from "../models";
import { SingleValue } from "react-select";

export type tiersOptionsType = {
  label: string;
  value: string;
};
const useTickets = () => {
  const {
    data: tiersList,
    isFetched: isFetchedTiers,
    isLoading: isLoadingTiers,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTiers,
  });

  const tiersOptions = useMemo(
    () => tiersList?.map((tier) => ({ label: tier.name, value: tier._id })),
    [tiersList]
  );

  const [selectedTicket, setSelectedTicket] =
    useState<SingleValue<tiersOptionsType>>(null);
  const handleSelectTicket = (selectedValue: SingleValue<tiersOptionsType>) =>
    setSelectedTicket(selectedValue);

  return {
    tiersList,
    selectedTicket,
    tiersOptions,
    isFetchedTiers,
    isLoadingTiers,
    methods: { handleSelectTicket },
  };
};

export default useTickets;
