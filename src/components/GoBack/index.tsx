"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";

export const GoBack = () => {
  "use client";
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="-translate-x-3 group mb-3"
    >
      <div className="translate-x-0 group-hover:-translate-x-1 transition-all">
        <MoveLeft />
      </div>{" "}
      返回
    </Button>
  );
};
