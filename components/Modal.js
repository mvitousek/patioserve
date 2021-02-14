//@flow

import * as React from "react";

import ReactDOM from "react-dom";

import styles from "./Modal.module.css";
import utilStyles from "../styles/utils.module.css";

import { Context } from "./HostInterface";

type Props = {
  show: boolean,
  children: React.Node,
  formName?: string,
  onCancel: () => void,
  onConfirm?: () => void,
  width?: number,
};

export default function Modal(props: Props): React.Node {
  const modalNode = React.useContext(Context);

  return modalNode
    ? ReactDOM.createPortal(
        <div
          style={{ display: props.show ? "block" : "none" }}
          className={styles.modal}
        >
          <div
            style={props.width != null ? { width: `${props.width}%` } : {}}
            className={styles.modalContent}
          >
            {props.children}
            <div style={{ paddingTop: "1em" }}>
              <div className="pure-g">
                <div
                  className={`pure-u-1-2 ${utilStyles.centeredButtonContainer}`}
                >
                  <button
                    className={`pure-button ${styles.button}`}
                    onClick={props.onCancel}
                  >
                    Cancel
                  </button>
                </div>
                <div
                  className={`pure-u-1-2 ${utilStyles.centeredButtonContainer}`}
                >
                  <button
                    className={`pure-button ${styles.button}`}
                    form={props.formName}
                    onClick={props.onConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        modalNode
      )
    : null;
}
