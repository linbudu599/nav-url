import { IURLState, IChangeURLInfoPayload } from "./typing";

// 存储用户的添加URL情况
const moduleUrl = {
  state: {
    url: "", // URL地址
    icon: "", // URL图标
    otherIcon: "", // 网址的默认icon地址
    isShow: false, // 是否显示
    isLoadingIcon: false, // 是否正在获取Icon
    isLoadingName: false, // 是否正在获取Name
    name: "", // 网址名称
    imgErr: false, // 图片是否显示异常
    whichTag: -1, // 添加到哪个标签中去
    id: -1, // 记录id
    alertType: "新增网址",
  } as IURLState,
  mutations: {
    // 修改增加URL弹框内的信息
    changeUrlInfo(
      state: IURLState,
      payload: IChangeURLInfoPayload | IChangeURLInfoPayload[]
    ) {
      if (Array.isArray(payload)) {
        for (const item of payload) {
          (state[item.key] as IChangeURLInfoPayload["value"]) = item.value;
        }
      } else {
        (state[payload.key] as IChangeURLInfoPayload["value"]) = payload.value;
      }
    },
  },
};

export * from "./typing";

export default moduleUrl;
