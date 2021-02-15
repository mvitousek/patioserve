//@flow

import * as React from "react";

import Modal from "./Modal";

type Props = {
  itemName: ?string,
  onSubmit: () => void,
  Button: React.ComponentType<{ onClick: () => void }>,
};

export default function DeleteModal({
  itemName,
  onSubmit,
  Button,
}: Props): React.Node {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let name = itemName ?? "item";

  return (
    <>
      <Button onClick={handleShow} />
      <Modal
        show={show}
        onCancel={handleClose}
        onConfirm={() => {
          onSubmit();
          handleClose();
        }}
        confirmEnabled={true}
      >
        Plese confirm deletion of {name}.
      </Modal>
    </>
  );
}
