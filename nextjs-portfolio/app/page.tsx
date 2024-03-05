import Hero from "./components/hero";
export default function Home() {
	return (
		<main className=" overflow-hidden  w-full max-w-[67.5rem] mx-auto relative flex flex-col items-center">
			<Hero title="Miguel Chavez" sub="Full Stack Developer" />
		</main>
	);
}
