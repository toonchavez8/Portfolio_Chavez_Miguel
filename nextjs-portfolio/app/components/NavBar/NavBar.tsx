"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Links = ["now", "projects", "journel"];

export const NavBar = () => {
	const pathName = usePathname();
	const path = pathName.split("/")[1];

	return (
		<header className="absolute inset-x-0 w-full max-w-[67.5rem] z-30 container mx-auto flex justify-between items-center px-4">
			<Link href="/">
				<figure className="btn btn-ghost max-w-fit md:text-xl inset-8 text-white capitalize font-semibold">
					&lt;toonchavez /&gt;
				</figure>
			</Link>
			<nav>
				<ul className="flex gap-4">
					{Links.map((link) => (
						<Link href={link} key={link}>
							<code
								className={`max-w-fit md:text-base font-light px-4 border border-opacity-0 rounded py-1 border-accent  transition-all hover:text-slate-100 hover:border-opacity-100 duration-200 ease-out ${
									path === link ? "active text-accent" : ""
								}`}
							>
								{path === link ? ">" : "/"}
								{link}
							</code>
						</Link>
					))}
				</ul>
			</nav>
		</header>
	);
};
