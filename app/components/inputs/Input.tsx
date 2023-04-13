import { InputHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/app/common/utils";
import { BiDollar } from "react-icons/bi";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  id: string;
  label: string;
  formatPrice?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}

const inputVariants = cva(
  "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed",
  {
    variants: {
      format: {
        default: "pl-4",
        price: "pl-9",
      },
      border: {
        default: "border-neutral-300 focus:border-black",
        error: "border-rose-500 focus:border-rose-500",
      },
    },
    defaultVariants: {
      format: "default",
      border: "default",
    },
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      formatPrice,
      error,
      required = false,
      className,
      format,
      border,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full relative">
        {formatPrice && (
          <BiDollar
            size={24}
            className="text-neutral-700 absolute left-2 top-5"
          />
        )}
        <input
          className={cn(
            inputVariants({
              format,
              border: error ? "error" : "default",
              className,
            })
          )}
          placeholder=" "
          ref={ref}
          {...props}
        />
        <label
          className={`
            absolute 
            text-md 
            duration-150 
            transform 
            -translate-y-3 
            top-5 
            z-10 
            origin-[0]
            ${formatPrice ? "left-9" : "left-4"} 
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 
            peer-focus:-translate-y-4
            ${error ? "text-rose-500" : "text-zinc-400"}
          `}
        >
          {label}
        </label>
        {error && (
          <p className="mt-0.5 ml-1 text-rose-500">{String(error.message)}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
