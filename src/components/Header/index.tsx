"use client";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <div className="w-full">
      <div className="mx-auto flex gap-3 max-w-7xl">
        <div className="flex items-center gap-3 p-5">
          <Image src="/logo-small.png" alt="logo" width={50} height={50} />
          <h1 className="text-lg font-bold">南京邮电大学开源软件镜像站</h1>
        </div>
        <div className="flex gap-3 items-center text-gray-400 *:transition-all">
          <Link href="/" className="hover:text-gray-700">
            镜像列表
          </Link>
          <Link href="/notice" className="hover:text-gray-700">
            公告
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
