import Link from "next/link";
import React from "react";

const NewsCard = ({ data }) => {
	return (
		<div className='flex space-x-[12px] py-[20px] items-center  '>
			<img src={data?.img} />

			<div className='flex flex-col space-y-[8px]'>
				<h1 className='sf700 text-[1.5rem] leading-[20px] text-[#000000CC]'>
					{data?.name}
				</h1>
				<h2 className='text-[#00000061]  text-[1rem] sf400 leading-[20px]  '>
					{data?.text}
				</h2>
				<Link href={data?.href}>
					<h2 className='sf400 text-[14px] leadiing-[20px] text-[#3361FF] '>
						Read more &rarr;
					</h2>
				</Link>
			</div>
		</div>
	);
};

export default NewsCard;
