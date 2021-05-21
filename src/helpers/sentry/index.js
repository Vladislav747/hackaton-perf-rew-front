import { captureMessage } from "@sentry/browser";

/**
 *
 * @param {*} error - сообщение об ошибке
 * @param {*} extra
 * @param {*} onlyForDevelopment - Выводить ошибку исключительно только для development среды
 */
const sendErrorToSentry = (error, extra = null, onlyForDevelopment = false) => {
  if (process.env.NODE_ENV === "production" && !onlyForDevelopment) {
    captureMessage(error, { extra: extra });
  }

  if (process.env.NODE_ENV === "development") {
    console.error(error, { extra: extra });
  }
};

export default sendErrorToSentry;
