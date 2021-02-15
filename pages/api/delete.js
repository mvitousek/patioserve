// @flow

import { deleteItem } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  deleteItem(req.body);
  res.status(200).end();
}
