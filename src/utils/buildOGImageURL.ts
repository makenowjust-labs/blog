export type OGImageParams = {
  title: string;
  info: string;
};

const API_ENDPOINT =
  "https://makenowjust-labo-api-og-image.vercel.app/api/index";

export const buildOGImageURL = ({ title, info }: OGImageParams) =>
  `${API_ENDPOINT}?title=${encodeURIComponent(title)}&info=${encodeURIComponent(
    info
  )}`;
