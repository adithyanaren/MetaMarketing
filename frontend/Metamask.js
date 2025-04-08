// metamask.js
class MetaMaskConnector {
    constructor() {
        this.account = null;
        this.isConnected = false;
    }

    async connect() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.account = accounts[0];
                this.isConnected = true;
                localStorage.setItem("metamaskAccount", this.account);
                console.log("Connected to MetaMask:", this.account);
                return this.account;
            } catch (error) {
                console.error("MetaMask connection error:", error);
                return null;
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask.");
            return null;
        }
    }

    async checkConnection() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    this.account = accounts[0];
                    this.isConnected = true;
                    localStorage.setItem("metamaskAccount", this.account);
                    return this.account;
                } else {
                    this.isConnected = false;
                    localStorage.removeItem("metamaskAccount");
                    return null;
                }
            } catch (error) {
                console.error("Error checking MetaMask connection:", error);
                return null;
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask.");
            return null;
        }
    }

    disconnect() {
        this.account = null;
        this.isConnected = false;
        localStorage.removeItem("metamaskAccount");
        console.log("Disconnected from MetaMask.");
        alert("Logged out successfully.");
        window.location.href = "login.html";
    }

    getAccount() {
        return this.account || localStorage.getItem("metamaskAccount");
    }
}

const metaMaskConnector = new MetaMaskConnector();
export default metaMaskConnector;
