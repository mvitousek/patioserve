// @flow

import type { ItemType, MenuInfo, ItemID, CategoryID } from "./ItemTypes";

import * as MenuMod from "./MenuMod";
import useSWR from "swr";

type MenuHook = {
  revalidate: () => mixed,
  mutateSpecific: (ItemID, ?number) => void,
  mutateResetAll: () => void,
  mutateNameDescription: (id: ItemID, itemInfo: ItemType) => void,
  mutateDelete: (id: ItemID) => void,
  mutateAdd: (CategoryID, ItemType) => void,
  mutateAddCategory: (string) => void,
  mutateDeleteCategory: (CategoryID) => void,
};

export default function useMenu(
  setMenu: (MenuInfo) => void,
  oldData: MenuInfo
): MenuHook {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const {
    data,
    mutate,
  }: {
    data: MenuInfo,
    mutate: (menu?: MenuInfo, revalidate?: boolean) => mixed,
  } = useSWR("/api/menu", fetcher, {
    refreshInterval: 1000,
  });

  const menu = data?.menu;

  if (data && data != oldData) {
    setMenu(data);
  }

  function mutateSpecific(id: ItemID, count: ?number): void {
    if (menu != null) {
      const newData = {
        ...data,
        menu: MenuMod.setCount(id, count, menu),
      };
      mutate(newData, false);
    }
  }

  function mutateResetAll(toUndefined?: boolean): void {
    if (menu != null) {
      mutate(
        { ...data, menu: MenuMod.resetAll(toUndefined === true, menu) },
        false
      );
    }
  }

  function mutateNameDescription(id: ItemID, itemInfo: ItemType) {
    if (menu != null) {
      mutate({ ...data, menu: MenuMod.setDesc(id, itemInfo, menu) }, false);
    }
  }

  function mutateDelete(id: ItemID) {
    if (menu != null) {
      mutate({ ...data, menu: MenuMod.deleteItem(id, menu) }, false);
    }
  }

  function mutateAdd(category: CategoryID, itemInfo: ItemType) {
    if (menu != null) {
      mutate(
        { ...data, menu: MenuMod.newItem(category, itemInfo, menu) },
        false
      );
    }
  }

  function mutateAddCategory(name: string) {
    if (menu != null) {
      mutate({ ...data, menu: MenuMod.newCategory(name, menu) }, false);
    }
  }

  function mutateDeleteCategory(category: CategoryID) {
    if (menu != null) {
      mutate({ ...data, menu: MenuMod.deleteCategory(category, menu) }, false);
    }
  }

  return {
    revalidate: mutate,
    mutateSpecific,
    mutateResetAll,
    mutateNameDescription,
    mutateDelete,
    mutateAdd,
    mutateAddCategory,
    mutateDeleteCategory,
  };
}
