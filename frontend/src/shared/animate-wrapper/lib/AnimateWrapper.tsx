"use client";

import { PropsWithChildren, useEffect, useState } from "react";

export default function AnimateWrapper({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`w-full ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"} transition-all duration-800 ${className}`}
    >
      {children}
    </div>
  );
}
