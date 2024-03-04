"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../ThemeSwitch";

const Links = ["now", "projects", "journel"];

export const NavBar = () => {
	const pathName = usePathname();
	const path = pathName.split("/")[1];

	return (
		<header className=" sticky top-0 inset-x-0 w-full max-w-[67.5rem] z-30 container mx-auto flex justify-between items-center px-4 border bg-base-100 border-base-300 rounded-full border-opacity-70 dark:border-opacity-20 dark:border-base-300 bg-opacity-25 dark:bg-neutral-900 dark:bg-opacity-50 filter backdrop-blur-sm ">
			<Link href="/">
				<figure className="hidden sm:block max-w-fit text-sm md:text-xl inset-8 dark:text-white capitalize font-semibold hover:text-accent dark:hover:text-secondary p-2 hover:border-opacity-100 duration-200 ease-out">
					&lt;toonchavez /&gt;
				</figure>
				<figure className="sm:hidden max-w-fit text-sm md:text-xl inset-8 dark:text-white capitalize font-semibold hover:text-accent dark:hover:text-secondary p-2 hover:border-opacity-100 duration-200 ease-out">
					&lt;t/&gt;
				</figure>
			</Link>
			<nav className="relative flex  justify-between items-center">
				<ul className=" gap-2  sm:gap-3 md:gap-4 items-center  flex flex-wrap">
					{Links.map((link) => (
						<Link href={link} key={link}>
							<code
								className={`max-w-fit text-sm md:text-base dark:text-base-300 md:px-4 border border-opacity-0 rounded py-1 border-primary  transition-all hover:dark:text-base-100 hover:text-base-300 hover:border-opacity-100 duration-200 ease-out  ${
									path === link ? "active text-primary dark:text-secondary" : ""
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
