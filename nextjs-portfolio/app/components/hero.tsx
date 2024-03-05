import React from "react";
import Image from "next/image";

interface HeroProps {
	title: string;
	sub: string;
}

const Hero = (props: HeroProps) => {
	return (
		<section className="flex flex-col p-2 w-full justify-start items-start ">
			<div className="flex gap-2 md:gap-8 items-center justify-center  pe-4 md:pe-8">
				<Image
					alt="profile image of miguel"
					src="/miguel.jpg"
					sizes="100vw"
					width={64}
					height={64}
					className="rounded-full"
				/>
				<div>
					<h1> {props.title} </h1>
					<p>{props.sub}</p>
				</div>
			</div>
		</section>
	);
};

export default Hero;
