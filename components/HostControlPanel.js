// @flow

import * as React from "react";

import styles from "./HostControlPanel.module.css";
import utilStyles from "../styles/utils.module.css";

type Props = {
  reset: () => void,
};

export default function HostControlPanel({ reset }: Props): React.Node {
  return (
    <div style={{ paddingTop: "2ex" }}>
      <div className="pure-g">
        <div className={`pure-u-1-2 ${utilStyles.centeredButtonContainer}`}>
          <button className={`pure-button ${styles.button}`} onClick={reset}>
            Reset orders
          </button>
        </div>
        <div className={`pure-u-1-2 ${utilStyles.centeredButtonContainer}`}>
          <button className={`pure-button ${styles.button}`}>Bulk edit</button>
        </div>
      </div>
    </div>
  );
}
