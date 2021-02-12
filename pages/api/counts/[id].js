// @flow

import { getCount } from "../../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  const {
    query: { id },
  } = req;

  const count = getCount(Number.parseInt(id));

  res.status(200).json({ count });
}
