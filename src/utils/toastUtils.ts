import { toast } from "react-toastify";

export const showToast = (
  message: string,
  type: "error" | "success" | "info"
): void => {
  switch (type) {
    case "error":
      toast.error(message, { theme: "colored" });
      break;
    case "success":
      toast.success(message, { theme: "colored" });
      break;
    case "info":
      toast.info(message, { theme: "colored" });
      break;
  }
};

export const showErrorToast = (message: string): void => {
  showToast(message, "error");
};

export const showSuccessToast = (message: string): void => {
  showToast(message, "success");
};
