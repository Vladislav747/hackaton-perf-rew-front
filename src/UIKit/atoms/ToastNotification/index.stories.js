import React from "react";
import { storiesOf } from "@storybook/react";
import ToastNotification from "./index";

storiesOf("UIKit/atoms/ToastNotification", module)
  .add("ToastNotification success", () => {
    return <ToastNotification />;
  })
  .add("ToastNotification warn", () => {
    return <ToastNotification />;
  })
  .add("ToastNotification error", () => {
    return <ToastNotification />;
  })
  .add("ToastNotification info", () => {
    return <ToastNotification />;
  });
