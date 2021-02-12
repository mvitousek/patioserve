// @flow

export type MenuType = {
  items: $ReadOnlyArray<ItemInfoType>,
};

export type ItemInfoType = {
  itemInfo: ItemType,
  id: number,
  count: number,
};

export type ItemType = {
  name: string,
  description: string,
};
