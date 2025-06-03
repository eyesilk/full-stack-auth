"use client";

import { Alert, AlertDescription, AlertTitle } from "@/shared/alert";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { messageParser } from "@/shared/utils";

type Listener = Dispatch<SetStateAction<string>>;
let messageListener: Listener;
let errorListener: Listener;

export const alertStore = {
  setMessage(msg: string) {
    messageListener?.(msg);
    setTimeout(() => {
      messageListener?.("");
    }, 3000);
  },
  subscribeMessage(fn: Listener) {
    messageListener = fn;
  },
  setError(msg: string) {
    errorListener?.(msg);
    setTimeout(() => {
      errorListener?.("");
    }, 4000);
  },
  subscrireError(fn: Listener) {
    errorListener = fn;
  },
};

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    alertStore.subscribeMessage(setMessage);
    alertStore.subscrireError(setError);
  }, []);

  return (
    <>
      <AnimatePresence>
        {error.length > 0 && (
          <motion.div
            key="alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed right-1/2 top-4 z-50 w-fit translate-x-1/2"
          >
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{messageParser(error, 1)}.</AlertTitle>
              <AlertDescription>{messageParser(error, 2)}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {message.length > 0 && (
          <motion.div
            key="alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed right-1/2 top-4 z-50 w-fit translate-x-1/2"
          >
            <Alert>
              <CheckCircle2Icon />
              <AlertTitle>{messageParser(message, 1)}!</AlertTitle>
              <AlertDescription>{messageParser(message, 2)}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};
