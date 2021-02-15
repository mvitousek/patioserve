//@flow

import * as React from "react";

import { type Props as EditProps } from "./EditItem";
import Modal from "./Modal";

type Props<T> = {
  itemInfo?: T,
  formName: string,
  onSubmit: (T) => void,
  shouldBeEnabled: (?T) => boolean,
  Editor: React.ComponentType<EditProps<T>>,
  Button: React.ComponentType<{ onClick: () => void }>,
  size?: "Large" | "Small",
};

export default function EditModal<T>({
  itemInfo,
  formName,
  onSubmit,
  shouldBeEnabled,
  Editor,
  Button,
  size,
}: Props<T>): React.Node {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [enabled, setEnabled] = React.useState(shouldBeEnabled(itemInfo));

  React.useEffect(() => {
    setEnabled(shouldBeEnabled(itemInfo));
  }, [itemInfo]);

  return (
    <>
      <Button onClick={handleShow} />
      <Modal
        show={show}
        onCancel={handleClose}
        formName={formName}
        confirmEnabled={enabled}
        size={size}
      >
        <Editor
          show={show}
          onSubmit={(item) => {
            handleClose();
            onSubmit(item);
          }}
          setEnabled={setEnabled}
          shouldBeEnabled={shouldBeEnabled}
          formName={formName}
          itemInfo={itemInfo}
        />
      </Modal>
    </>
  );
}
