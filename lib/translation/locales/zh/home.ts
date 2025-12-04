import type { HomeModule } from "../../types";

// Chinese Home module
export const home: HomeModule = {
  hero: {
    title: "开发者必备工具",
    subtitle: "免费、快速、注重隐私的开发者工具",
    description: "所有工具都在您的浏览器本地运行。数据不会发送到我们的服务器。",
  },
  tools: {
    title: "热门工具",
  },
  about: {
    title: "为什么选择我们的工具？",
    privacy: {
      title: "隐私优先",
      desc: "所有处理都在您的浏览器本地进行",
    },
    speed: {
      title: "闪电般快速",
      desc: "无需服务器往返，即时获得结果",
    },
    free: {
      title: "完全免费",
      desc: "无限制、无注册、无隐藏费用",
    },
  },
};
