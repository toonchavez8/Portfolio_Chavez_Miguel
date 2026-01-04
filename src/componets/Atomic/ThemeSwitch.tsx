"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import Image from "next/image";

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<Image
				src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
				width={24}
				height={24}
				sizes="24x24"
				alt="Loading theme toggle"
				priority={false}
				title="Loading theme toggle"
				className="inline-block"
			/>
		);
	}

	if (resolvedTheme === "dark") {
		return (
			<button
				type="button"
				aria-label="Switch to light mode"
				className="ml-3 text-neutral-400 hover:text-neutral-100 transition-colors"
				onClick={() => setTheme("light")}
			>
				<FiSun size={18} />
			</button>
		);
	}

	if (resolvedTheme === "light") {
		return (
			<button
				type="button"
				aria-label="Switch to dark mode"
				className="ml-3 text-neutral-600 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-50 transition-colors"
				onClick={() => setTheme("dark")}
			>
				<FiMoon size={18} />
			</button>
		);
	}

	// Fallback if theme is not yet resolved
	return null;
}
