// ✅ Load environment variables first
require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const cors = require("cors");
const path = require("path");

// ✅ Log loaded environment values
console.log("🧪 Loaded Factory Address:", process.env.FACTORY_CONTRACT_ADDRESS);
console.log("🌐 Using RPC URL:", process.env.SEPOLIA_RPC_URL);

// ✅ Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static frontend files
const frontendPath = path.join(__dirname, "frontend");
app.use(express.static(frontendPath));

// ✅ Default route - redirect to login.html
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "login.html"));
});

// ✅ Setup ethers.js provider
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// ✅ Initialize campaign factory contract
const factoryAddress = process.env.FACTORY_CONTRACT_ADDRESS;
if (!factoryAddress) {
    console.error("❌ FACTORY_CONTRACT_ADDRESS is not set in .env");
    process.exit(1);
}

const factoryAbi = [
    "function createCampaign(bytes32, bytes32) public",
    "function getAllCampaigns() public view returns (tuple(address,bytes32,bytes32,address)[])"
];

const campaignFactory = new ethers.Contract(factoryAddress, factoryAbi, provider);

// ✅ API: Fetch all campaigns
app.get("/my-campaigns", async (req, res) => {
    try {
        console.log("📡 Fetching all campaigns...");
        const campaigns = await campaignFactory.getAllCampaigns();

        const formatted = campaigns.map(c => ({
            campaignAddress: c[0],
            name: ethers.utils.parseBytes32String(c[1]),
            type: ethers.utils.parseBytes32String(c[2]),
            owner: c[3]
        }));

        console.log(`✅ Retrieved ${formatted.length} campaigns`);
        res.status(200).json({ campaigns: formatted });
    } catch (err) {
        console.error("❌ Error fetching campaigns:", err);
        res.status(500).json({ error: "Error fetching campaigns", details: err.message });
    }
});

// 🚫 POST routes are blocked (only frontend/MetaMask allowed)
app.post("/create-campaign", (req, res) => {
    res.status(403).json({ error: "Campaign creation must be done via MetaMask frontend!" });
});

app.post("/pay-campaign", (req, res) => {
    res.status(403).json({ error: "Payments must be made via MetaMask frontend!" });
});

// ✅ Start server on EB-compatible address
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
