// @flow

import { deleteCategory } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  deleteCategory(req.body);
  res.status(200).end();
}
