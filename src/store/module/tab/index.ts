import { ITabState, IChangeTabInfoPayload } from "./typing";

// 存储用户的添加标签情况
const moduleTab = {
  state: {
    tagName: "", // 标签名称
    selectedIcon: "plus", // 真正选好了的icon
    currentIcon: "", // 当前用户选择了的icon,但未确认
    isSelected: false, // 用户是否选择了
    iconListVisible: false, // icon列表是否展示
    labelModelVisible: false, // 添加标签弹框是否显示
    id: "",
    alertType: "新增标签",
  } as ITabState,

  mutations: {
    // 修改增加标签弹框内的信息
    changeTabInfo(
      state: ITabState,
      payload: IChangeTabInfoPayload | IChangeTabInfoPayload[]
    ) {
      if (Array.isArray(payload)) {
        for (const item of payload) {
          // FIXME:
          (state[item.key] as IChangeTabInfoPayload["value"]) = item.value;
        }
      } else {
        const { key, value } = payload;
        (state[key] as IChangeTabInfoPayload["value"]) = value;
      }
    },
  },
};

export default moduleTab;
