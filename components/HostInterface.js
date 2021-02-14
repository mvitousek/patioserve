// @flow

import * as React from "react";

import styles from "./HostInterface.module.css";

import useSWR from "swr";
import { type MenuType } from "../lib/ItemTypes.js";
import HostGuestButton from "./buttons/HostGuestButton";
import HostControlPanel from "./HostControlPanel";
import HostCategoryPanel from "./HostCategoryPanel";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import MenuList from "./MenuList";

function useMenu() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, mutate } = useSWR("/api/menu", fetcher, {
    refreshInterval: 1000,
  });

  function mutateResetAll(): void {
    if (data?.counts != null) {
      const newCounts = {};
      Object.keys(data.counts).forEach(
        (key) => (newCounts[Number.parseInt(key)] = 0)
      );
      mutate({ ...data, counts: newCounts }, false);
    }
  }

  function mutateNameDescription(id, itemInfo) {
    if (data?.menu != null) {
      mutate(
        {
          ...data,
          menu: {
            ...data.menu,
            items: data.menu.items.map((item) => {
              if (item.id === id) {
                return { ...item, itemInfo };
              } else {
                return item;
              }
            }),
          },
        },
        false
      );
    }
  }

  return {
    newMenu: data?.menu,
    newCounts: data?.counts,
    revalidate: mutate,
    mutateResetAll,
    mutateNameDescription,
  };
}

export const Context: React.Context<any> = React.createContext();

export default function HostInterface(menuData: MenuType): React.Node {
  let [menu, setMenu] = React.useState(menuData.menu);
  let [counts, setCounts] = React.useState(menuData.counts);

  const modalRef = React.useRef();
  const [context, setContext] = React.useState();

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  React.useEffect(() => {
    setContext(modalRef.current);
  }, []);

  const {
    newMenu,
    newCounts,
    revalidate,
    mutateResetAll,
    mutateNameDescription,
  } = useMenu();

  if (newCounts != null && newCounts != counts) {
    setCounts(newCounts);
  }

  if (newMenu != null && newMenu != menu) {
    setMenu(newMenu);
  }

  let resetAll = () => {
    mutateResetAll();
    fetch("/api/reset", {
      method: "POST",
    }).finally(revalidate);
  };

  let onSubmit = (itemInfo, itemID) => {
    mutateNameDescription(itemID, itemInfo);
    fetch("/api/set", {
      method: "POST",
      body: JSON.stringify({ id: itemID, ...itemInfo }),
    }).finally(revalidate);
  };

  return (
    <>
      <Context.Provider value={context}>
        <HostControlPanel reset={resetAll} />
        <MenuList
          menuInfo={{ menu, counts }}
          CategoryHeaderComponent={HostCategoryPanel}
          FirstButtonComponent={({ itemID }) => (
            <EditButton
              itemID={itemID}
              itemInfo={menu.items.find(({ id }) => id === itemID)?.itemInfo}
              onSubmit={(itemInfo) => onSubmit(itemInfo, itemID)}
            />
          )}
          SecondButtonComponent={({ itemID }) => (
            <DeleteButton
              itemID={itemID}
              itemName={
                menu.items.find(({ id }) => id === itemID)?.itemInfo.name
              }
            />
          )}
        />
        <div className={styles.newCategory}>
          <button className="pure-button">Add category</button>
        </div>
      </Context.Provider>
      <HostGuestButton href="/" text="Guest" />
      <div ref={modalRef} />
    </>
  );
}
