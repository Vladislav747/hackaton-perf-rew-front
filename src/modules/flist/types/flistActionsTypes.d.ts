type groupLoadCompleteActionType = {
  data: array;
  groupId: string;
  parentObjectId: string | null;
};

interface Action extends ActionPattern {
  type: string;
  payload?: any;
}

interface fullSelectedGroupAction extends Action {
  type: "SET_FULL_SELECTED_GROUPS";
  payload: {
    fullSelectedGroups: fullSelectedGroup[];
  };
}
