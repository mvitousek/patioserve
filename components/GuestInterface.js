// @flow

import * as React from "react";

import utilStyles from "../styles/utils.module.css";

import useSWR from "swr";
import MenuItem from "./MenuItem";
import { type MenuType } from "../lib/ItemTypes.js";
import HostGuestButton from "./buttons/HostGuestButton";
import OrderButton from "./buttons/OrderButton";
import MenuList from "./MenuList";

function useMenu() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, mutate } = useSWR("/api/menu", fetcher, {
    refreshInterval: 1000,
  });

  function mutateSpecific(id: number, count: ?number): void {
    if (data?.counts != null) {
      const newCounts = { ...data.counts, [id]: count };
      mutate({ ...data, counts: newCounts }, false);
    }
  }

  return [data?.menu, data?.counts, mutateSpecific];
}

export default function GuestInterface(menuData: MenuType): React.Node {
  let [menu, setMenu] = React.useState(menuData.menu);
  let [counts, setCounts] = React.useState(menuData.counts);

  const [newMenu, newCounts, mutateSpecific] = useMenu();

  if (newCounts != null && newCounts != counts) {
    setCounts(newCounts);
  }

  if (newMenu != null && newMenu != menu) {
    setMenu(newMenu);
  }

  return (
    <>
      <MenuList
        menuInfo={{ menu, counts }}
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
