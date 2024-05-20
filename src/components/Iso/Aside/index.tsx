import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { getIsoList } from "..";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const Aside = async ({ distro }: { distro: string }) => {
	const categoryData = await getIsoList();
	return (
		<aside className="col-span-8 md:col-span-1">
			<Accordion type="single" collapsible defaultValue="0">
				{Object.keys(categoryData)
					.sort((a, b) => a.localeCompare(b))
					.map((item, index) => (
						<AccordionItem value={index.toString()} key={index}>
							<AccordionTrigger>{item}</AccordionTrigger>
							<AccordionContent className="flex flex-col items-start">
								{categoryData[item]
									.sort((a, b) => a.distro.localeCompare(b.distro))
									.map((item, index) => (
										<Button key={`distro-${item}${index}`} variant="ghost">
											<Link href={`/downloads/${item.distro}`}>{item.distro}</Link>
										</Button>
								))}
							</AccordionContent>
						</AccordionItem>
				))}
			</Accordion>
		</aside>
	);
};

export const AsideSkeleton = () => {
	return (
		<aside className="col-span-8 md:col-span-1">
			<Accordion type="single">
				{Array.from({ length: 2 }).map((_, index) => (
					<AccordionItem value={`fallback${index}`} key={`fallback${index}`}>
						<AccordionTrigger>
							<Skeleton className="h-4 w-3/4" />
						</AccordionTrigger>
						<AccordionContent className="flex flex-col items-start">
							{Array.from({ length: 5 }).map((_, index) => (
								<Button key={index} variant="ghost">
									loading
								</Button>
							))}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</aside>
	);
};

export default Aside;
