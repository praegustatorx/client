import React, { createContext, useContext, useState, ReactNode } from "react";
import NotificationToast from "../components/NotificationToast/NotificationToast";
type ToastData = {
  title: string;
  message: string;
  duration?: number;
};

type ToastContextType = {
  showToast: (toast: ToastData) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useNotificationToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useNotificationToast must be used within ToastProvider");
  return context;
};

export const NotificationToastProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState<ToastData>({ title: "", message: "" });

  const showToast = (data: ToastData) => {
    setToast(data);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <NotificationToast
        visible={visible}
        title={toast.title}
        message={toast.message}
        duration={toast.duration}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
};
