// @flow

import * as React from "react";

import { type ItemType } from "../lib/ItemTypes.js";
import ItemInfo from "./ItemInfo.js";
import GuestOrderPanel from "./GuestOrderPanel.js";

export type Props = {
  itemInfo: ItemType,
  count: number,
  id: number,
};

export default function GuestItem({ itemInfo, count, id }: Props): React.Node {
  return (
    <tr>
      <td>
        <ItemInfo {...itemInfo} />
      </td>
      <GuestOrderPanel initialCount={count} itemID={id} />
    </tr>
  );
}
