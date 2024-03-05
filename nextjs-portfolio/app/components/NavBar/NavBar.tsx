"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../ThemeSwitch";

const Links = ["now", "projects", "journel"];

export const NavBar = () => {
	const pathName = usePathname();
	const path = pathName.split("/")[1];

	return (
		<header className=" sticky top-0 inset-x-0 w-full max-w-[67.5rem] z-30 container mx-auto flex justify-between items-center px-4 border-b  border-asphalt-500/50 dark:border-asphalt-500/15 bg-opacity-25 dark:bg-neutral-900  dark:bg-opacity-10  filter backdrop-blur-sm ">
			<Link href="/">
				<figure className="hidden sm:block max-w-fit text-sm md:text-xl inset-8 dark:text-asphalt-50 capitalize font-semibold hover:text-primary dark:hover:text-accent p-2 hover:border-opacity-100 duration-200 ease-out">
					&lt;toonchavez /&gt;
				</figure>
				<figure className="sm:hidden max-w-fit text-sm md:text-xl inset-8 dark:text-asphalt-50 capitalize font-semibold hover:text-accent dark:hover:text-secondary p-2 hover:border-opacity-100 duration-200 ease-out">
					&lt;t/&gt;
				</figure>
			</Link>
			<nav className="relative flex  justify-between items-center">
				<ul className=" gap-2  sm:gap-3 md:gap-4 items-center  flex flex-wrap">
					{Links.map((link) => (
						<Link href={link} key={link}>
							<code
								className={`max-w-fit text-sm md:text-base dark:text-base-300 md:px-4 border border-opacity-0 rounded-full py-1 border-primary  transition-all hover:dark:text-base-100 hover:text-asphalt-600 dark:hover:border-opacity-25 hover:border-opacity-75 duration-200 ease-out dark:hover:text-asphalt-100 ${
									path === link
										? "active text-asphalt-400 dark:text-asphalt-900"
										: ""
								}`}
							>
								{path === link ? ">" : "/"}
								{link}
							</code>
						</Link>
					))}
					<button className="hover:text-accent">
						<ThemeSwitch />
					</button>
				</ul>
			</nav>
		</header>
	);
};
