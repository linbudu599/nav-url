export interface ITabState {
  tagName: string;
  selectedIcon: string;
  currentIcon: string;
  isSelected: boolean;
  iconListVisible: boolean;
  labelModelVisible: boolean;
  id: string;
  alertType: string;
}

export interface IChangeTabInfoPayload {
  key: keyof ITabState;
  value: ITabState[keyof ITabState];
}
