// @flow

import { setNameDesc } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  const reqBody = JSON.parse(req.body);
  setNameDesc(reqBody.id, reqBody.itemInfo);
  res.status(200).end();
}
