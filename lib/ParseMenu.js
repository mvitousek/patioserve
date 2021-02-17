// @flow

import type { Menu } from "./ItemTypes";

import { newCategoryID, newItemID } from "./ItemTypes";

export function canConvertStringToMenu(menuText: string): boolean {
  let inCategory = false;
  const lines = menuText.split(/[\r\n]+/);
  for (let line of lines) {
    line = line.trim();
    if (line === "") continue;
    else if (line.startsWith("[") && line.endsWith("]")) {
      const newCategory = line.substr(1, line.length - 2).trim();
      if (newCategory === "") {
        return false;
      }
      inCategory = true;
    } else if (!inCategory) {
      return false;
    } else {
      let [name, ...rest] = line.split(";");
      name = name.trim();

      if (name === "" || rest.length > 1) {
        return false;
      }
    }
  }
  return true;
}

export function stringToMenu(menuText: string, oldMenu?: Menu): ?Menu {
  let curItems;
  let curCategory = null;

  let structure = [];
  let counts = {};
  let items = {};
  let categories = {};
  let idsrc = oldMenu?.idsrc ?? 0;

  function tryCategoryID(name) {
    if (oldMenu) {
      const oldEntry = Object.entries(oldMenu.categories).find(
        ([_, val]) => val === name
      );
      if (oldEntry != null) {
        const [oldID] = oldEntry;
        categories[oldID] = name;
        return oldID;
      }
    }
    let id;
    [id, idsrc] = newCategoryID(idsrc);
    categories[String(id)] = name;
    return id;
  }

  function tryItemID(name, description) {
    if (oldMenu) {
      const oldEntry = Object.entries(oldMenu.items).find(
        // $FlowFixMe[incompatible-use]
        ([_, val]) => val.name === name
      );
      if (oldEntry != null) {
        const [oldID] = oldEntry;
        items[oldID] = { name, description };
        // $FlowFixMe[incompatible-type]
        counts[oldID] = oldMenu.counts[oldID];
        return oldID;
      }
    }
    let id;
    [id, idsrc] = newItemID(idsrc);
    items[String(id)] = { name, description };
    counts[String(id)] = 0;
    return id;
  }

  const lines = menuText.split(/[\r\n]+/);
  for (let line of lines) {
    line = line.trim();
    if (line === "") continue;
    else if (line.startsWith("[") && line.endsWith("]")) {
      const newCategory = line.substr(1, line.length - 2).trim();
      if (newCategory === "") {
        continue;
      }
      const id = tryCategoryID(newCategory);

      if (curCategory !== null) {
        structure.push([curCategory, curItems]);
      }
      curCategory = id;
      curItems = [];
    } else if (curCategory == null) {
      continue;
    } else {
      let [name, desc] = line.split(";");
      name = name.trim();
      desc = desc?.trim();

      if (name === "") {
        continue;
      }
      const id = tryItemID(name, desc ?? "");
      curItems?.push(id);
    }
  }
  if (curCategory !== null) {
    structure.push([curCategory, curItems]);
  }
  // $FlowFixMe[incompatible-return]
  return { structure, counts, items, categories, idsrc };
}

export function menuToString({ structure, categories, items }: Menu): string {
  const buffer = [];
  for (const [category, catItems] of structure) {
    buffer.push(`[${categories[category]}]`);
    for (const item of catItems) {
      const { name, description } = items[item];
      buffer.push(`${name}; ${description}`);
    }
    buffer.push("");
  }
  return buffer.join("\n");
}
