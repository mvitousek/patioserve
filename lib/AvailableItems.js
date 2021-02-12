// @flow

import { type MenuType, type ItemType } from "./ItemTypes.js";

const items = new Map<number, ItemType>();
const counts = new Map<number, number>();

items.set(0, {
  description: "A hazy IPA with Lemondrop, Wai-iti, and Azacca hops",
  name: "Juicy Plume",
});
counts.set(0, 8);

export function getMenu(): MenuType {
  return {
    items: Array.from(items.entries()).map(([id, itemInfo]) => {
      return { id, itemInfo, count: counts.get(id) ?? 0 };
    }),
  };
}

export function incrementCount(id: number): number {
  const newCount = (counts.get(id) ?? 0) + 1;
  counts.set(id, newCount);
  return newCount;
}

export function decrementCount(id: number): number {
  const newCount = Math.max((counts.get(id) ?? 0) - 1, 0);
  counts.set(id, newCount);
  return newCount;
}

export function getCount(id: number): ?number {
  return counts.get(id);
}
