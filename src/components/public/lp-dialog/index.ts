import lpDialog from "./index.vue";
import { defineComponent, createVNode, render, toRef, watch } from "vue";

const confirmConstructor = defineComponent(lpDialog);

export interface CreateDialogOptions {
  [key: string]: any;
}

export const createDialog = (options: CreateDialogOptions) => {
  if (Object.prototype.toString.call(options) !== "[object Object]") {
    console.error("Please enter an object as a parameter");
  }

  options = options ? options : {};

  const instance = createVNode(confirmConstructor, options);

  const container = document.createElement("div");
  render(instance, container);

  const props = instance.component!.props;
  Object.keys(options).forEach((key) => {
    props[key] = options[key];
  });

  const status = toRef((instance.component as any).setupState, "status");

  return new Promise((resolve, reject) => {
    watch(status, (now) => {
      if (Number(now) === 0) reject();
      else if (Number(now) === 1) resolve(null);
    });
  });
};
