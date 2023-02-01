type WaifuImage = {
  url: string;
};

export const getNewWaifuImageUrl = async (): Promise<string> => {
  const response = await fetch('https://api.waifu.pics/sfw/neko');
  return ((await response.json()) as WaifuImage).url;
};
