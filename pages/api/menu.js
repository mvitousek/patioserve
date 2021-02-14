// @flow

import { getMenu } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  let toSend = getMenu();
  res.status(200).json(toSend);
}
