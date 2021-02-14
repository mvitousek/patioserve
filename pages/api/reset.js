// @flow

import { resetCounts } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  resetCounts();
  res.status(200).end();
}
