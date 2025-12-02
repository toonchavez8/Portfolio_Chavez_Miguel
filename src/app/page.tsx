import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
	const client = createClient();
	const page = await client.getSingle("homepage").catch(() => notFound());

	return (
		<main className="relative mx-auto flex w-11/12  flex-col items-center   p-4 md:w-10/12 md:gap-8   lg:w-7/12 debug">
			<SliceZone slices={page.data.slices} components={components} />
		</main>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client.getSingle("homepage").catch(() => notFound());

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
		openGraph: {
			images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
		},
	};
}
