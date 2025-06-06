import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Daksh Sangal",
	description: "Daksh Sangal's Den",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="w-[100%] flex items-center justify-center min-h-[100vh]">
					<div className="w-[60%] pl-20 pr-20 min-h-[100vh]">
						<Nav />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
