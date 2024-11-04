import { SearchParams } from "../store/store-search-page";

export const buildSearchQuery = (searchParams: SearchParams): string => {
  const params = Object.entries(searchParams)
    .filter(([, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return params;
};
