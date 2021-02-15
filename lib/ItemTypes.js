// @flow

export opaque type CategoryID = number;
export opaque type ItemID = number;

let idsrc = 0;
export function newItemID(): ItemID {
  return idsrc++;
}

export function newCategoryID(): CategoryID {
  return idsrc++;
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
};

export type ItemType = {
  name: string,
  description: string,
};
