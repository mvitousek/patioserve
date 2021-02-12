// @flow

import * as React from "react";

import utilStyles from "../styles/utils.module.css";
import GuestItem from "./GuestItem";

import { type MenuType } from "../lib/ItemTypes.js";

export default function GuestInterface({ items }: MenuType): React.Node {
  return (
    <table className={utilStyles.list}>
      {items.map((itemProps, index) => (
        <GuestItem key={index} {...itemProps} />
      ))}
    </table>
  );
}
