// @flow

import * as React from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "./Layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name = "Mike and Amanda's";
const onlyLogo = true;
const logoHeight = 144;
const logoWidth = 220;
export const siteTitle = `${name} — Patioserve`;

export default function Layout({
  children,
}: {
  children: React.Node,
}): React.Node {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Live menu for backyard gatherings" />
      </Head>
      <header className={styles.header}>
        <Image
          priority
          src="/images/logo.jpg"
          height={logoHeight}
          width={logoWidth}
          alt={name}
        />
        {!onlyLogo && <h1 className={utilStyles.heading2Xl}>{name}</h1>}
      </header>
      <main>{children}</main>
    </div>
  );
}
