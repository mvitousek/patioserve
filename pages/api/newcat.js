// @flow

import { newCategory } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  newCategory(req.body);
  res.status(200).end();
}
