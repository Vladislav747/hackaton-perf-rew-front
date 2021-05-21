interface ListCustomGroupsModalProps {
  closeListCustomGroupsModal: (boolean) => void;
  statusModal: boolean;
  //Усилить типизацию
  personalGroups: any;
  openAddGroupModal: (boolean) => void;
  editCameraInCustomGroup: (
    customGroupId: string,
    typeOfAction: string
  ) => void;
}
