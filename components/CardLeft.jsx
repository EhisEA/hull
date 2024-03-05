import Link from "next/link";
import React from "react";

const CardLeft = ({ href, header, subHeader, img }) => {
	return (
		<div className='px-[1rem] flex items-start flex-col justify-center pb-[1.5rem] border border-transparent border-b-[#DFE0E7]'>
			<img src={img} className=' h-[180px]' />
			<div className='flex flex-col space-y-[0.75rem]  pt-[2rem]'>
				<h1 className='sf700 text-[20px] leading-[24px] tracking-[-0.64px] text-left'>
					{header}
				</h1>
				<h2 className='inter400 text-[14px] leadingx-[21px] text-left'>
					{" "}
					{subHeader}{" "}
				</h2>
			</div>
			<Link
				href={href}
				className='sf400 text-[1rem] leading-[1.5rem] text-[#3361FF] mt-[0.5rem]'
			>
				Read More &rarr;
			</Link>
		</div>
	);
};

export default CardLeft;
