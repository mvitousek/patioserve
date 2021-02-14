// @flow

import * as React from "react";

import utilStyles from "../styles/utils.module.css";

import MenuItem from "./MenuItem";
import { type MenuType } from "../lib/ItemTypes.js";

type Props = {
  menuInfo: MenuType,
  CategoryHeaderComponent: React.ComponentType<{
    category: string,
    count: number,
  }>,
  FirstButtonComponent: React.ComponentType<{
    itemID: number,
    count: ?number,
  }>,
  SecondButtonComponent: React.ComponentType<{
    itemID: number,
    count: ?number,
  }>,
};

export default function MenuList({
  menuInfo: { menu, counts },
  CategoryHeaderComponent,
  FirstButtonComponent,
  SecondButtonComponent,
}: Props): React.Node {
  let categoryMap = menu.categories.map((categoryName) =>
    menu.items.filter(({ category }) => category === categoryName)
  );

  return (
    <>
      {menu.categories.map((categoryName, index) => (
        <div className="pure-menu" key={index}>
          <CategoryHeaderComponent
            category={categoryName}
            count={categoryMap[index].length}
          />
          <ul className={"pure-menu-list " + utilStyles.stripedList}>
            {categoryMap[index].map(({ id, itemInfo }) => (
              <MenuItem
                key={itemInfo.name}
                count={counts[id]}
                itemInfo={itemInfo}
              >
                <FirstButtonComponent itemID={id} count={counts[id]} />
                <SecondButtonComponent itemID={id} count={counts[id]} />
              </MenuItem>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
