"use client";

import Image from "next/image";
import { FC } from "react";

interface AvatarProps {}

const Avatar: FC<AvatarProps> = ({}) => {
  return (
    <div>
      <Image
        className="rounded-full"
        height={30}
        width={30}
        alt="Avatar"
        src="/images/placeholder.jpg"
      />
    </div>
  );
};

export default Avatar;
