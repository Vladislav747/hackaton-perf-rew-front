interface WarningModalProps {
  openWarningModal: boolean;
  closeWarningModal: (status: boolean) => void;
  deleteAllCamerasFlag: (boolean) => void;
}
