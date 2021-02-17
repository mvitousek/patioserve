// @flow

import { Pool } from "pg";
import * as fs from "fs";
import { stringToMenu } from "./ParseMenu";
import * as path from "path";
import type { Menu } from "./ItemTypes";

const pool =
  process.env.NODE_ENV === "production"
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new Pool();

function loadInitialMenu() {
  const file = path.join(process.cwd(), "public", "initialMenu");
  const menu = stringToMenu(fs.readFileSync(file, "utf8"));
  if (menu == null) {
    throw new Error("Unable to read initial file");
  }
  return menu;
}

export async function PGPopulated(): Promise<boolean> {
  const res = await pool.query(
    "SELECT EXISTS (SELECT table_name FROM information_schema.tables WHERE table_name = $1)",
    ["items"]
  );
  return res.rows[0].exists;
}

export async function CreateTables(): Promise<Menu> {
  await Promise.all([
    pool.query("CREATE TABLE items (id int, name text, description text)"),
    pool.query("CREATE TABLE categories (id int, name text)"),
    pool.query("CREATE TABLE structure (id int, pos int)"),
    pool.query(
      "CREATE TABLE category_structure (id int, pos int, category int)"
    ),
  ]).catch(() => {
    throw new Error("Unable to create db tables");
  });
  const menu = loadInitialMenu();
  WriteMenu(menu);
  return menu;
}

export async function WriteMenu(menu: Menu) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await Promise.all([
      client.query("DELETE FROM items"),
      client.query("DELETE FROM categories"),
      client.query("DELETE FROM structure"),
      client.query("DELETE FROM category_structure"),
    ]);

    const items = Object.entries(
      menu.items
      // $FlowFixMe[incompatible-use]
    ).map(([id, { name, description }]) =>
      client.query("INSERT INTO items VALUES($1, $2, $3)", [
        Number.parseInt(id),
        name,
        description,
      ])
    );
    const categories = Object.entries(menu.categories).map(([id, name]) =>
      client.query("INSERT INTO categories VALUES($1, $2)", [
        Number.parseInt(id),
        name,
      ])
    );
    const structure = menu.structure.map(
      ([categoryID, categoryItems], index) => [
        client.query("INSERT INTO structure VALUES($1, $2)", [
          categoryID,
          index,
        ]),
        ...categoryItems.map((itemID, index) =>
          client.query("INSERT INTO category_structure VALUES($1, $2, $3)", [
            itemID,
            index,
            categoryID,
          ])
        ),
      ]
    );
    await Promise.all([...items, ...categories, ...structure]);

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function ReadMenu(): Promise<Menu> {
  const structure = await Promise.all(
    (
      await pool.query("SELECT id FROM structure ORDER BY pos")
    ).rows.map(async ({ id: categoryID }) => [
      categoryID,
      (
        await pool.query(
          "SELECT id FROM category_structure WHERE category = $1 ORDER BY pos",
          [categoryID]
        )
      ).rows.map(({ id }) => id),
    ])
  );

  const categories = Object.fromEntries(
    await Promise.all(
      structure.map(async ([id]) => [
        id,
        (await pool.query("SELECT name FROM categories WHERE id = $1", [id]))
          .rows[0].name,
      ])
    )
  );

  const items = Object.fromEntries(
    await Promise.all(
      structure
        .map(([_, categoryItems]) =>
          categoryItems.map(async (id) => [
            id,
            (
              await pool.query(
                "SELECT name, description FROM items WHERE id = $1",
                [id]
              )
            ).rows[0],
          ])
        )
        .flat()
    )
  );

  const counts = Object.fromEntries(
    Object.entries(items).map(([id]) => [Number.parseInt(id), 0])
  );

  const idsrc = Math.max(
    ...[...Object.keys(items), ...Object.keys(categories)].map((n) =>
      Number.parseInt(n)
    )
  );

  // $FlowFixMe[incompatible-return]
  return { structure, categories, items, counts, idsrc };
}
