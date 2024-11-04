import { create } from "zustand";

export interface SearchParams {
  jobGroup: string;
  techStacks: string;
  searchType: string;
  keyword: string;
  sort: string;
  page: number;
  limit: number;
}

interface Store {
  searchParams: SearchParams;
  setSearchParams: (newParams: Partial<SearchParams>) => void;
}

const useStoreSearchPage = create<Store>(set => ({
  searchParams: {
    jobGroup: "all",
    techStacks: "",
    searchType: "title",
    keyword: "",
    sort: "latest",
    page: 1,
    limit: 10,
  },
  setSearchParams: newParams =>
    set(state => ({
      searchParams: { ...state.searchParams, ...newParams },
    })),
}));

export default useStoreSearchPage;
