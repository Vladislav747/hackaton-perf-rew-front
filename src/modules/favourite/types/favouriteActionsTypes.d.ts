type getGroupCompleteActionType = {
  data: any[] | Object<any>;
  groupId: string;
  parentObjectId: string | null;
};

interface Action extends ActionPattern {
  type: string;
  payload?: any;
}
