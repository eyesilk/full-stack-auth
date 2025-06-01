import { RefObject, useEffect, useRef, useState } from "react";

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const useOtpAnimate = (value: string, ms: number) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const isActiveAnimate = useRef<boolean>(true);
  const animationId = useRef<number>(0);

  const animate = async (
    isActiveAnimate: RefObject<boolean>,
    currentId: number,
  ): Promise<never | void> => {
    while (isActiveAnimate.current) {
      for (let i = 0; i < value.length; i++) {
        if (!isActiveAnimate.current || currentId !== animationId.current)
          return;

        if (value[i] !== "-") {
          setInputValue((prev) => prev + value[i]);
          setActiveSlot((prev) => prev + 1);
          await delay(ms);
        } else {
          setActiveSlot((prev) => prev - 1);
          setInputValue((prev) => prev.slice(0, -1));
          await delay(ms);
        }
      }
      setInputValue("");
      setActiveSlot(0);
    }
    await delay(ms);
  };

  useEffect(() => {
    const id: number = Date.now();
    isActiveAnimate.current = true;
    animationId.current = id;
    animate(isActiveAnimate, id);

    return () => {
      isActiveAnimate.current = false;
      animationId.current = -1;
      setInputValue("");
      setActiveSlot(0);
    };
  }, []);

  return { inputValue, activeSlot };
};
