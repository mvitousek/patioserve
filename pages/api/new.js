// @flow

import { newItem } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  const reqBody = JSON.parse(req.body);
  newItem(reqBody.categoryID, reqBody.itemInfo);
  res.status(200).end();
}
