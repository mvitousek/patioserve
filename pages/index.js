//@flow

import * as React from "react";

import Head from "next/head";
import GuestInterface from "../components/GuestInterface";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getMenu } from "../lib/AvailableItems";
import { type MenuType } from "../lib/ItemTypes";

export async function getStaticProps(): Promise<{ props: MenuType }> {
  const menuItems = getMenu();
  return {
    props: menuItems,
  };
}

export default function Home(menuItems: MenuType): React.Node {
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <GuestInterface {...menuItems} />
      <section className={utilStyles.headingMd}>
        <p>It's Mike</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
      </section>
    </Layout>
  );
}
