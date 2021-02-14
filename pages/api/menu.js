// @flow

import { getMenu, getCounts } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  let toSend = getMenu();
  res.status(200).json(toSend);
}
