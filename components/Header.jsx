"use client";
import { headerRound } from "../svgs";
import React, { useState } from "react";
import Btn from "./Btn";
import HeaderDropDown from "./HeaderDropDown";
import { headerDrop } from "../data";
import Link from "next/link";

const Header = () => {
	const [selectedHeader, setSelectedHeader] = useState("");


	const dropData = headerDrop();

	return (
		<div className="hidden lg:block w-full px-[3.75rem] pt-[1rem]">
			<div className="flex flex-col w-full">
				<Link className="self-end" href="/signin">
					<Btn text="Sign in" />
				</Link>
				<Link
					href="/"
					className="flex text-center font-bold flex-col space-y-[10px] mx-auto -translate-y-4"
				>
					<img alt="" className="self-center w-[100px] h-[90px]" src="/images/logo.svg" />
					<h2 className="sf600 text-[18px] leading-[12px] uppercase text-[#68768C]">
						Regulatory IMPLEMentation & compliance scheme
					</h2>
					<div className="text-[#1B7339] space-y-[10px]">
						<h2 className="sf600 text-[18px] leading-[12px] uppercase">
							OCCUPATIONAL SAFETY & HEALTH DEPARTMENT
						</h2>
						<h2 className="sf600 text-[18px] leading-[12px] uppercase">
							FEDERAL MINISTRY OF LABOUR & EMPLOYMENT
						</h2>
					</div>
				</Link>

			</div>

			<div className='mt-[3rem] flex space-x-[2rem] justify-center w-full'>
				{dropData?.map((drop, i) => (
					<HeaderDropDown
						header={drop.header}
						drop={drop.drop}
						key={i}
						href={drop.href}
						selectedHeader={selectedHeader}
						setSelectedHeader={setSelectedHeader}
					/>
				))}
			</div>
		</div>
	);
};

export default Header;
