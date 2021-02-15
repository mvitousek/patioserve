//@flow

import * as React from "react";

import styles from "./EditCategory.module.css";
import * as EditItem from "./EditItem";

export default function EditCategory(
  props: EditItem.Props<string>
): React.Node {
  const [info, setInfo] = React.useState(props.itemInfo ?? "");

  React.useEffect(() => {
    if (props.show) {
      setInfo(props.itemInfo ?? "");
    }
  }, [props.show]);

  function handleInputChange(event) {
    const target = event.target;
    setInfo(target.value);
    props.setEnabled(props.shouldBeEnabled(target.value));
  }

  function onSubmit(event) {
    event.preventDefault();
    if (info) props.onSubmit(info);
  }

  return (
    <form id={props.formName} onSubmit={onSubmit}>
      <label htmlFor="name">Category name:</label>
      <br />
      <input
        className={styles.input}
        type="text"
        name="name"
        value={info}
        onChange={handleInputChange}
        onSubmit={(e) => e.preventDefault()}
      />
      <br />
    </form>
  );
}
