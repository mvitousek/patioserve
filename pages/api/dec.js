// @flow

import { decrementCount } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  const count = decrementCount(Number.parseInt(req.body));
  res.status(200).json({ count });
}
