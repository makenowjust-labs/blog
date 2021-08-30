export type OGImageParams = {
  title: string;
  info: string;
};

const API_ENDPOINT = "https://makenowjust-api-og-image.vercel.app/api/index";

export const buildOGImageURL = ({ title, info }: OGImageParams) => {
  const params = [
    `title=${encodeURIComponent(title)}`,
    `info=${encodeURIComponent(info)}`
  ].join('&');
  return `${API_ENDPOINT}?{params}`;
};
