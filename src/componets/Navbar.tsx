"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeSwitch from "@/componets/Atomic/ThemeSwitch";
import { createClient } from "../prismicio";

interface NavLink {
	name: string;
	href: string;
}

interface PrismicLinkField {
	url?: string;
	text?: string;
	link_type?: string;
}

export const NavBar = () => {
	const pathName = usePathname();
	const path = pathName.split("/")[1];
	const [navLinks, setNavLinks] = useState<NavLink[]>([]);
	const [siteName, setSiteName] = useState("toonchavez");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const client = createClient();
				const settings = await client.getSingle("settings");

				// Extract site name
				if (settings.data.site_name) {
					setSiteName(settings.data.site_name);
				}

				// Extract navigation links
				if (settings.data.navigation?.length > 0) {
					const navigationGroup = settings.data.navigation[0];

					// Extract nav links from the repeatable nav_link field
					if (
						navigationGroup?.nav_link &&
						Array.isArray(navigationGroup.nav_link)
					) {
						const links: NavLink[] = navigationGroup.nav_link
							.filter((link: PrismicLinkField) => link.url && link.text)
							.map((link: PrismicLinkField) => ({
								name: link.text?.toLowerCase() || "",
								href: link.url || "",
							}));
						setNavLinks(links);
					}
				}
			} catch (error) {
				console.error("Error fetching settings:", error);
				// Fallback to default links if Prismic fails
				setNavLinks([
					{ name: "now", href: "/now" },
					{ name: "projects", href: "/projects" },
					{ name: "journal", href: "/journal" },
				]);
			} finally {
				setLoading(false);
			}
		};

		fetchSettings();
	}, []);

	if (loading) {
		return (
			<header className="sticky inset-x-0 top-0 z-30 mx-auto flex w-11/12 items-center justify-between border-b border-neutral-600/50 bg-opacity-25 px-4 filter  dark:border-neutral-300/15  bg-transparent  md:w-10/12 lg:w-7/12 animate-pulse">
				<div className="animate-pulse">Loading...</div>
			</header>
		);
	}

	return (
		<header className="sticky inset-x-0 top-0 z-30 mx-auto flex w-11/12 items-center justify-between border-b border-neutral-600/50 bg-opacity-25 px-4 filter dark:border-neutral-300/15  bg-transparent  debug md:w-10/12 lg:w-7/12">
			<Link href="/" aria-label="go to home page">
				<figure className="inset-8 hidden max-w-fit p-2 text-sm font-semibold capitalize duration-200 ease-out hover:border-opacity-100 hover:text-neutral-500 dark:text-base-100 dark:hover:text-accent sm:block md:text-xl">
					&lt;{siteName} /&gt;
				</figure>
				<figure className="inset-8 max-w-fit p-2 text-sm font-semibold capitalize duration-200 ease-out hover:border-opacity-100 hover:text-accent dark:text-neutral-500 dark:hover:text-secondary sm:hidden md:text-xl">
					&lt;{siteName.substring(0, 1)}/&gt;
				</figure>
			</Link>
			<a href="#main" className="sr-only">
				Skip to main content
			</a>
			<nav className="relative flex items-center justify-between gap-3">
				<ul className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
					{navLinks.map((link) => (
						<Link href={link.href} key={link.name}>
							<code
								className={`max-w-fit rounded-full border border-neutral-500/0 py-1 text-sm transition-all duration-200 ease-out hover:border-neutral-500/60 hover:text-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-200/40 dark:hover:text-neutral-50 md:px-4 md:text-base ${
									path === link.name
										? "active text-neutral-900 dark:text-neutral-50"
										: ""
								}`}
							>
								{path === link.name ? ">" : "/"}
								{link.name}
							</code>
						</Link>
					))}
				</ul>
				<ThemeSwitch />
			</nav>
		</header>
	);
};

export default NavBar;
