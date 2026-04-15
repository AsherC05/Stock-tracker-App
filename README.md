# 📈 Interactive Stock & Crypto Portfolio Manager

A dynamic front-end application built with Vanilla JavaScript that allows users to search for assets, track market prices, and manage a mock investment portfolio with real-time balance updates.

---

## 🚀 Key Features

### 1. **Smart Search & Discovery**
* **Live Filtering:** Filters the asset list instantly as you type.
* **Visual Highlighting:** Automatically highlights matching characters in the ticker or company name using Regex.
* **Keyboard Navigation:** Open the search modal by pressing **Enter** and close it with **Escape**.
* **Contextual Modals:** High-performance modal logic that handles backdrop clicks and "X" button triggers.

### 2. **Interactive UI Components**
* **Navigation Toggle:** Mobile-responsive sidebar/dropdown menu functionality.
* **Asset Slider:** A smooth, CSS-transform-based carousel to browse featured companies (Apple, Amazon, Google, etc.).
* **Tab Switching:** Dedicated views for **Stocks** and **Crypto** with active state indicators and arrow animations.

### 3. **Portfolio Management System**
* **Dynamic Asset Addition:** Click any search result or list item to instantly inject a new row into your portfolio.
* **Real-time Calculators:**
    * Increment/Decrement share counts.
    * Automatic calculation of **Position Value** based on the asset's current market price.
* **Smooth Deletion:** Remove assets with a custom "slide-and-fade" animation and DOM cleanup.

### 4. **Transaction Logic (The "Wallet")**
* **Buy Execution:** Clicking "Buy" processes the transaction by adding the position value to your **Total Balance** and updating the **Total Stock Count**.
* **State Reset:** Successfully bought assets reset their row values to prevent accidental duplicate purchases.

---

## 🛠️ Technical Breakdown

### **Event Delegation**
To ensure high performance and handle elements created dynamically (like new portfolio rows), the script uses **Event Delegation**. Instead of attaching hundreds of listeners, it watches parent containers:

```javascript
portfolioList.addEventListener("click", (e) => {
  const row = e.target.closest(".portfolio-row");
  // Logic to handle clicks on specific buttons inside the row...
});
