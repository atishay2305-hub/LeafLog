// pages/api/submit-plant-log.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../../../Backend/config/mongoCollections.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { db } = await users();
      const { plantSpecies, petName, otherNotes } = req.body;
      // Add the plant log entry to the user's document...
      // You'll need to modify this part to add the entry to the user's data
      const response = await db.collection("plantLogs").insertOne({
        plantSpecies,
        petName,
        otherNotes,
        createdAt: new Date(),
      });

      res.status(200).json({ success: true, data: response });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
