import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MirrorSyncList } from "@/types/sync";
import dayjs from "dayjs";
const getSyncData = async () => {
  const res = await fetch("http://localhost:3000/mirrordsync.json");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
const getSyncStatusVariant = (status: string) => {
  switch (status) {
    case "success":
      return "success";
    case "error":
      return "destructive";
    case "warning":
      return "secondary";
    default:
      return "default";
  }
};
const MirrorTable = async () => {
  const data: MirrorSyncList = await getSyncData();
  const time = dayjs();
  console.log(data);
  return (
    <>
      <Table className="w-full">
        <TableCaption>
          更新时间: {time.format("YYYY-MM-DD HH:mm:ss")}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">名称</TableHead>
            <TableHead className="w-[150px]">状态</TableHead>
            <TableHead>大小</TableHead>
            <TableHead>上次更新时间</TableHead>
            <TableHead>下次更新时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant={"success"}>{item.status}</Badge>
                </TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell className="">
                  {dayjs(item.last_update).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell className="">
                  {dayjs(item.next_schedule).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default MirrorTable;
