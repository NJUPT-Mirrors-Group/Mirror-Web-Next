export type isoData = {
  distro: string;
  category: string;
  urls: downloadUrl[];
};

export type downloadUrl = {
  name: string;
  url: string;
  tag?: string[];
};
