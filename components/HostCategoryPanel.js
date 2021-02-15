// @flow

import * as React from "react";

import styles from "./HostCategoryPanel.module.css";
import utilStyles from "../styles/utils.module.css";
import type { ItemType, CategoryID } from "../lib/ItemTypes";
import Modal from "./Modal";
import EditItem from "./EditItem";
import DeleteModal from "./DeleteModal";

type Props = {
  count: number,
  category: string,
  categoryID: CategoryID,
  onAdd: (CategoryID, ItemType) => void,
  onDelete: (CategoryID) => void,
};

export default function HostCategoryPanel({
  count,
  category,
  categoryID,
  onAdd,
  onDelete,
}: Props): React.Node {
  const [showEdit, setShowEdit] = React.useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [enabled, setEnabled] = React.useState(false);

  const formName = `additem_${String(categoryID)}`;

  let deleteCategory = <></>;
  if (count === 0) {
    deleteCategory = (
      <span className={styles.buttonSpan}>
        <DeleteModal
          Button={({ onClick }) => (
            <button
              className={`pure-button ${styles.button}`}
              onClick={onClick}
            >
              ×
            </button>
          )}
          itemName={category}
          onSubmit={() => onDelete(categoryID)}
        />
      </span>
    );
  }
  return (
    <>
      <span className={utilStyles.categoryTitle}>{category}</span>
      <span className={styles.buttonSpan}>
        <button
          className={`pure-button ${styles.button}`}
          onClick={handleShowEdit}
        >
          +
        </button>
      </span>
      {deleteCategory}
      <Modal
        show={showEdit}
        onCancel={handleCloseEdit}
        formName={formName}
        confirmEnabled={enabled}
      >
        <EditItem
          show={showEdit}
          onSubmit={(itemType) => {
            handleCloseEdit();
            onAdd(categoryID, itemType);
          }}
          formName={formName}
          itemInfo={{ name: "", description: "" }}
          setEnabled={setEnabled}
          shouldBeEnabled={(info) => info?.name != null && info.name !== ""}
        />
      </Modal>
    </>
  );
}
