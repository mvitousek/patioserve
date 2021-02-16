// @flow

import { decrementCount } from "../../lib/AvailableItems";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req: any, res: any) {
  decrementCount(req.body).then(
    (count) => res.status(200).json({ count }),
    () => res.status(500).send()
  );
}
