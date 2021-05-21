interface ModalProps {
  children?: ReactNode;
  title?: string;
  closeable?: Boolean;
  reverse?: boolean;
  onClose: function;
  className?: string;
  isOpen?: Boolean;
  ariaHideApp?: boolean;
  onClose?: any;
  zIndex?: number;
}
