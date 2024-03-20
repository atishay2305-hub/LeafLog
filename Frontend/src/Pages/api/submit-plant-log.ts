// frontend/src/pages/api/submit-plant-log.ts

// import necessary modules for handling API requests
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Here, instead of directly interacting with MongoDB,
      // You should send a request to your backend Express server.
      const backendResponse = await fetch(
        "http://localhost:3000/your-backend-endpoint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      if (!backendResponse.ok) {
        throw new Error("Backend failed");
      }

      const responseData = await backendResponse.json();
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
