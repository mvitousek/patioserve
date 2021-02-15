// @flow

import { setRaw } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  setRaw(req.body);
  res.status(200).end();
}
