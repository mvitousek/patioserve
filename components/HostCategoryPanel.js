// @flow

import * as React from "react";

import styles from "./HostCategoryPanel.module.css";
import utilStyles from "../styles/utils.module.css";

type Props = {
  count: number,
  category: string,
};

export default function HostCategoryPanel({
  count,
  category,
}: Props): React.Node {
  let deleteCategory = <></>;
  if (count === 0) {
    deleteCategory = (
      <span className={styles.buttonSpan}>
        <button className={`pure-button ${styles.button}`}>×</button>
      </span>
    );
  }
  return (
    <>
      <span className={utilStyles.categoryTitle}>{category}</span>
      <span className={styles.buttonSpan}>
        <button className={`pure-button ${styles.button}`}>+</button>
      </span>
      {deleteCategory}
    </>
  );
}
