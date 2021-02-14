//@flow

import type { ItemType } from "../lib/ItemTypes";

import * as React from "react";

type Props = {
  show: boolean,
  formName: string,
  itemInfo?: ItemType,
};

export default function EditItem(props: Props): React.Node {
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
    } else {
      setDescription(target.value);
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log(name, description);
  }

  return (
    <form id={props.formName} onSubmit={onSubmit}>
      <label htmlFor="name">Item name:</label>
      <br />
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="desc">Description:</label>
      <br />
      <textarea name="desc" value={description} onChange={handleInputChange} />
      <br />
      <br />
    </form>
  );
}
