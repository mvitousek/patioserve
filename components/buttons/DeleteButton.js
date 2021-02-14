//@flow

import * as React from "react";

import Modal from "../Modal";
import ActionButton from "./ActionButton";

type ButtonProps = {
  itemID: number,
  itemName: ?string,
};

export default function DeleteButton({ itemName }: ButtonProps): React.Node {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let name = itemName ?? "item";

  return (
    <>
      <ActionButton text="×" onClick={handleShow} />
      <Modal show={show} onCancel={handleClose} onConfirm={handleClose}>
        Plese confirm deletion of {name}.
      </Modal>
    </>
  );
}
