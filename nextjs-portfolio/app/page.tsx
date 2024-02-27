import { Boxes } from "./components/ui/Background-Boxes";
import { cn } from "./utils/cn";
import { FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Home() {
	return (
		<main className="min-h-screen overflow-hidden  relative flex flex-col items-center justify-center p-24">
			<div className="absolute overflow-hidden max-h-screen inset-0 w-full h-full bg-neutral-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
			<Boxes />
			{/* Content */}
			<div className="relative z-20 text-center prose flex flex-col gap-4 items-center justify-center bg-base-100 rounded-lg p-6 pt-8 filter backdrop-blur-sm bg-opacity-5 border border-slate-500	 border-opacity-20">
				<h1 className={cn("md:text-4xl text-xl text-white font-bold ")}>
					Portfolio currently under construction
				</h1>
				<p className="text-neutral-300 mt-2">
					Please excuse the dust as i make improvements.
				</p>
				<div className="flex gap-2">
					<a href="https://nextjs.org/" className="">
						<code className="text-neutral-300 gap-2 badge  badge-neutral px-4 py-3">
							<RiInstagramFill />
							toonchavez8
						</code>
					</a>{" "}
					<a href="https://github.com/toonchavez8" className="">
						<code className="text-neutral-300 badge gap-2 badge-neutral px-4 py-3">
							<FaGithub />
							toonchavez8
						</code>
					</a>
				</div>
				<span className="loading loading-infinity loading-lg"></span>
			</div>
		</main>
	);
}
