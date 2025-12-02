import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";

/**
 * Props for `Header`.
 */
export type HeaderProps = SliceComponentProps<Content.HeaderSlice>;

/**
 * Component for "Header" Slices.
 */
const Header: FC<HeaderProps> = ({ slice }) => {
	return (
		<section
			className="bg-black relative  mt-4 flex w-full flex-col items-start justify-start gap-2 rounded xs:items-start md:mt-8  md:gap-8 "
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="flex items-center justify-center gap-2 pe-4 md:gap-8 md:pe-8">
				<Image
					alt="profile image of miguel"
					src="/miguel.jpg"
					sizes="100vw"
					width={64}
					height={64}
					className="hidden rounded-full xs:block"
				/>
				<div className="flex flex-col items-start justify-start gap-1 text-white">
					<h1 className=" bg-gradient-to-t from-shark-500 to-shark-900 bg-clip-text text-lg font-bold text-transparent  dark:from-shark-100 dark:to-shark-50 md:text-3xl ">
						{slice.primary.name}
					</h1>
					<p className="bg-gradient-to-l from-shark-600 to-shark-300 bg-clip-text text-base  font-thin text-transparent dark:from-base-300 dark:to-base-100/50 md:text-xl">
						{slice.primary.position}
					</p>
				</div>
			</div>
		</section>
	);
};

export default Header;

//
// 			{slice.primary.header_body}
// {slice.primary.last_updated}
//
