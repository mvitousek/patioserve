// @flow

import * as React from "react";

import styles from "./HostGuestButton.module.css";

import Link from "next/link";

export default function HostGuestButton({
  href,
  text,
}: {
  href: string,
  text: string,
}): React.Node {
  return (
    <Link href={href}>
      <a>
          <button className={`pure-button ${styles.hostGuestButton}`}>
            {text}
          </button>
      </a>
    </Link>
  );
}
