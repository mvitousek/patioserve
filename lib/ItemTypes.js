// @flow

export type MenuType = {
  menu: {
    items: $ReadOnlyArray<ItemInfoType>,
    categories: $ReadOnlyArray<string>,
  },
  counts: { [number]: number },
};

export type ItemInfoType = {
  itemInfo: ItemType,
  category: string,
  id: number,
};

export type ItemType = {
  name: string,
  description: string,
};
