import Hero from "./components/hero";
export default function Home() {
  return (
    <main className="relative mx-auto flex w-full max-w-[67.5rem] flex-col  items-center overflow-hidden p-4 pt-2 ">
      <Hero title="Miguel Chavez" sub="Full Stack Developer" />
    </main>
  );
}
