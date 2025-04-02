"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CMS({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	useEffect(() => {
		function getSesToken() {
			const sesId = localStorage.getItem("sesId");
			if (!sesId) {
				router.push("/login");
				return;
			}
		}

		getSesToken();
	}, [router]);

	return (
		<div className="w-[100%] min-h-[70vh] border-t-yellow-300 border-t p-3 mt-10 flex flex-col gap-12">
			<CMSNavigator></CMSNavigator>
			{children}
		</div>
	);
}

function CMSNavigator() {
	return (
		<div className="w-[100%] flex gap-12">
			<Link href="/cms/blogs" className="link">
				cms-blogs
			</Link>
			<Link href={"/cms/drafts"} className="link">
				cms-drafts
			</Link>
		</div>
	);
}
