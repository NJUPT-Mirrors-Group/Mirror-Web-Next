import { Signpost } from "lucide-react";

export default function NoticeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full">
      <div className=" mx-auto max-w-7xl p-6 w-full">
        <div className="text-lg font-bold flex gap-1 items-center pb-4">
          <Signpost /> 站点公告
        </div>
        {children}
      </div>
    </main>
  );
}
