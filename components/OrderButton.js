//@flow

import * as React from "react";

import ActionButton from "./ActionButton";
import type { ItemID } from "../lib/ItemTypes";

type ButtonProps = {
  itemID: ItemID,
  count: ?number,
  mutateSpecific: (id: ItemID, count: ?number) => void,
  text: string,
  api: string,
  mod: (number) => number,
};

export default function OrderButton({
  count,
  mutateSpecific,
  itemID,
  api,
  mod,
  text,
}: ButtonProps): React.Node {
  return (
    <ActionButton
      text={text}
      isEnabled={count != null}
      onClick={() => {
        if (typeof count === "number") {
          mutateSpecific(itemID, mod(count));
          fetch(api, {
            method: "POST",
            body: String(itemID),
          }).then(
            (resp) =>
              resp.json().then(({ count }) => mutateSpecific(itemID, count)),
            () => {
              mutateSpecific(itemID, null);
            }
          );
        }
      }}
    />
  );
}
