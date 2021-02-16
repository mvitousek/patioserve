// @flow

import type { MenuInfo, CategoryID, ItemID, Menu } from "./ItemTypes";

import { type ItemType } from "./ItemTypes.js";
import * as MenuMod from "./MenuMod";
import * as fs from "fs";
import { stringToMenu } from "./ParseMenu";
import * as path from "path";
import {
  readMenuFromRedis,
  redisPopulated,
  writeMenuToRedis,
} from "./RedisMenu";

function loadInitialMenu() {
  const file = path.join(process.cwd(), "public", "initialMenu");
  const menu = stringToMenu(fs.readFileSync(file, "utf8"));
  if (menu == null) {
    throw new Error("Unable to read initial file");
  }
  return menu;
}

let menu;

export async function getMenu(): Promise<MenuInfo> {
  if (menu) return menu;
  else {
    if (await redisPopulated()) {
      let loadedMenu = await readMenuFromRedis();
      menu = { menu: loadedMenu, timestamp: Date.now() };
      return menu;
    } else {
      let initMenu = loadInitialMenu();
      writeMenuToRedis(initMenu);
      menu = { menu: initMenu, timestamp: Date.now() };
      return menu;
    }
  }
}

function setMenu(menuData: Menu) {
  menu = { menu: menuData, timestamp: Date.now() };
  writeMenuToRedis(menuData);
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
  getMenu().then((menu) => setMenu(MenuMod.setDesc(id, itemDesc, menu.menu)));
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
