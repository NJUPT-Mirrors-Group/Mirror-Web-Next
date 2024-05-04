"use client";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setShow(true);
			} else {
				setShow(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Button
			onClick={() => {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}}
			style={{
				visibility: show ? "visible" : "hidden",
				transition: "visibility 0s linear 0.3s",
			}}
			className="fixed bottom-4 right-4"
		>
			<ArrowUp />
		</Button>
	);
}
