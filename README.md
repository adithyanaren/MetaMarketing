# MetaMarketing 🎯

MetaMarketing is a **Web3-based crowdfunding dApp** that connects campaign creators and donors using blockchain technology.
It enables users to create, view, and fund campaigns securely through **MetaMask** wallet integration, ensuring transparency and trust.

---

## 🚀 Features

* 🔐 **MetaMask Integration** – secure login and wallet-based authentication.
* 📢 **Campaign Management** – create and browse fundraising campaigns.
* 💸 **Donation System** – contribute to campaigns directly via blockchain.
* 📊 **Dashboard** – view campaigns, donations, and funding progress.
* 🌐 **Decentralized** – powered by smart contracts for transparency.
* 🌈 **Responsive Frontend** – built with HTML, CSS, and JavaScript.

---

## 🛠 Tech Stack

* **Frontend**: HTML5, CSS3, JavaScript, Bootstrap
* **Web3**: MetaMask, Ethereum (Testnet)
* **Backend**: Node.js, Express.js
* **Deployment**: AWS Elastic Beanstalk / Heroku
* **Version Control**: Git & GitHub

---

## 📂 Project Structure

```
MetaMarketingAppFinal/
│── frontend/               # Frontend code
│   ├── campaigns.html
│   ├── dashboard.html
│   ├── donate.html
│   ├── fund.html
│   ├── login.html
│   ├── metamask.js
│   ├── app.js
│   └── css/
│
│── server.js               # Backend server
│── package.json            # Dependencies
│── Procfile                # Deployment config
│── fix_ebs.sh              # AWS EB setup script
│── start_backend.bat       # Local startup script
│── .env                    # Environment variables
│── node_modules/           # Installed dependencies
```

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/adithyanaren/MetaMarketing.git
cd MetaMarketing
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file in the project root:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_database_connection
INFURA_API_KEY=your_infura_key
```

### 4️⃣ Run Locally

```bash
node server.js
```

Visit 👉 `http://localhost:5000`

---

## 🌍 Deployment

### Deploy to AWS Elastic Beanstalk

```bash
eb init
eb create metamarketing-env
eb deploy
```

### Deploy to Heroku

```bash
heroku login
heroku create metamarketing-app
git push heroku main
```

---

## 📸 Screenshots

*Add screenshots of the app here (UI, campaigns, dashboard).*
For example:

* **Campaigns Page**
* **Donation Flow**
* **Dashboard**

---

## 🤝 Contribution

1. Fork the repo
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added feature"`)
4. Push to branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify.

---

## 👨‍💻 Author

* **Adithya Naren**
  🌐 [LinkedIn](https://www.linkedin.com/in/adhithya0616/) | 💻 [GitHub](https://github.com/adithyanaren)

---

✨ *MetaMarketing – Decentralizing the way we fund ideas.*
