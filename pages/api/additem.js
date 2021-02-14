import { addDummyItem } from "../../lib/AvailableItems";

export default function handler(req: any, res: any) {
  addDummyItem();
  res.status(200).json({});
}
