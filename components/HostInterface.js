// @flow

import * as React from "react";

import styles from "./HostInterface.module.css";

import HostGuestButton from "./HostGuestButton";
import HostControlPanel from "./HostControlPanel";
import HostCategoryPanel from "./HostCategoryPanel";
import EditModal from "./EditModal";
import MenuList from "./MenuList";
import useMenu from "../lib/useMenu";
import ActionButton from "./ActionButton";
import DeleteModal from "./DeleteModal";
import EditItem from "./EditItem";
import EditCategory from "./EditCategory";
import type { MenuInfo } from "../lib/ItemTypes";

export const Context: React.Context<any> = React.createContext();

export default function HostInterface(menuData: MenuInfo): React.Node {
  let [data, setData] = React.useState(menuData);

  const modalRef = React.useRef();
  const [context, setContext] = React.useState();

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  React.useEffect(() => {
    setContext(modalRef.current);
  }, []);

  const {
    revalidate,
    mutateResetAll,
    mutateNameDescription,
    mutateDelete,
    mutateAdd,
    mutateAddCategory,
    mutateDeleteCategory,
  } = useMenu(setData, data);

  let resetAll = () => {
    mutateResetAll();
    fetch("/api/reset", {
      method: "POST",
    }).finally(revalidate);
  };

  let onEditItem = (itemInfo, itemID) => {
    mutateNameDescription(itemID, itemInfo);
    fetch("/api/set", {
      method: "POST",
      body: JSON.stringify({ id: itemID, itemInfo }),
    }).finally(revalidate);
  };

  let onDeleteItem = (itemID) => {
    mutateDelete(itemID);
    fetch("/api/delete", {
      method: "POST",
      body: String(itemID),
    }).finally(revalidate);
  };

  let onAddItem = (categoryID, itemInfo) => {
    mutateAdd(categoryID, itemInfo);
    fetch("/api/new", {
      method: "POST",
      body: JSON.stringify({ categoryID, itemInfo }),
    }).finally(revalidate);
  };

  let onAddCategory = (categoryName) => {
    mutateAddCategory(categoryName);
    fetch("/api/newcat", {
      method: "POST",
      body: categoryName,
    }).finally(revalidate);
  };

  let onDeleteCategory = (categoryID) => {
    mutateDeleteCategory(categoryID);
    fetch("/api/deletecat", {
      method: "POST",
      body: String(categoryID),
    }).finally(revalidate);
  };

  let onSetBulk = (menu: string) => {
    fetch("/api/setraw", {
      method: "POST",
      body: menu,
    }).finally(revalidate);
  };

  return (
    <>
      <Context.Provider value={context}>
        <HostControlPanel
          reset={resetAll}
          onSetBulk={onSetBulk}
          menu={data.menu}
        />
        <MenuList
          menuInfo={data.menu}
          CategoryHeaderComponent={(props) => (
            <HostCategoryPanel
              {...props}
              onAdd={onAddItem}
              onDelete={onDeleteCategory}
            />
          )}
          FirstButtonComponent={({ itemID }) => (
            <EditModal
              shouldBeEnabled={(itemInfo) =>
                itemInfo?.name != null && itemInfo.name != ""
              }
              formName={`edititem_${String(itemID)}`}
              itemInfo={data.menu.items[itemID]}
              onSubmit={(itemInfo) => onEditItem(itemInfo, itemID)}
              Editor={EditItem}
              Button={({ onClick }) => (
                <ActionButton text="e" onClick={onClick} />
              )}
            />
          )}
          SecondButtonComponent={({ itemID }) => (
            <DeleteModal
              Button={({ onClick }) => (
                <ActionButton text="×" onClick={onClick} />
              )}
              itemName={data.menu.items[itemID].name}
              onSubmit={() => onDeleteItem(itemID)}
            />
          )}
        />
        <div className={styles.newCategory}>
          <EditModal
            shouldBeEnabled={(cat) => cat != null && cat != ""}
            formName={"newcategory"}
            onSubmit={onAddCategory}
            Editor={EditCategory}
            Button={({ onClick }) => (
              <button className="pure-button" onClick={onClick}>
                Add category
              </button>
            )}
          />
        </div>
      </Context.Provider>
      <HostGuestButton href="/" text="Guest" />
      <div ref={modalRef} />
    </>
  );
}
