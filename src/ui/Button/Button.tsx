import * as React from "react";
import { twMerge } from "tailwind-merge";

const buttonBase =
  "inline-flex items-center justify-center gap-[8px] min-w-[48px] h-[48px] px-[16px] rounded-[6px] font-bold text-[16px] leading-none select-none touch-manipulation transition-all duration-150 ease-out cursor-pointer border-[3px] border-t-white/95 border-l-white/80 border-b-gray-600 border-r-gray-600 bg-gradient-to-b from-gray-50 to-gray-200 text-gray-800 shadow-[0_3px_0_0_#4b5563]  hover:-translate-y-[2px] hover:shadow-[0_4px_0_0_#4b5563] active:translate-y-[3px] active:shadow-none active:border-t-gray-500 active:border-l-gray-500 active:border-b-white/50 active:border-r-white/30 focus:outline-none focus-visible:ring-[2px] focus-visible:ring-gray-400 focus-visible:ring-offset-[2px] disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_3px_0_0_#4b5563] disabled:active:translate-y-0 disabled:active:shadow-[0_3px_0_0_#4b5563]";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={twMerge(buttonBase, className)}
      {...props}
    >
      {children}
    </button>
  )
);
