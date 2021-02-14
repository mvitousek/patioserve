//@flow

import * as React from "react";

import styles from "./ActionButton.module.css";
import utilStyles from "../../styles/utils.module.css";

type Props = {
  isEnabled?: boolean,
  onClick?: () => void,
  text: string,
};

export default function ActionButton({
  isEnabled,
  onClick,
  text,
}: Props): React.Node {
  let enabled = isEnabled == null || isEnabled ? "" : "pure-button-disabled";
  return (
    <div className={`pure-u-1-2 ${utilStyles.centeredButtonContainer}`}>
      <button
        className={`pure-button ${styles.button} ${enabled}`}
        onClick={onClick}
      >
        <div className={utilStyles.orderPanelText}>{text}</div>
      </button>
    </div>
  );
}
