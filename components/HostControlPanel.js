// @flow

import * as React from "react";

import styles from "./HostControlPanel.module.css";
import utilStyles from "../styles/utils.module.css";
import EditModal from "./EditModal";
import EditRaw from "./EditRaw";
import type { Menu } from "../lib/ItemTypes";
import { canConvertStringToMenu, menuToString } from "../lib/ParseMenu";

type Props = {
  reset: () => void,
  onSetBulk: (string) => void,
  menu: Menu,
};

export default function HostControlPanel({
  reset,
  menu,
  onSetBulk,
}: Props): React.Node {
  const [raw, setRaw] = React.useState("");

  return (
    <div style={{ paddingTop: "2ex" }}>
      <div className="pure-g">
        <div className={`pure-u-1-2 ${utilStyles.centeredButtonContainer}`}>
          <button className={`pure-button ${styles.button}`} onClick={reset}>
            Reset orders
          </button>
        </div>
        <div className={`pure-u-1-2 ${utilStyles.centeredButtonContainer}`}>
          <EditModal
            shouldBeEnabled={(cat) =>
              cat != null && canConvertStringToMenu(cat)
            }
            formName={"editraw"}
            onSubmit={onSetBulk}
            itemInfo={raw}
            Editor={EditRaw}
            size="Large"
            Button={({ onClick }) => (
              <button
                className={`pure-button ${styles.button}`}
                onClick={() => {
                  setRaw(menuToString(menu));
                  onClick();
                }}
              >
                Bulk edit
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
}
