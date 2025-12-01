import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavBar from "@/componets/Navbar";

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
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black bg-white dark:text-white text-black`}
			>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
