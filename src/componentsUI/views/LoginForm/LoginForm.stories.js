import React from "react";
import LoginForm from "./LoginForm";
import { action } from "@storybook/addon-actions";

export default { title: "LoginForm", component: LoginForm };

export const Default = () => (
  <LoginForm handleSubmit={action("handleSubmit")} />
);

export const Error = () => (
  <LoginForm
    errorMsg="Test Error Message"
    handleSubmit={action("handleSubmit")}
  />
);

export const InProgress = () => (
  <LoginForm authInProgress={true} handleSubmit={action("handleSubmit")} />
);
