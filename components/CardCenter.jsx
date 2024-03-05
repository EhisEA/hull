import Link from "next/link";
import React from "react";

const CardCenter = ({ href, header, subHeader, img }) => {
	return (
		<div className='px-[1rem] flex items-center flex-col justify-center pb-[1.5rem] border border-transparent border-b-[#DFE0E7]'>
			<img src={img} className='rounded-t-[12px] h-[180px]' />
			<div className='flex flex-col space-y-[0.75rem] px-[3rem] pt-[2rem]'>
				<h1 className='sf700 text-[20px] leading-[24px] tracking-[-0.64px] text-center'>
					{header}
				</h1>
				<h2 className='inter400 text-[14px] leadingx-[21px] text-center'>
					{" "}
					{subHeader}{" "}
				</h2>
			</div>
			<Link
				href={href}
				className='sf400 text-[1rem] leading-[1.5rem] text-[#3361FF] mt-[0.5rem]'
			>
				Learn More &rarr;
			</Link>
		</div>
	);
};

export default CardCenter;
