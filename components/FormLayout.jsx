"use client";
import { XIcon } from "@/svgs";
import { useRouter } from "next/navigation";
import React from "react";

const FormLayout = ({ handleClick, children }) => {

  const router = useRouter();

  return (
    <div className="bg-[#FAFAFA] relative ">
      <div
        className="absolute top-[2.5rem] right-[4rem] z-[100] cursor-pointer"
        onClick={()=> router.back()}
      >
        {XIcon}
      </div>

      <div className="h-screen overflow-auto scroll-hidden flex items-center justify-center py-[2rem] ">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
