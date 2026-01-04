import { Geist, Geist_Mono } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";

import NavBar from "@/componets/Navbar";
import { BackGroundSquares } from "@/componets/Atomic/BackGround";
import { Providers } from "./Utils/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="relative" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} group relative isolate min-h-screen bg-base-200 px-4 pt-4 text-neutral antialiased filter dark:bg-neutral dark:text-base-100`}
			>
				<Providers>
					<PrismicPreview repositoryName={repositoryName} />
					<NavBar />
					{children}

					<BackGroundSquares />
				</Providers>
			</body>
		</html>
	);
}
