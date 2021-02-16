//@flow

import * as React from "react";

import Head from "next/head";
import HostInterface from "../components/HostInterface";
import Layout, { siteTitle } from "../components/Layout";
import { getMenu } from "../lib/AvailableItems";
import { type MenuInfo } from "../lib/ItemTypes";

export async function getServerSideProps(): Promise<{ props: MenuInfo }> {
  const menuItems = await getMenu();
  return {
    props: menuItems,
  };
}

export default function Home(menuItems: MenuInfo): React.Node {
  return (
    <Layout>
      <Head>
        <title>{`Host — ${siteTitle}`}</title>
      </Head>
      <HostInterface {...menuItems} />
    </Layout>
  );
}
