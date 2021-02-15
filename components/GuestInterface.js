// @flow

import * as React from "react";

import utilStyles from "../styles/utils.module.css";

import { type MenuInfo } from "../lib/ItemTypes.js";
import HostGuestButton from "./HostGuestButton";
import OrderButton from "./OrderButton";
import MenuList from "./MenuList";
import useMenu from "../lib/useMenu";

export default function GuestInterface(menuData: MenuInfo): React.Node {
  let [data, setData] = React.useState(menuData);

  const { mutateSpecific } = useMenu(setData, data);

  return (
    <>
      <MenuList
        menuInfo={data.menu}
        CategoryHeaderComponent={({ category }) => (
          <span className={utilStyles.categoryTitle}>{category}</span>
        )}
        FirstButtonComponent={(props) => (
          <OrderButton
            {...props}
            mutateSpecific={mutateSpecific}
            text="−" /* this is a minus symbol, not a hyphen */
            api="/api/dec"
            mod={(count) => Math.max(count - 1, 0)}
          />
        )}
        SecondButtonComponent={(props) => (
          <OrderButton
            {...props}
            mutateSpecific={mutateSpecific}
            text="+"
            api="/api/inc"
            mod={(count) => count + 1}
          />
        )}
      />
      <HostGuestButton href="/host" text="Host" />
    </>
  );
}
