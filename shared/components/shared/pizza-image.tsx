import { cn } from "@/lib/utils";
import { FC } from "react";

interface PizzaImageProps {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export const PizzaImage: FC<PizzaImageProps> = ({
  className,
  imageUrl,
  size,
}) => {
  return (
    <div
      className={cn("flex items-center justify-center relative w-full h-full min-w-[500px]")}
    >
      <img
        src={imageUrl}
        alt="Pizza"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duraction-400",
          {
            "w-[300px] h-[300px]": size === 20,
            "w-[400px] h-[400px]": size === 30,
            "w-[500px] h-[500px]": size === 40,
          },
        )}
      />
      <div className='absolute left-1/2 top-1/2 rounded-full -translate-x-1/2  -translate-y-1/2 border-dashed w-[450px] h-[450px] border-gray-200 border-2'/>
      <div className='absolute left-1/2 top-1/2 rounded-full -translate-x-1/2  -translate-y-1/2 border-dashed w-[370px] h-[370px] border-gray-200 border-2'/>

    </div>
  );
};
