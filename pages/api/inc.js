// @flow

import { incrementCount } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  const count = incrementCount(Number.parseInt(req.body));
  res.status(200).json({ count });
}
