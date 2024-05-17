import { Signpost } from "lucide-react";

export default function NoticeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="w-full">
			<div className=" mx-auto max-w-7xl p-6 w-full">
				{children}
			</div>
		</main>
	);
}
