//@flow

import * as React from "react";

import ActionButton from "./ActionButton";
import type { ItemType } from "../../lib/ItemTypes";
import EditItem from "../EditItem";
import Modal from "../Modal";

type ButtonProps = {
  itemID: number,
  itemInfo?: ItemType,
};

const FORMNAME = "edititem";

export default function EditButton({
  itemID,
  itemInfo,
}: ButtonProps): React.Node {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ActionButton text="e" onClick={handleShow} />
      <Modal
        show={show}
        onCancel={handleClose}
        onConfirm={handleClose}
        formName={FORMNAME}
      >
        <EditItem
          show={show}
          formName={FORMNAME}
          itemInfo={itemInfo ?? { name: "", description: "" }}
        />
      </Modal>
    </>
  );
}
