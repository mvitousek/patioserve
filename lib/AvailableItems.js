// @flow

import { type MenuType, type ItemType } from "./ItemTypes.js";

const items = new Map<number, ItemType>();
const counts: { [number]: number } = {};
const categories = ["On tap", "Cans", "Bottles", "Snacks"];
const categoryMap = { [0]: "On tap", [1]: "Cans" };

items.set(0, {
  description: "A hazy IPA with Lemondrop, Wai-iti, and Azacca hops",
  name: "Juicy Plume (Homebrew)",
});
items.set(1, {
  description: "A really good, super dark ale",
  name: "Black Beer (Holy Mountain)",
});
counts[0] = 8;
counts[1] = 0;

let nextId = 2;

export function getMenu(): MenuType {
  return {
    menu: {
      items: Array.from(items.entries()).map(([id, itemInfo]) => {
        return { id, itemInfo, category: categoryMap[id] };
      }),
      categories,
    },
    counts,
  };
}

export function incrementCount(id: number): number {
  const newCount = counts[id] + 1;
  counts[id] = newCount;
  return newCount;
}

export function decrementCount(id: number): number {
  const newCount = Math.max(counts[id] - 1, 0);
  counts[id] = newCount;
  return newCount;
}

export function getCounts(): { counts: { [number]: number } } {
  return { counts };
}

export function resetCounts(): void {
  Object.keys(counts).forEach((key) => (counts[Number.parseInt(key)] = 0));
}

export function addDummyItem(): void {
  const id = nextId++;
  items.set(id, {
    name: "The Crossing (Mirage)",
    description: "Unknown hazy ipa",
  });
  counts[id] = 0;
  categoryMap[id] = "Cans";
}

export function setNameDesc(
  id: number,
  name: string,
  description: string
): void {
  items.set(id, { name, description });
}
