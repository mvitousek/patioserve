// @flow

import type { MenuInfo, CategoryID, ItemID, Menu } from "./ItemTypes";

import { type ItemType } from "./ItemTypes.js";
import * as MenuMod from "./MenuMod";
import { stringToMenu } from "./ParseMenu";
import { CreateTables, PGPopulated, ReadMenu, WriteMenu } from "./PGMenu";

let menu;

export async function getMenu(): Promise<MenuInfo> {
  if (menu) return menu;
  else {
    if (await PGPopulated()) {
      let loadedMenu = await ReadMenu();
      menu = { menu: loadedMenu, timestamp: Date.now() };
      return menu;
    } else {
      let initMenu = await CreateTables();
      menu = { menu: initMenu, timestamp: Date.now() };
      return menu;
    }
  }
}

function setMenu(menuData: Menu) {
  menu = { menu: menuData, timestamp: Date.now() };
  WriteMenu(menuData);
}

export async function incrementCount(id: ItemID): Promise<?number> {
  const menu = await getMenu();
  if (menu.menu.counts[id] != null) {
    const newMenu = MenuMod.crement(id, "inc", menu.menu);
    setMenu(newMenu);
    return newMenu.counts[id];
  } else {
    return null;
  }
}

export async function decrementCount(id: ItemID): Promise<?number> {
  const menu = await getMenu();
  if (menu.menu.counts[id] != null) {
    const newMenu = MenuMod.crement(id, "dec", menu.menu);
    setMenu(newMenu);
    return newMenu.counts[id];
  } else {
    return null;
  }
}

export function resetCounts(): void {
  getMenu().then((menu) => setMenu(MenuMod.resetAll(false, menu.menu)));
}

export function setNameDesc(id: ItemID, itemDesc: ItemType): void {
  getMenu().then((menu) => {
    setMenu(MenuMod.setDesc(id, itemDesc, menu.menu));
  });
}

export function newItem(category: CategoryID, itemDesc: ItemType): void {
  getMenu().then((menu) =>
    setMenu(MenuMod.newItem(category, itemDesc, menu.menu))
  );
}

export function deleteItem(id: ItemID): void {
  getMenu().then((menu) => setMenu(MenuMod.deleteItem(id, menu.menu)));
}

export function newCategory(name: string): void {
  getMenu().then((menu) => setMenu(MenuMod.newCategory(name, menu.menu)));
}

export function deleteCategory(id: CategoryID): void {
  getMenu().then((menu) => setMenu(MenuMod.deleteCategory(id, menu.menu)));
}

export function setRaw(menuText: string): void {
  getMenu().then((menu) => {
    const newMenu = stringToMenu(menuText, menu.menu);
    newMenu && setMenu(newMenu);
  });
}
