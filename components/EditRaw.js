//@flow

import * as React from "react";

import styles from "./EditRaw.module.css";
import * as EditItem from "./EditItem";

export default function EditRaw(props: EditItem.Props<string>): React.Node {
  const [body, setBody] = React.useState(props.itemInfo ?? "");

  React.useEffect(() => {
    if (props.show) {
      setBody(props.itemInfo ?? "");
    }
  }, [props.show]);

  function handleInputChange(event) {
    const target = event.target;
    setBody(target.value);
    props.setEnabled(props.shouldBeEnabled(target.value));
  }

  function onSubmit(event) {
    event.preventDefault();
    if (body) props.onSubmit(body);
  }

  return (
    <form id={props.formName} onSubmit={onSubmit}>
      <label htmlFor="name">Raw menu:</label>
      <br />
      <textarea
        className={styles.input}
        name="raw"
        value={body}
        onChange={handleInputChange}
      />
      <br />
    </form>
  );
}
