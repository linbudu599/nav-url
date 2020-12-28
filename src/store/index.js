import Vuex from "../../node_modules/vuex/dist/vuex.cjs";
import { updateLocal } from "../utils/utils";
import moduleTab from "./module/tab";
import moduleUrl from "./module/url";
import moduleSearch from "./module/search";

const store = Vuex.createStore({
  state: {
    navName: "",
    catalogue: null
  },
  mutations: {
    // 更新
    update(state, payload) {
      const { key, value } = payload;
      // 更新网页标题
      if (key === "navName") state.navName = value;
      // 更新标签或URL
      else if (key === "catalogue") {
        const catalogue = state.catalogue;
        const length1 = catalogue.length;
        for (let i = 0; i < length1; i++) {
          const current = catalogue[i];
          if (current.id == value.id.split(".")[0]) {
            // 修改的是标签信息
            if (current.id == value.id) {
              current.name = value.name;
              current.icon = value.icon;
              updateLocal(store);
            } else {
              const URLS = current.URLS;
              const length2 = URLS.length;
              for (let j = 0; j < length2; j++) {
                const URL = URLS[j];
                if (URL.id == value.id) {
                  URL.url = value.url;
                  URL.icon = value.icon;
                  URL.name = value.name;
                  updateLocal(store);
                  break;
                }
              }
            }
            break;
          }
        }
      }
    },
    // 移除(根据id来移除)
    remove(state, payload) {
      // 需要判断是删除标签还是删除一个网址
      const catalogue = state.catalogue;
      const length1 = catalogue.length;
      const iid = payload.split(".");
      for (let i = 0; i < length1; i++) {
        const current = catalogue[i];
        if (current.id === iid[0]) {
          // 删除标签已经标签内的所有网址
          if (iid.length === 1) {
            catalogue.splice(i, 1);
            updateLocal(store);
            break;
          }
          // 删除标签内的某个网址
          else {
            const URLS = current.URLS;
            const length2 = URLS.length;
            for (let j = 0; j < length2; j++) {
              const URL = URLS[j];
              if (URL.id === payload) {
                URLS.splice(j, 1);
                updateLocal(store);
                break;
              }
            }
          }
        }
      }
    },
    // 添加
    add(state, payload) {
      const { key, value } = payload;
      const catalogue = state.catalogue;
      const length1 = catalogue.length;
      // 添加标签
      if (key == "1") {
        const _id =
          length1 == 0 ? "1" : (+catalogue[length1 - 1].id + 1).toString();
        catalogue.push({
          id: _id,
          name: value.name,
          icon: value.icon,
          URLS: []
        });
        updateLocal(store);
      }
      // 添加网址
      else if (key == "2") {
        const id = value.whichTag;
        for (let i = 0; i < length1; i++) {
          const current = catalogue[i];
          if (current.id == id) {
            const URLS = current.URLS;
            const length2 = URLS.length;
            let trueId;
            // 判断原来是否有其他URL
            if (length2 === 0) {
              trueId = `${id}.1`;
            } else {
              const lastId = URLS[length2 - 1].id.split(".");
              lastId[1] = (+lastId[1] + 1).toString();
              trueId = lastId.join(".");
            }
            URLS.push({
              id: trueId,
              url: value.url,
              icon: value.icon,
              name: value.name
            });
            updateLocal(store);
            break;
          }
        }
      }
    },
    // 拖拽结束后，更新对应标签内地址框的位置变动
    dragEndToUpdate(state, payload) {
      const { tabId, result } = payload;
      const catalogue = state.catalogue;
      const length = catalogue.length;
      for (let i = 0; i < length; i++) {
        if (catalogue[i].id != tabId) continue;
        const URLS = catalogue[i].URLS;
        const newURLS = new Array(URLS.length);
        URLS.forEach(v => {
          newURLS[result.indexOf(v.id)] = v;
        });
        catalogue[i].URLS = newURLS;
        break;
      }
      updateLocal(store);
    }
  },
  modules: {
    moduleTab,
    moduleUrl,
    moduleSearch
  }
});

export default store;
