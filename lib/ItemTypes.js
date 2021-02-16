// @flow

export opaque type CategoryID = number;
export opaque type ItemID = number;

export function newItemID(src: number): [ItemID, number] {
  return [src + 1, src + 1];
}

export function newCategoryID(src: number): [CategoryID, number] {
  return [src + 1, src + 1];
}
export type MenuInfo = {
  menu: Menu,
  timestamp: number,
};

export type Menu = {
  structure: $ReadOnlyArray<[CategoryID, $ReadOnlyArray<ItemID>]>,
  categories: { [CategoryID]: string },
  items: { [ItemID]: ItemType },
  counts: { [ItemID]: ?number },
  idsrc: number,
};

export type ItemType = {
  name: string,
  description: string,
};
