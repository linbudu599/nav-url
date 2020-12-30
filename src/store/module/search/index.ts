import { ISearchState, ISearchMutationPayload } from "./typing";

const moduleSearch = {
  state: {
    isSearch: false,
    searchWord: "",
  } as ISearchState,
  mutations: {
    changeSearchWord(state: ISearchState, payload: ISearchState["searchWord"]) {
      state.searchWord = payload;
    },
    changeIsSearch(state: ISearchState, payload: ISearchState["isSearch"]) {
      state.isSearch = payload;
    },
  },
};

export default moduleSearch;
