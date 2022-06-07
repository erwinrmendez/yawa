/**
 * Hook to handle notification messages
 *
 */

import { useState } from "react";

export const useNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (newMessage: string, keep: boolean = false) => {
    setMessage(newMessage);

    // allow keeping message or hiding message automatically
    if (keep) {
      setTimeout(() => setIsVisible(true), 2000);
      return;
    }

    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 2000);
  };

  const hideMessage = () => {
    setIsVisible(false);
    setMessage("");
  };

  return { isVisible, message, showMessage, hideMessage };
};
