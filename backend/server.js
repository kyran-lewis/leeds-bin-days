import express from "express";
import cors from "cors";
import { getBinDays } from "./utils.js";
import postcodes from "./postcodes.json" with { type: "json" };
const app = express();

app.use(cors()); // allow your frontend to talk to this API
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Binny API" });
});

app.get("/addresses", (req, res) => {
  const { postcode } = req.query;

  if (!postcode) {
    return res.status(400).json({
      message: "Missing required query parameter: postcode",
    });
  }

  // TODO: add postcode regex validation

  const addresses = postcodes[postcode] ?? [];

  if (addresses.length <= 0) {
    return res.status(404).json({
      message: "No addresses found for this postcode",
    });
  }

  return res.status(200).json(addresses);
});

// GET /api/bins?postcode=LS11UR&house=10
// app.get("/bins", async (req, res) => {
//   const { postcode, houseNumber, uprn } = req.query;

//   if (!postcode) {
//     return res.status(400).json({
//       error: "Missing required query parameter: postcode",
//     });
//   }

//   if (!houseNumber) {
//     return res.status(400).json({
//       error: "Missing required query parameter: house number",
//     });
//   }

//   if (!uprn) {
//     return res.status(400).json({
//       error: "Missing required query parameter: UPRN",
//     });
//   }

//   const binData = await getBinDays(postcode, houseNumber, uprn);

//   try {
//     const binData = {
//       houseNumber: houseNumber,
//       postcode: postcode.toUpperCase(),
//       uprn: uprn,
//       retrievedAt: new Date().toISOString(),
//       bins: binData,
//     };

//     // Send the clean JSON object straight to the frontend
//     return res.status(200).json({
//       success: true,
//       data: binData,
//     });
//   } catch (error) {
//     console.error("Error fetching bin data:", error);
//     return res.status(500).json({
//       success: false,
//       error: "Failed to retrieve bin collection data for this location.",
//     });
//   }
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
