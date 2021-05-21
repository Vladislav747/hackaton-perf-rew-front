import { toast } from "react-toastify";
import LoaderForNotification from "../../UIKit/atoms/LoaderForNotification";

//Для сообщения Toast об ошибке
export const notifyError = (text: string) => toast.error(text);

//Для сообщения Toast об ожидании инфо
export const notifyInfo = (text: string) => toast.info(text);

//Для сообщения Toast о предупреждении
export const notifyWarn = (text: string) => toast.warn(text);

//Для сообщения Toast об успешном выполнении чего то
export const notifySuccess = (text: string) => toast.success(text);

//Для сообщения Toast об ожидании инфо
export const notifyLoadInfo = () => toast.info(LoaderForNotification, { hideProgressBar: false, autoClose: false });

//Для сообщения Toast об ожидании инфо
export const notifyDismiss = () => toast.dismiss();