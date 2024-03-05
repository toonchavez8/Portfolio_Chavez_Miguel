import { FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";

const footerLinks = [
	{
		name: "instagram",
		url: "https://www.instagram.com/toonchavez/",
		icon: <RiInstagramFill />,
		text: "toonchavez",
	},
	{
		name: "github",
		url: "https://github.com/toonchavez8",
		icon: <FaGithub />,
		text: "toonchavez8",
	},
	{
		name: "linkedin",
		url: "https://www.linkedin.com/in/toonchavez8/",
		icon: <FaLinkedin />,
		text: "toonchavez",
	},
];

export const Footer = () => {
	return (
		<footer className="mx-auto font-bold text-2xl flex flex-col justify-center items-center border-t border-asphalt-500/50 dark:border-asphalt-500/15 py-4 w-full max-w-[67.5rem]">
			<div className="flex  justify-center gap-2">
				{footerLinks.map((link) => (
					<a href={`${link.url}`} key={link.name}>
						<code className="text-neutral dark:text-base-200 bg-transparent dark:border-base-300 dark:border-opacity-10 gap-2 badge  badge-neutral px-4 py-3 hover:bg-neutral hover:bg-opacity-25 dark:hover:bg-base-300 dark:hover:bg-opacity-10">
							{link.icon}
							{link.text}
						</code>
					</a>
				))}
			</div>
			<p className="tracking-widest">...</p>
		</footer>
	);
};
