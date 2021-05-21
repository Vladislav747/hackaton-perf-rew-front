import { createPortal } from "react-dom";

const ToastPortal = ({ children }: any) => {
  // Find our portal container in the DOM
  //@ts-ignore
  const portalRoot: HTMLElement = document.getElementById("portal-root");

  /** Данная конструкция нужна исключительно при тестировании юнит тестов - не убирать */
  const toastContainer: any = portalRoot
    ? document.getElementById("portal-root")
    : document.createElement("div");

  return createPortal(children, toastContainer);
};

export default ToastPortal;
