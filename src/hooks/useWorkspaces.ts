import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getAllWorkspaces } from "../models";
import { MultiValue } from "react-select";

type WorkspaceOptionsType = {
  label: string;
  value: string;
};
const useWorkspaces = () => {
  const {
    data: workspaceList,
    isFetched: isFetchedWorkspaces,
    isLoading: isLoadingWorkspaces,
  } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspaces,
  });
  const [selectedWorkshop, setSelectedWorkshop] = useState<
    MultiValue<WorkspaceOptionsType>
  >([]);

  const filterWorkspace = useMemo(() => {
    return workspaceList?.filter(
      (workspace) => workspace.session_type === "workshop"
    );
  }, [workspaceList]);
  const workspaceOptions = useMemo(
    () =>
      filterWorkspace?.map((workspace) => ({
        label: workspace.name,
        value: workspace.id,
      })),
    [workspaceList]
  );

  const handleSelectWorkshop = (
    selectedValue: MultiValue<WorkspaceOptionsType>
  ) => setSelectedWorkshop(selectedValue);

  return {
    workspaceList,
    isFetchedWorkspaces,
    isLoadingWorkspaces,
    workspaceOptions,
    selectedWorkshop,
    methods: { handleSelectWorkshop },
  };
};

export default useWorkspaces;
