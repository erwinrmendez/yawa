import { createContext, useContext, useState } from "react";

interface INotification {
  show: boolean;
  message: string;
  showMessage: (newMessage: string) => void;
  hideMessage: () => void;
}

const NotificationContext = createContext<INotification | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw Error("Cannot use NotificationContext outside its provider.");
  }

  return context;
};

const NotificationProvider = ({ children }: any) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (newMessage: string) => {
    setMessage(newMessage);
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };

  const hideMessage = () => setShow(false);

  return (
    <NotificationContext.Provider
      value={{ show, message, showMessage, hideMessage }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
