// @flow

import type { Menu } from "./ItemTypes";

import * as Redis from "ioredis";

// $FlowFixMe[not-a-function]
let client = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 1,
});

export async function writeMenuToRedis(menu: Menu) {
  try {
    await client.flushall();
  } catch (e) {
    return;
  }

  let structure;
  if (menu.structure.length > 0) {
    structure = client.rpush([
      "structure",
      ...menu.structure.map(([categoryID]) => String(categoryID)),
    ]);
  }
  let categoryContents = menu.structure
    .filter(([_, categoryContents]) => categoryContents.length > 0)
    .map(([categoryID, categoryContents]) =>
      client.rpush([
        `catcontents${String(categoryID)}`,
        ...categoryContents.map(String),
      ])
    );
  let categoryNames = Object.entries(menu.categories).map(([id, name]) =>
    client.set([`catname${String(id)}`, name])
  );
  let itemNames = Object.entries(menu.items).map(([id, item]) =>
    // $FlowFixMe[incompatible-use]
    client.set([`itemname${String(id)}`, item.name])
  );
  let itemDescs = Object.entries(menu.items).map(([id, item]) =>
    // $FlowFixMe[incompatible-use]
    client.set([`itemdesc${String(id)}`, item.description])
  );

  await Promise.all([
    structure,
    ...categoryContents,
    ...categoryNames,
    ...itemNames,
    ...itemDescs,
  ]).catch(() => {
    client.flushall();
    throw new Error("Unable to read from Redis");
  });

  await client.set("state", "finished");
}

export async function readMenuFromRedis(): Promise<Menu> {
  async function getCatOrder() {
    if (await client.exists("structure")) {
      return await client.lrange("structure", 0, -1);
    } else {
      return [];
    }
  }

  async function getCatItems(id) {
    if (await client.exists(`catcontents${id}`)) {
      return await client.lrange(`catcontents${id}`, 0, -1);
    } else {
      return [];
    }
  }

  let categoryOrder = await getCatOrder();
  let categoryItems = await Promise.all(
    categoryOrder.map((id) => getCatItems(id))
  );
  // $FlowFixMe[incompatible-call]
  let structure = categoryOrder.map((id, i) => [id, categoryItems[i]]);

  let categoryNames = await Promise.all(
    categoryOrder.map((id) => client.get(`catname${id}`))
  );
  let categories = Object.fromEntries(
    categoryOrder.map((id, i) => [id, categoryNames[i]])
  );

  let itemIDs = categoryItems.reduce(
    (acc, items) =>
      items
        .filter((item) => !acc.includes(item))
        .reduce((acc, item) => [...acc, item], acc),
    []
  );
  let itemNames = await Promise.all(
    itemIDs.map((id) => client.get(`itemname${id}`))
  );
  let itemDescs = await Promise.all(
    itemIDs.map((id) => client.get(`itemdesc${id}`))
  );
  let items = Object.fromEntries(
    itemIDs.map((id, i) => [
      id,
      { name: itemNames[i], description: itemDescs[i] },
    ])
  );
  let counts = Object.fromEntries(itemIDs.map((id) => [id, 0]));

  // $FlowFixMe[incompatible-return]
  return { structure, categories, items, counts };
}

export async function redisPopulated(): Promise<boolean> {
  try {
    return await client.exists("state");
  } catch (e) {
    return false;
  }
}
