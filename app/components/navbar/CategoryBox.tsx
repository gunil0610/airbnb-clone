"use client";

import React, { FC, useCallback } from "react";
import { IconType } from "react-icons";
import { cva } from "class-variance-authority";
import { cn } from "@/app/common/utils";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const categoryBoxVariants = cva(
  "flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-transparent text-neutral-500",
        selected: "border-b-neutral-800 text-neutral-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const CategoryBox: FC<CategoryBoxProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label.toLowerCase(),
    };

    if (params?.get("category") === label.toLowerCase()) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      className={cn(
        categoryBoxVariants({ variant: selected ? "selected" : "default" })
      )}
      onClick={handleClick}
    >
      <Icon size={26} />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};

export default CategoryBox;
