// @flow

import { setNameDesc } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  const reqBody = JSON.parse(req.body);
  setNameDesc(Number.parseInt(reqBody.id), reqBody.name, reqBody.description);
  res.status(200).end();
}
