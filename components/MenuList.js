// @flow

import * as React from "react";

import utilStyles from "../styles/utils.module.css";

import MenuItem from "./MenuItem";
import type { ItemID, CategoryID, Menu } from "../lib/ItemTypes";

type Props = {
  menuInfo: Menu,
  CategoryHeaderComponent: React.ComponentType<{
    categoryID: CategoryID,
    category: string,
    count: number,
  }>,
  FirstButtonComponent: React.ComponentType<{
    itemID: ItemID,
    count: ?number,
  }>,
  SecondButtonComponent: React.ComponentType<{
    itemID: ItemID,
    count: ?number,
  }>,
};

export default function MenuList({
  menuInfo: { structure, categories, items, counts },
  CategoryHeaderComponent,
  FirstButtonComponent,
  SecondButtonComponent,
}: Props): React.Node {
  return (
    <>
      {structure.map(([categoryID, category]) => (
        <div className="pure-menu" key={String(categoryID)}>
          <CategoryHeaderComponent
            categoryID={categoryID}
            category={categories[categoryID]}
            count={category.length}
          />
          <ul className={"pure-menu-list " + utilStyles.stripedList}>
            {category.map((itemID) => (
              <MenuItem
                key={String(itemID)}
                count={counts[itemID]}
                itemInfo={items[itemID]}
              >
                <FirstButtonComponent itemID={itemID} count={counts[itemID]} />
                <SecondButtonComponent itemID={itemID} count={counts[itemID]} />
              </MenuItem>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
