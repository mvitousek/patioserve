// @flow

import * as React from "react";

import "../styles/global.css";
import "purecss";

export default function App<Props>({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<Props>,
  pageProps: Props,
}): React.Node {
  return <Component {...pageProps} />;
}
