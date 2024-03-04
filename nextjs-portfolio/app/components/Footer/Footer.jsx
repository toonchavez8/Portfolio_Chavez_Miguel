import { FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export const Footer = () => {
	return (
		<footer className="mx-auto font-bold text-2xl text-center">
			<div className="flex gap-2">
				<a href="https://www.instagram.com/toonchavez/" className="">
					<code className="text-neutral dark:text-base-200 bg-transparent dark:border-base-300 dark:border-opacity-10 gap-2 badge  badge-neutral px-4 py-3">
						<RiInstagramFill />
						toonchavez8
					</code>
				</a>{" "}
				<a href="https://github.com/toonchavez8" className="">
					<code className="text-neutral dark:text-base-200 bg-transparent dark:border-base-300 dark:border-opacity-10 gap-2 badge  badge-neutral px-4 py-3">
						<FaGithub />
						toonchavez8
					</code>
				</a>
			</div>
			<p>...</p>
		</footer>
	);
};
