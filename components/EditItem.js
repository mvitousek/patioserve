//@flow

import type { ItemType } from "../lib/ItemTypes";

import * as React from "react";

import styles from "./EditItem.module.css";

export type Props<T> = {
  show: boolean,
  formName: string,
  itemInfo?: T,
  setEnabled: (boolean) => void,
  shouldBeEnabled: (T) => boolean,
  onSubmit: (T) => void,
};

export default function EditItem(props: Props<ItemType>): React.Node {
  const [name, setName] = React.useState(props.itemInfo?.name ?? "");
  const [description, setDescription] = React.useState(
    props.itemInfo?.description ?? ""
  );

  React.useEffect(() => {
    if (props.show) {
      setName(props.itemInfo?.name ?? "");
      setDescription(props.itemInfo?.description ?? "");
    }
  }, [props.show]);

  function handleInputChange(event) {
    const target = event.target;
    if (target.name === "name") {
      setName(target.value);
      props.setEnabled(
        props.shouldBeEnabled({ name: target.value, description })
      );
    } else {
      setDescription(target.value);
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    if (name) props.onSubmit({ name, description });
  }

  return (
    <form id={props.formName} onSubmit={onSubmit}>
      <label htmlFor="name">Item name:</label>
      <br />
      <input
        className={styles.input}
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        onSubmit={(e) => e.preventDefault()}
      />
      <br />
      <label htmlFor="desc">Description:</label>
      <br />
      <textarea
        className={styles.input}
        name="desc"
        value={description}
        onChange={handleInputChange}
      />
      <br />
    </form>
  );
}
