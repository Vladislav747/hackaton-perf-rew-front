import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ToastPortal from "../../../componentsUI/views/ToastPortal";

const ToastNotification = () => {
  return (
    <ToastPortal>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 99999 }}
      />
    </ToastPortal>
  );
};

export default ToastNotification;
