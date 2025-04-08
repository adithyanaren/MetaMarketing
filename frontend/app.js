document.addEventListener("DOMContentLoaded", function () {
    let provider, signer, userWallet;

    const factoryContractAddress = "0xc587b076e7388b175622a8c41e5727e3882ea60f"; 
    const factoryAbi = [
        "function createCampaign(bytes32 name, bytes32 campaignType) public",
        "function getAllCampaigns() public view returns (tuple(address, bytes32, bytes32, address)[])"
    ];

    // Check if wallet is already connected
    if (localStorage.getItem("userWallet")) {
        userWallet = localStorage.getItem("userWallet");
        document.getElementById("walletAddress").innerText = `Connected: ${userWallet}`;
    }

    async function connectWallet() {
        if (window.ethereum) {
            try {
                provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                signer = provider.getSigner();
                userWallet = await signer.getAddress();
                localStorage.setItem("userWallet", userWallet); // Store in localStorage
                document.getElementById("walletAddress").innerText = `Connected: ${userWallet}`;
                console.log("✅ Wallet connected:", userWallet);
            } catch (err) {
                console.error("❌ Wallet connection failed:", err);
            }
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
            const factoryContract = new ethers.Contract(factoryContractAddress, factoryAbi, signer);
            const tx = await factoryContract.createCampaign(
                ethers.utils.formatBytes32String(name),
                ethers.utils.formatBytes32String(type)
            );
            await tx.wait();
            alert("✅ Campaign created successfully!");
        } catch (error) {
            console.error("❌ Error creating campaign:", error);
        }
    }

    async function viewCampaigns() {
        try {
            const factoryContract = new ethers.Contract(factoryContractAddress, factoryAbi, provider);
            const campaigns = await factoryContract.getAllCampaigns();
            const campaignList = document.getElementById("campaignList");

            campaignList.innerHTML = "";
            campaigns.forEach((c) => {
                const campaignItem = document.createElement("li");
                campaignItem.textContent = `${ethers.utils.parseBytes32String(c[1])} - Address: ${c[0]}`;
                campaignList.appendChild(campaignItem);
            });
        } catch (error) {
            console.error("❌ Error fetching campaigns:", error);
        }
    }

    async function payCampaign() {
        const campaignAddress = document.getElementById("campaignAddress").value;
        if (!campaignAddress) {
            alert("Enter the campaign address.");
            return;
        }

        try {
            const campaignAbi = ["function markAsPaid() public payable"];
            const campaignContract = new ethers.Contract(campaignAddress, campaignAbi, signer);
            const tx = await campaignContract.markAsPaid({ value: ethers.utils.parseEther("0.01") });
            await tx.wait();
            alert("✅ Payment successful!");
        } catch (error) {
            console.error("❌ Error processing payment:", error);
        }
    }

    // Event Listeners
    document.getElementById("connectWallet")?.addEventListener("click", connectWallet);
    document.getElementById("createCampaign")?.addEventListener("click", createCampaign);
    document.getElementById("viewCampaigns")?.addEventListener("click", viewCampaigns);
    document.getElementById("payCampaign")?.addEventListener("click", payCampaign);
});
