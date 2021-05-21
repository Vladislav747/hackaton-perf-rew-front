type getGroupCompleteActionType = {
  data: array;
  groupId: string;
  parentObjectId: string | null;
};

interface Action extends ActionPattern {
  type: string;
  payload?: any;
}
