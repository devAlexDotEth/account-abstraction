import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import sweyda from "@public/sweyda.svg";
import { accountAbstraction, client } from "./constants";
import Link from "next/link";

export default function Home() {
	return (
		<div className="py-20">
			<Header />

			<div className="flex justify-center mb-20">
				<ConnectButton
					client={client}
					//accountAbstraction={accountAbstraction}
				/>
			</div>

			<Menu />

			<Footer />
		</div>
	);
}

function Header() {
	return (
		<header className="flex flex-col items-center mb-20 md:mb-20">
			<Image
				src={sweyda}
				alt=""
				width={120}
				style={{
					filter: "drop-shadow(0px 0px 24px #a726a9a8)",
				}}
			/>

			<h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
				SWEYDA • {" "}
				<a
					className="text-purple-400"
					target="_blank"
					href="https://x.com/AlexDotEth"
				>
					Jared Mirabile
				</a>
			</h1>

			<p className="text-zinc-300 text-base">
				Powered by{" "}
				<a
					className="text-purple-400"
					target="_blank"
					href="https://bearified.xyz"
				>
					BearifiedXYZ
				</a>
				.
			</p>
		</header>
	);
}

function Menu() {
	return (
		<div className="grid gap-4 lg:grid-cols-3 justify-center">
			<MenuItem
				title="Phase 1: Genesis Drop"
				href="/genesis"
				description="Tiger Stirke | Cyber Kitty | Oni Warrior | Love of Money | Ronin Boss"
			/>

			<MenuItem
				title="Phase 2: We are Tigers (Phase 1 Demo Option 2)"
				href="/tigers"
				description="Generative Art Digital Collectibles representing the Tiger Spirit"
			/>

			<MenuItem
				title="Phase 3: TBD"
				href="/"
				description="Coming Soon..."
			/>

			<MenuItem
				title="Rewards"
				href="/"
				description="End of Q1 2025..."
			/>
		</div>
	);
}

function MenuItem(props: { title: string; href: string; description: string }) {
	return (
		<Link
			href={props.href}
			className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
		>
			<article>
				<h2 className="text-lg font-semibold mb-2">{props.title}</h2>
				<p className="text-sm text-zinc-400">{props.description}</p>
			</article>
		</Link>
	);
}

function Footer() {
	return (
		<div className="flex flex-col items-center mt-20">
			<Link
				className="text-center text-sm text-gray-400"
				target="_blank"
				href="https://github.com/devAlexDotEth/account-abstraction"
			>
				View code on GitHub
			</Link>
		</div>
	);
}
