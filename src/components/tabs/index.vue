<template>
  <aside id="tabs-container">
    <div id="logo-container">
      {{ navInfos.navName }}
    </div>
    <ul id="tabs">
      <!-- FIXME: remove -->
      <li class="tab tab-search" @click="showSearch">
        <i class="fas fa-search tab-icon" />
        <span>快速搜索</span>
      </li>
      <li class="tab tab-save" @click="toggleSaveModalStatus(true)">
        <i class="fas fa-share-square tab-icon"></i>
        <span>保存配置</span>
      </li>
      <li class="tab tab-import" @click="toggleImportModalStatus(true)">
        <i class="fas fa-cog tab-icon"></i>
        <span>导入配置</span>
      </li>
      <br />
      <li
        v-for="(item, index) in navInfos.catalogue"
        :key="index"
        class="tab"
        @click="navigate2Tab(item.id)"
      >
        <span class="li-container">
          <i :class="['fas', `fa-${item.icon}`, 'tab-icon']" />
          <span>{{ item.name }}</span>
          <i class="fas fa-angle-right tab-icon tab-angle-right" />
        </span>
      </li>
      <li class="tab add-tab" @click="displayTabLabelCreateModal">
        <i class="fas fa-plus" />
      </li>
    </ul>

    <!--    添加标签弹框     -->
    <tabAlert name="新增标签" />

    <!--    保存配置弹框     -->
    <save-config
      @closeSaveConfigAlert="toggleSaveModalStatus(false)"
      :visible="shouldShowSaveAlert"
    />

    <!--    导入配置弹框     -->
    <import-config
      @closeImportConfigAlert="toggleImportModalStatus(false)"
      :visible="shouldShowImportAlert"
    />
  </aside>
</template>

<script lang="ts">
import { ref } from "vue";

import { useStore } from "vuex";

import tabAlert from "../public/tabAlert/tabAlert.vue";

import saveConfig from "./routers/saveConfig.vue";
import importConfig from "./routers/importConfig.vue";

export default {
  name: "tabs",

  components: {
    tabAlert,
    saveConfig,
    importConfig,
  },

  setup() {
    const store = useStore();
    const navInfos = store.state;

    const shouldShowSaveAlert = ref(false); // 保存配置弹框是否展示
    const shouldShowImportAlert = ref(false); // 导入配置弹框是否展示

    const displayTabLabelCreateModal = (): void => {
      store.commit("changeTabInfo", [
        { key: "labelModelVisible", value: true },
        { key: "alertType", value: "新增标签" },
      ]);
    };

    const toggleSaveModalStatus = (value: boolean): void => {
      shouldShowSaveAlert.value = value;
    };

    const toggleImportModalStatus = (value: boolean): void => {
      shouldShowImportAlert.value = value;
    };

    // 展示搜索框
    const showSearch = (): void => {
      if (store.state.moduleSearch.isSearch) {
        store.commit("changeIsSearch", false);
        store.commit("changeSearchWord", "");
      } else {
        store.commit("changeIsSearch", true);
      }
    };

    // 跳转到指定标签
    const navigate2Tab = (id: number): void => {
      const content = document.getElementById("content");
      const el = document.getElementById(String(id));

      if (!content || !el) {
        // TODO:
        return;
      }

      const start = content.scrollTop;
      const end = el.offsetTop - 80;

      const eachDistance =
        start > end
          ? (-1 * Math.abs(start - end)) / 20
          : Math.abs(start - end) / 20;

      let count = 0;

      // FIXME:
      const timer = setInterval(() => {
        if (count < 20) {
          content.scrollTop += eachDistance;
          count++;
        } else {
          clearInterval(timer);
        }
      }, 10);
    };

    return {
      navInfos,
      displayTabLabelCreateModal,
      shouldShowSaveAlert,
      toggleSaveModalStatus,
      toggleImportModalStatus,
      shouldShowImportAlert,
      showSearch,
      navigate2Tab,
    };
  },
};
</script>

<style scoped>
#tabs-container {
  width: 210px;
  height: 100vh;
  float: left;
  background-color: rgb(44, 42, 42);
}

#logo-container {
  height: 79px;
  color: white;
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid rgb(68, 67, 67);
}

#tabs {
  height: calc(100% - 80px);
  overflow: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

#tabs::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}

.tab {
  cursor: pointer;
  height: 50px;
  color: rgb(185, 164, 164);
  line-height: 50px;
  position: relative;
}

.to-id {
  display: block;
  height: 100%;
  color: rgb(134, 125, 125);
}

.tab-search {
  margin-top: 20px;
  text-align: center;
}

.tab-import,
.tab-save {
  text-align: center;
}

.tab:hover .to-id,
.tab:hover {
  color: white;
}

.li-container {
  display: inline-block;
  width: 100%;
  padding-left: 90px;
}

.tab-icon {
  margin: 0 15px 0 -30px;
}

.add-tab {
  text-align: center;
}

.tab-angle-right {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 0;
}
</style>
