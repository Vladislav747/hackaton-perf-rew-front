interface EditCustomGroupModalProps {
  closeEditGroupModal: (boolean) => void;
  editPersonalGroupForUser: (string) => void;
  showEditGroupModalStatus: boolean;
  currentEditName: string;
  camsForPersonalGroup: Array;
  deleteCamListEditMode: (number) => void;
}