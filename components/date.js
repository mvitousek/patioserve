// @flow

import * as React from "react";

import { parseISO, format } from "date-fns";

export default function Date({
  dateString,
}: {
  dateString: string,
}): React.Node {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
