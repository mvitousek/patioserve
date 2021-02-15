// @flow

import type { MenuInfo, CategoryID, ItemID } from "./ItemTypes";

import { type ItemType } from "./ItemTypes.js";
import * as MenuMod from "./MenuMod";
import * as fs from "fs";
import { stringToMenu } from "./ParseMenu";
import * as path from "path";

function loadInitialMenu() {
  const file = path.join(process.cwd(), "public", "initialMenu");
  const menu = stringToMenu(fs.readFileSync(file, "utf8"));
  if (menu == null) {
    throw new Error("Unable to read initial file");
  }
  return menu;
}

let menu = {
  menu: loadInitialMenu(),
  timestamp: Date.now(),
};

export function getMenu(): MenuInfo {
  return menu;
}

export function incrementCount(id: ItemID): ?number {
  if (menu.menu.counts[id] != null) {
    menu.menu = MenuMod.crement(id, "inc", menu.menu);
    menu.timestamp = Date.now();
  }
  return menu.menu.counts[id];
}

export function decrementCount(id: ItemID): ?number {
  if (menu.menu.counts[id] != null) {
    menu.menu = MenuMod.crement(id, "dec", menu.menu);
    menu.timestamp = Date.now();
  }
  return menu.menu.counts[id];
}

export function resetCounts(): void {
  menu.menu = MenuMod.resetAll(false, menu.menu);
  menu.timestamp = Date.now();
}

export function setNameDesc(id: ItemID, itemDesc: ItemType): void {
  menu.menu = MenuMod.setDesc(id, itemDesc, menu.menu);
  menu.timestamp = Date.now();
}

export function newItem(category: CategoryID, itemDesc: ItemType): void {
  menu.menu = MenuMod.newItem(category, itemDesc, menu.menu);
  menu.timestamp = Date.now();
}

export function deleteItem(id: ItemID): void {
  menu.menu = MenuMod.deleteItem(id, menu.menu);
  menu.timestamp = Date.now();
}

export function newCategory(name: string): void {
  menu.menu = MenuMod.newCategory(name, menu.menu);
  menu.timestamp = Date.now();
}

export function deleteCategory(id: CategoryID): void {
  menu.menu = MenuMod.deleteCategory(id, menu.menu);
  menu.timestamp = Date.now();
}

export function setRaw(menuText: string): void {
  const newMenu = stringToMenu(menuText, menu.menu);
  if (newMenu != null) {
    menu.menu = newMenu;
    menu.timestamp = Date.now();
  }
}
