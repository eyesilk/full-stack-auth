import { cn } from "@/shared/utils";
import * as React from "react";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input"> & {}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "text-white bg-[#1d1d1d] font-medium file:text-foreground placeholder:text-muted-foreground md:placeholder:text-sm placeholder:text-xs selection:bg-(--shamrock) selection:text-[#1d1d1d] dark:bg-input/30 border-[#393939] flex md:h-10 h-9 w-full min-w-0 rounded-sm border px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-xs",
        "focus-visible:border-ring/40 focus-visible:ring-[#1d1d1d] focus-visible:ring-[2px]",
        "aria-invalid:ring-[#7f2315]/30 dark:aria-invalid:ring-[#7f2315] aria-invalid:border-[#7f2315] aria-invalid:bg-[#1d1412] aria-invalid:placeholder:text-[#7f2315] aria-invalid:text-[#e5484d]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
