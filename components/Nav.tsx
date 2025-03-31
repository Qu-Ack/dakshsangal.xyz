import Link from "next/link";

export default function Nav() {
	return (
		<div className="flex p-3 justify-between items-center w-[100%] min-h-[8vh]">
			<ul className="flex gap-3">
				<li>
					<Link href={"/"} className="link">
						Daksh Sangal
					</Link>
				</li>
				<li>
					<Link
						href={"https://www.linkedin.com/in/daksh-sangal-529b10243/"}
						className="link"
					>
						Linkedin
					</Link>
				</li>
				<li>
					<Link href={"https://www.github.com/Qu-Ack"} className="link">
						Github
					</Link>
				</li>
			</ul>
			<ul className="flex gap-3">
				<li>
					<Link href={"/blogs"} className="link">
						Blogs
					</Link>
				</li>
				<li>
					<Link href={"/projects"} className="link">
						Projects
					</Link>
				</li>
				<li>
					<Link href={"/projects"} className="link">
						Resume
					</Link>
				</li>
			</ul>
		</div>
	);
}
