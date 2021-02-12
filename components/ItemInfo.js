// @flow

import * as React from "react";

import { type ItemType } from "../lib/ItemTypes.js";

import utilStyles from "../styles/utils.module.css";

export default function ItemInfo(props: ItemType): React.Node {
  return (
    <div className={utilStyles.listItem}>
      {props.name}
      <br />
      <small className={utilStyles.lightText}>{props.description}</small>
    </div>
  );
}
