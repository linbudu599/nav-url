export interface IURLState {
  url: string;
  icon: string;
  otherIcon: string;
  isShow: boolean;
  isLoadingIcon: boolean;
  isLoadingName: boolean;
  name: string;
  imgErr: boolean;
  whichTag: number;
  id: number;
  alertType: string;
}

export interface IChangeURLInfoPayload {
  key: keyof IURLState;
  value: IURLState[keyof IURLState];
}
