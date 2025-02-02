import { cn } from "@/lib/utils";
import React from "react";

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  onClick?: (value: Variant["value"]) => void;
  value?: Variant["value"];
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({
  className,
  items,
  value,
  onClick,
}) => {
  return (
    <div
      className={cn(
        className,
        "flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none",
      )}
    >
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            "flex items-center px-10 justify-center flex-1 rounded-3xl h-[40px] transition-all duration-400 text-sm",
            {
              "bg-white shadow": value === item.value,
              "text-grey-500 opacity-500 pointer-events-none": item.disabled,
            },
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
