import { MultiValue } from "react-select";
import useWorkspaces from "./useWorkspaces";
import { useMemo, useState } from "react";

export type MentorshipOptionsType = {
  label: string;
  value: string;
};
const useMentorship = () => {
  const {
    isFetchedWorkspaces: isFetchedMentorship,
    isLoadingWorkspaces: isLoadingMentorship,
    workspaceList,
  } = useWorkspaces();
  const [selectedMentorship, setSelectedMentorship] = useState<
    MultiValue<MentorshipOptionsType>
  >([]);

  const getAllMentorship = useMemo(() => {
    return workspaceList?.filter(
      (workspace) => workspace.session_type === "mentorship"
    );
  }, [workspaceList]);

  const mentorShipOptions = useMemo(
    () =>
      getAllMentorship?.map((workspace) => ({
        label: workspace.name,
        value: workspace.id,
      })),
    [workspaceList]
  );

  const handleSelectMentorship = (
    selectedValue: MultiValue<MentorshipOptionsType>
  ) => setSelectedMentorship(selectedValue);

  return {
    isFetchedMentorship,
    isLoadingMentorship,
    selectedMentorship,
    mentorShipOptions,
    methods: { handleSelectMentorship },
  };
};

export default useMentorship;
