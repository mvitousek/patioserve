// @flow

import { getMenu } from "../../lib/AvailableItems";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req: any, res: any) {
  getMenu().then(
    (toSend) => res.status(200).json(toSend),
    () => res.status(500).send()
  );
}
