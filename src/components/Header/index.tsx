"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRight, Menu } from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

const Header = () => {
	return (
		<div className="z-50 w-screen h-[72px] fixed top-0 bg-[#ffffff7a] backdrop-blur-lg shadow-sm flex justify-between items-center">
			<div className="md:mx-auto w-full flex gap-3 max-w-7xl">
				<Link href="/">
					<div className="flex items-center gap-3 p-5">
						<Image src="/logo-small.png" alt="logo" width={30} height={30} />
						<h1 className="text-lg font-bold hidden md:block">
							南京邮电大学开源软件镜像站
						</h1>
					</div>
				</Link>
				<div className="md:flex gap-3 items-center text-gray-400 *:transition-all hidden">
					<Link href="/" className="hover:text-gray-700">
						镜像列表
					</Link>
					<Link href="/downloads" className="hover:text-gray-700">
						软件下载
					</Link>
					<Link href="/content/notice" className="hover:text-gray-700">
						公告
					</Link>
				</div>
			</div>
			<Drawer>
				<DrawerTrigger className="md:hidden" asChild>
					<Button variant="ghost" className="mr-3">
						<Menu />
					</Button>
				</DrawerTrigger>
				<DrawerContent className="h-[90vh]">
					<DrawerHeader className="pt-8">
						<DrawerTitle className="text-left px-4">菜单</DrawerTitle>
						<DrawerDescription className="pt-4">
							<DrawerClose asChild>
								<Link href="/" className="hover:text-gray-700">
									<Button variant="ghost" className="w-full justify-between">
										<div className="flex items-center">镜像列表</div>
										<ChevronRight className="opacity-70" />
									</Button>
								</Link>
							</DrawerClose>
							<DrawerClose asChild>
								<Link href="/downloads" className="hover:text-gray-700">
									<Button variant="ghost" className="w-full justify-between">
										<div className="flex items-center">软件下载</div>
										<ChevronRight className="opacity-70" />
									</Button>
								</Link>
							</DrawerClose>
							<DrawerClose asChild>
								<Link href="/content/notice" className="hover:text-gray-700">
									<Button variant="ghost" className="w-full justify-between">
										<div className="flex items-center">公告</div>
										<ChevronRight className="opacity-70" />
									</Button>
								</Link>
							</DrawerClose>
						</DrawerDescription>
					</DrawerHeader>
				</DrawerContent>
			</Drawer>
		</div>
	);
};
export default Header;
