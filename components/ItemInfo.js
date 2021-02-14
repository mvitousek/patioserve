// @flow

import * as React from "react";

import { type ItemType } from "../lib/ItemTypes.js";

import utilStyles from "../styles/utils.module.css";
import styles from "./ItemInfo.module.css";

export default function ItemInfo(props: ItemType): React.Node {
  return (
    <div className="pure-u-3-4">
      <div className={styles.panel}>
        {props.name}
        <br />
        <small className={utilStyles.lightText}>{props.description}</small>
      </div>
    </div>
  );
}
