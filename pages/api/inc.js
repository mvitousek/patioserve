// @flow

import { incrementCount } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  const count = incrementCount(req.body);
  res.status(200).json({ count });
}
