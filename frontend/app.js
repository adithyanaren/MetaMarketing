document.addEventListener("DOMContentLoaded", function () { 
    let provider, signer, userWallet;
    const connectWalletButton = document.getElementById("connectWallet");
    const createCampaignButton = document.getElementById("createCampaign");
    const viewCampaignsButton = document.getElementById("viewCampaigns");
    const payCampaignButton = document.getElementById("payCampaign");

    // Replace with your deployed contract addresses
    const factoryContractAddress = "0xc587b076e7388b175622a8c41e5727e3882ea60f"; 
    const factoryAbi = [
        "function createCampaign(bytes32 name, bytes32 campaignType) public",
        "function getAllCampaigns() public view returns (tuple(address, bytes32, bytes32, address)[])"
    ];

    async function connectWallet() {
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            userWallet = await signer.getAddress();
            document.getElementById("walletAddress").innerText = `Connected: ${userWallet}`;
            console.log("✅ Wallet connected:", userWallet);
        } else {
            alert("❌ MetaMask is not installed!");
        }
    }

    async function createCampaign() {
        const name = document.getElementById("campaignName").value;
        const type = document.getElementById("campaignType").value;

        if (!name || !type) {
            alert("Enter campaign name and type.");
            return;
        }

        try {
            console.log("🚀 Creating campaign on blockchain...");
            const factoryContract = new ethers.Contract(factoryContractAddress, factoryAbi, signer);
            const tx = await factoryContract.createCampaign(
                ethers.utils.formatBytes32String(name), 
                ethers.utils.formatBytes32String(type)
            );
            await tx.wait();
            alert("✅ Campaign created successfully!");
            console.log("✅ Campaign created!");
        } catch (error) {
            console.error("❌ Error creating campaign:", error);
            alert("Error creating campaign. Check console.");
        }
    }

    async function viewCampaigns() {
        try {
            console.log("📡 Fetching all campaigns...");
            const factoryContract = new ethers.Contract(factoryContractAddress, factoryAbi, provider);
            const campaigns = await factoryContract.getAllCampaigns();

            if (campaigns.length === 0) {
                document.getElementById("campaignList").innerHTML = "No campaigns found.";
                return;
            }

            document.getElementById("campaignList").innerHTML = campaigns.map(
                (c) => `<li>${ethers.utils.parseBytes32String(c[1])} - Address: ${c[0]}</li>`
            ).join("");
                        

            console.log("✅ Campaigns loaded:", campaigns);
        } catch (error) {
            console.error("❌ Error fetching campaigns:", error);
            alert("Error fetching campaigns. Check console.");
        }
    }

    async function payForCampaign() {
        const campaignAddress = document.getElementById("campaignAddress").value;
        
        if (!campaignAddress) {
            alert("Enter the campaign address to pay for.");
            return;
        }

        try {
            console.log(`💰 Paying for campaign at ${campaignAddress}...`);
            const campaignAbi = ["function markAsPaid() public payable"]; // ✅ Corrected function name
            const campaignContract = new ethers.Contract(campaignAddress, campaignAbi, signer);

            const tx = await campaignContract.markAsPaid({ value: ethers.utils.parseEther("0.01") });
            await tx.wait();
            alert("✅ Payment successful!");
            console.log("✅ Payment completed!");
        } catch (error) {
            console.error("❌ Error processing payment:", error);
            alert("Error processing payment. Check console.");
        }
    }

    // Event Listeners
    connectWalletButton.addEventListener("click", connectWallet);
    createCampaignButton.addEventListener("click", createCampaign);
    viewCampaignsButton.addEventListener("click", viewCampaigns);
    payCampaignButton.addEventListener("click", payForCampaign);
});
