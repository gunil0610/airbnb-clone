"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { IconType } from "react-icons";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../common/utils";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: IconType;
}

const buttonVariants = cva(
  "relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full",
  {
    variants: {
      variant: {
        default: "bg-rose-500 border-rose-500 text-white",
        outline: "bg-white border-black text-black",
      },
      size: {
        default: "text-md py-3 font-semibold border-2",
        sm: "text-sm py-1 font-light border-[1px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, children, icon: Icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {Icon && <Icon size={24} className="absolute left-4 top-3" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
