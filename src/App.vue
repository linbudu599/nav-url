<template>
  <div id="app">
    <AppTab></AppTab>
    <AppContent></AppContent>
  </div>
</template>

<script>
import { provide } from "vue";
import { useStore } from "vuex";

import { writeToVuex } from "@/utils/utils";
import { DEFAULT_NAV_INFO } from "@/utils/constants";

import AppTab from "@/components/tabs";
import AppContent from "@/components/main";

import { createMessage } from "@/components/public/lp-message";
import { createDialog } from "@/components/public/lp-dialog";

export default {
  name: "App",

  components: {
    AppTab,
    AppContent,
  },

  setup() {
    const store = useStore();

    if (window.localStorage.getItem("IS_SET") === "true") {
      writeToVuex(store, JSON.parse(window.localStorage.navInfos));
    } else {
      window.localStorage.setItem("navInfos", JSON.stringify(DEFAULT_NAV_INFO));
      window.localStorage.setItem("IS_SET", "true");
      writeToVuex(store, DEFAULT_NAV_INFO);
    }

    // 全局注册组件
    provide("message", createMessage);
    provide("confirm", createDialog);

    return {};
  },
};
</script>

<style>
@import "./assets/css/reset/reset.css";
@import "./assets/css/fontawesome/css/all.min.css";
@import "./assets/css/animate.css/animate.css";
</style>
