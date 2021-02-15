// @flow

import * as React from "react";

import styles from "./MenuItem.module.css";
import utilStyles from "../styles/utils.module.css";

import { type ItemType } from "../lib/ItemTypes.js";
import ItemInfo from "./ItemInfo.js";

export type Props = {
  itemInfo: ItemType,
  children: React.Node,
  count: ?number,
};

export default function MenuItem({
  itemInfo,
  count,
  children,
}: Props): React.Node {
  return (
    <li className={styles.menuItem}>
      <div className="pure-g">
        <ItemInfo {...itemInfo} />
        <div className="pure-u-1-4">
          <div className="pure-g">
            <div className="pure-u-1">
              <div className={utilStyles.orderPanelText}>{count ?? ""}</div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </li>
  );
}
