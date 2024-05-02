"use server";

import { isoData } from "@/types/iso";
import axios from "axios";

export const getIsoInfo: () => Promise<isoData[]> = async () => {
  const rawData = await axios.get(
    "https://gist.githubusercontent.com/MaxtuneLee/8111eab066e296acd68f4fef66b32505/raw/8a27d1684369a50ac903f65e370fd8ad71d5d4d2/isoinfo.json",
  );
  return rawData.data;
};

export const getIsoList: () => Promise<{
  [category: string]: isoData[];
}> = async () => {
  const rawData = await getIsoInfo();
  const isoList: { [category: string]: isoData[] } = {};
  rawData.forEach((iso) => {
    if (!isoList[iso.category]) {
      isoList[iso.category] = [];
    }
    isoList[iso.category].push(iso);
  });
  return isoList;
};

export const getIsoByDistro: (
  distro: string,
) => Promise<isoData | undefined> = async (distro) => {
  const rawData = await getIsoInfo();
  const data = rawData.find(
    (iso) => iso.distro.toLowerCase() === distro.toLowerCase(),
  );
  if (data) {
    data.urls = data.urls.map((url) => ({
      name: url.name.split("(")[0],
      url: url.url,
      tag: url.name.split("(")[1]?.replace(")", "").split(","),
    }));
  }
  return data;
};
