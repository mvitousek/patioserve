//@flow

import * as React from "react";

import ActionButton from "./ActionButton";
import type { ItemType } from "../../lib/ItemTypes";
import EditItem from "../EditItem";
import Modal from "../Modal";

type ButtonProps = {
  itemInfo?: ItemType,
  itemID: number,
  onSubmit: (ItemType) => void,
};

export default function EditButton({
  itemInfo,
  itemID,
  onSubmit,
}: ButtonProps): React.Node {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formName = `edititem_${itemID}`;

  return (
    <>
      <ActionButton text="e" onClick={handleShow} />
      <Modal
        show={show}
        onCancel={handleClose}
        onConfirm={handleClose}
        formName={formName}
      >
        <EditItem
          show={show}
          onSubmit={onSubmit}
          formName={formName}
          itemInfo={itemInfo ?? { name: "", description: "" }}
        />
      </Modal>
    </>
  );
}
