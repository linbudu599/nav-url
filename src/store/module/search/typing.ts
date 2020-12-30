export interface ISearchState {
  isSearch: boolean;
  searchWord: string;
}

export type ISearchMutationPayload = {
  [K in keyof ISearchState]: ISearchState[K];
};
