import { RefObject, useEffect, useRef, useState } from "react";

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const useOtpAnimate = (value: string, ms: number) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const isActiveAnimate = useRef<boolean>(true);

  const animate = async (
    isActiveAnimate: RefObject<boolean>,
  ): Promise<never | void> => {
    while (isActiveAnimate.current) {
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== "-") {
          setInputValue((prev) => prev + value[i]);
          setActiveSlot((prev) => prev + 1);
        } else {
          setInputValue((prev) => prev.slice(0, -1));
          setActiveSlot((prev) => prev - 1);
        }
        await delay(ms);
      }
      setInputValue("");
      setActiveSlot(0);
    }
    await delay(ms);
  };

  useEffect(() => {
    isActiveAnimate.current = true;
    animate(isActiveAnimate);

    return () => {
      isActiveAnimate.current = false;
    };
  }, [value]);

  return { inputValue, activeSlot };
};
