const express = require("express");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Load environment variables
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// Campaign Factory Contract (Ensure it is deployed first)
const factoryAddress = process.env.FACTORY_CONTRACT_ADDRESS;
const factoryAbi = [
    "function createCampaign(bytes32, bytes32) public",
    "function getAllCampaigns() public view returns (tuple(address,bytes32,bytes32,address)[])"
];

// Initialize Factory Contract
const campaignFactory = new ethers.Contract(factoryAddress, factoryAbi, provider);

app.get("/", (req, res) => {
    res.send("✅ MetaMarketing Backend is Running!");
});

// 🔹 Fetch All Campaigns
app.get("/my-campaigns", async (req, res) => {
    try {
        console.log("📡 Fetching all campaigns from blockchain...");
        const campaigns = await campaignFactory.getAllCampaigns();

        if (campaigns.length === 0) {
            return res.status(200).json({ message: "No campaigns found", campaigns: [] });
        }

        const formattedCampaigns = campaigns.map((c) => ({
            campaignAddress: c[0],
            name: ethers.utils.parseBytes32String(c[1]),
            type: ethers.utils.parseBytes32String(c[2]),
            owner: c[3],
        }));

        console.log("✅ Campaigns retrieved:", formattedCampaigns);
        res.status(200).json({ campaigns: formattedCampaigns });
    } catch (error) {
        console.error("❌ Error fetching campaigns:", error);
        res.status(500).json({ error: "Error fetching campaigns", details: error.message });
    }
});

// 🔹 Prevent direct campaign creation (handled via frontend & MetaMask)
app.post("/create-campaign", async (req, res) => {
    res.status(403).json({ error: "Campaign creation must be done via MetaMask frontend!" });
});

// 🔹 Prevent direct payments (handled via frontend & MetaMask)
app.post("/pay-campaign", async (req, res) => {
    res.status(403).json({ error: "Payments must be made via MetaMask frontend!" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
