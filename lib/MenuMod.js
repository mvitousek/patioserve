// @flow

import type { Menu, ItemType, ItemID, CategoryID } from "./ItemTypes";

import { newItemID, newCategoryID } from "./ItemTypes";

export function setCount(id: ItemID, count: ?number, menu: Menu): Menu {
  const newCounts = { ...menu.counts, [String(id)]: count };
  return { ...menu, counts: newCounts };
}

export function crement(id: ItemID, op: "inc" | "dec", menu: Menu): Menu {
  if (menu.counts[id] == null) {
    return menu;
  }
  let count;
  if (op === "inc") {
    count = menu.counts[id] + 1;
  } else {
    count = Math.max(0, menu.counts[id] - 1);
  }
  return setCount(id, count, menu);
}

export function resetAll(toUndefined: boolean, menu: Menu): Menu {
  const set = toUndefined ? undefined : 0;
  const counts = Object.fromEntries(
    Object.entries(menu.counts).map(([k]) => [k, set])
  );
  // $FlowFixMe[incompatible-return]
  return { ...menu, counts };
}

export function setDesc(id: ItemID, itemInfo: ItemType, menu: Menu): Menu {
  const newItems = { ...menu.items, [String(id)]: itemInfo };
  return { ...menu, items: newItems };
}

export function deleteItem(id: ItemID, menu: Menu): Menu {
  const structure = menu.structure.map(([categoryID, category]) => [
    categoryID,
    category.filter((itemID) => itemID != id),
  ]);

  const counts = Object.fromEntries(
    Object.entries(menu.counts).filter(([k]) => k != String(id))
  );

  const items = Object.fromEntries(
    Object.entries(menu.items).filter(([k]) => k != String(id))
  );

  // $FlowFixMe[incompatible-return]
  return { ...menu, structure, counts, items };
}

export function newItem(
  category: CategoryID,
  itemInfo: ItemType,
  menu: Menu
): Menu {
  const itemID = newItemID();
  const structure = menu.structure.map(([categoryID, items]) =>
    categoryID === category
      ? [categoryID, [...items, itemID]]
      : [categoryID, items]
  );
  const counts = { ...menu.counts, [String(itemID)]: 0 };
  const items = { ...menu.items, [String(itemID)]: itemInfo };

  return { ...menu, structure, counts, items };
}

export function newCategory(name: string, menu: Menu): Menu {
  const categoryID = newCategoryID();
  const structure = [...menu.structure, [categoryID, []]];
  const categories = { ...menu.categories, [String(categoryID)]: name };
  return { ...menu, structure, categories };
}

export function deleteCategory(category: CategoryID, menu: Menu): Menu {
  const structure = menu.structure.filter(([item]) => item != category);
  const categories = Object.fromEntries(
    Object.entries(menu.categories).filter(([k]) => k != String(category))
  );

  // $FlowFixMe[incompatible-return]
  return { ...menu, structure, categories };
}
