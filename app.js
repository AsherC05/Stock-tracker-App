const dropDownBtn = document.querySelector(".uil-bars");

const dropDownMenu = document.querySelector("#drop-down");

dropDownBtn.addEventListener("click", () => {
  if (dropDownMenu.style.display === "block") {
    dropDownMenu.style.display = "none";
  } else {
    dropDownMenu.style.display = "block";
  }
});

dropDownBtn.addEventListener("slowed", () => {
  dropDownMenu.style.transition = "entry 0.5s ease-in-out";
});

const searchInput = document.querySelector(".search-input");
const companyName = document.querySelector(".comp-name");
const modal = document.getElementById("search-modal");
const closeBtn = document.querySelector(".uil-times");
const resultsContainer = document.querySelector(".stock-results-list");

const assets = [
  { ticker: "AAPL", name: "Apple Inc.", type: "stock" },
  { ticker: "AMZN", name: "Amazon.com", type: "stock" },
  { ticker: "GOOGL", name: "Google LLC", type: "stock" },
  { ticker: "MSFT", name: "Microsoft Corporation", type: "stock" },
  { ticker: "META", name: "Meta Platforms Inc.", type: "stock" },
  { ticker: "NVDA", name: "NVIDIA Corporation", type: "stock" },
  { ticker: "BTC", name: "Bitcoin", type: "crypto" },
  { ticker: "ETH", name: "Ethereum", type: "crypto" },
  { ticker: "USDT", name: "Tether", type: "crypto" },
  { ticker: "ADA", name: "Cardano", type: "crypto" },
  { ticker: "SOL", name: "Solana", type: "crypto" },
  { ticker: "XRP", name: "Ripple Labs Inc.", type: "crypto" },
];

// 1. The Correct Event Listener Syntax
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  // 2. Check for matching first 3 letters
  if (query.length <= 3) {
    filterAndHighlight(query);
  } else {
    // Optional: Clear results or show 'suggested' if less than 3 chars
    clearResults();
  }
});

function filterAndHighlight(term) {
  // This assumes you have an array of stock objects or are filtering existing DOM elements
  const stockItems = document.querySelectorAll(".stock-item");

  stockItems.forEach((item) => {
    const nameElement = item.querySelector(".company-name");
    const tickerElement = item.querySelector(".ticker");
    const nameText = nameElement.textContent;
    const tickerText = tickerElement.textContent;

    if (
      nameText.toLowerCase().includes(term) ||
      tickerText.toLowerCase().includes(term)
    ) {
      item.style.display = "flex"; // Show match

      // 3. Apply Highlighting
      const regex = new RegExp(`(${term})`, "gi");
      nameElement.innerHTML = nameText.replace(
        regex,
        `<span class="highlight">$1</span>`,
      );
      tickerElement.innerHTML = tickerText.replace(
        regex,
        `<span class="highlight">$1</span>`,
      );
    } else {
      item.style.display = "none"; // Hide non-match
    }
  });
}

// 1. OPEN: Only when "Enter" is pressed
searchInput.addEventListener("keydown", (e) => {
  // If the user types something and hits Enter
  if (e.key === "Enter" && searchInput.value.trim() !== "") {
    modal.style.display = "flex";

    // Optional: Log what they searched for to test
    console.log("Searching for:", searchInput.value);
  }
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.le) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
});

// 2. CLOSE: When clicking the blurred background
window.addEventListener("click", (e) => {
  // Logic: If the thing clicked is exactly the #search-modal (the dark blur),
  // and NOT the white box inside it, then close it.
  if (e.target === modal) {
    modal.style.display = "none";
    searchInput.value = ""; // Optional: Clear search on close
  }
});

// 3. CLOSE: When clicking the "X" button
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  searchInput.value = ""; // Optional: Clear search on close
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

const slider = document.querySelector(".view-slider");
const rightArrow = document.querySelector(".uil-arrow-right");
const leftArrow = document.querySelector(".uil-arrow-left");

let currentIndex = 0;
const totalCompanies = 6; // Apple, Amazon, Google, Microsoft, Meta, Nvidia

rightArrow.addEventListener("click", () => {
  if (currentIndex < totalCompanies - 1) {
    currentIndex++;
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;
  }
});

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;
  }
});

const stockTab = document.querySelector("#show-stocks");
const cryptoTab = document.querySelector("#show-crypto");
const stocksDropdown = document.querySelector("#stocks-dropdown");
const cryptoDropdown = document.querySelector("#crypto-dropdown");
const selectTab = document.querySelector("#select-tab");
const categoryArrowBtn = document.querySelector(".symbol-tabs i");

stockTab.addEventListener("click", () => {
  if (
    stocksDropdown.style.display === "block" ||
    cryptoDropdown.style.display === ""
  ) {
    stocksDropdown.style.display = "none";
    selectTab.style.display = "block";
  } else {
    selectTab.style.display = "none";
    stocksDropdown.style.display = "block";
    cryptoDropdown.style.display = "none";
  }
});

cryptoTab.addEventListener("click", () => {
  if (
    cryptoDropdown.style.display === "block" ||
    stocksDropdown.style.display === ""
  ) {
    cryptoDropdown.style.display = "none";
    selectTab.style.display = "block";
  } else {
    selectTab.style.display = "none";
    cryptoDropdown.style.display = "block";
    stocksDropdown.style.display = "none";
  }
});

selectTab.style.display = "block";
stocksDropdown.style.display = "none";
cryptoDropdown.style.display = "none";

categoryArrowBtn.style.transition = "transform 0.3s ease-in-out";

stockTab.addEventListener("click", () => {
  if (stocksDropdown.style.display === "block") {
    categoryArrowBtn.style.active = false;
    categoryArrowBtn.style.borderColor = "none";
  } else {
    categoryArrowBtn.style.active = true;
    categoryArrowBtn.style.borderColor = "red";
  }
});

// 1. Function to create and add the portfolio row
const portfolioList = document.getElementById("portfolio-list");

// 1. Function to create and add the portfolio row
function addToPortfolio(symbol) {
  // Create the wrapper div
  const row = document.createElement("div");
  row.className = "portfolio-row fade-in"; // Added fade-in for smooth entry

  // Your specific design structure
  row.innerHTML = `
        <div class="asset-label">${symbol}:</div>
        <div class="shares-controls">
            <span>Number of shares</span>
            <div class="input-group">
                <span class="share-input" id="share-quantity">0</span>
                <button class="plus-btn" id="increment"><i class="uil uil-plus"></i></button>
                <button class="minus-btn" id="decrement"><i class="uil uil-minus"></i></button>
            </div>
        </div>
        <div class="value-display">
            <span>Position value:</span>
            <div class="price-box">$ 0</div>
        </div>
        <div id="buy-btn">
          <button class="buy"><i class="uil-usd-circle"> Buy</i></button>
        </div>
        <div class="delete-btn">
          <button class="trash"><i class="uil uil-trash"></i></button>
        </div>
    `;

  // Append to the bottom of the list
  portfolioList.appendChild(row);
}

// 2. Attach click listeners to your existing Symbols/Search items
document.addEventListener("click", (e) => {
  // Check if the clicked element is a stock-item or inside one
  const stockItem = e.target.closest(".stock-item");
  if (stockItem) {
    const ticker = stockItem.querySelector(".ticker").textContent;
    addToPortfolio(ticker);
  }
});

document.addEventListener("click", (e) => {
  const trashBtn = e.target.closest(".trash");

  if (trashBtn) {
    const row = trashBtn.closest(".portfolio-row");

    row.style.opacity = "0";
    row.style.transform = "translateX(20px)";

    setTimeout(() => {
      row.remove();
    }, 500);
  }
});

// 1. Helper to clean price strings
const cleanPrice = (str) => parseFloat(str.replace(/[$,]/g, ""));

// 2. Listen for clicks inside the portfolio list
portfolioList.addEventListener("click", (e) => {
  // Find the row where the click happened
  const row = e.target.closest(".portfolio-row");
  if (!row) return;

  // Find the elements specific to THIS row
  const quantityDisplay = row.querySelector("#share-quantity");
  const priceBox = row.querySelector(".price-box");

  // Get the base price from the original stock list (matching the ticker)
  const ticker = row.querySelector(".asset-label").textContent.replace(":", "");
  const stockItems = document.querySelectorAll(".stock-item");
  let basePrice = 0;

  // Find the price for this specific ticker
  stockItems.forEach((item) => {
    if (item.querySelector(".ticker").textContent === ticker) {
      basePrice = cleanPrice(item.querySelector(".price").textContent);
    }
  });

  let currentQty = parseInt(quantityDisplay.textContent) || 0;

  // Handle Increment
  if (e.target.closest("#increment")) {
    currentQty++;
    updateRow(quantityDisplay, priceBox, currentQty, basePrice);
  }

  // Handle Decrement
  if (e.target.closest("#decrement")) {
    if (currentQty > 0) {
      currentQty--;
      updateRow(quantityDisplay, priceBox, currentQty, basePrice);
    }
  }
});

// 3. Helper to update the UI
function updateRow(display, box, qty, price) {
  display.textContent = qty;
  const total = qty * price;
  box.textContent = `$ ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

// 4. Buy Button Handler - Add position value to balance and shares to stock-count
portfolioList.addEventListener("click", (e) => {
  const buyBtn = e.target.closest(".buy");

  if (buyBtn) {
    const row = buyBtn.closest(".portfolio-row");

    // Get the share quantity and position value from this specific row
    const shareQuantity = parseInt(row.querySelector("#share-quantity").textContent) || 0;
    const positionValueText = row.querySelector(".price-box").textContent;
    const positionValue = parseFloat(positionValueText.replace(/[$,]/g, ""));

    // Only process if there are shares to buy
    if (shareQuantity > 0 && positionValue > 0) {
      // Get wallet elements
      const balanceSpan = document.querySelector(".balance");
      const stockCountSpan = document.querySelector(".stock-count");

      // Get current values (parse them as numbers)
      const currentBalance = parseFloat(balanceSpan.textContent) || 0;
      const currentStockCount = parseInt(stockCountSpan.textContent) || 0;

      // Add the new values to existing ones (NOT replacing)
      const newBalance = currentBalance + positionValue;
      const newStockCount = currentStockCount + shareQuantity;

      // Update the wallet display
      balanceSpan.textContent = newBalance.toLocaleString(undefined, { minimumFractionDigits: 2 });
      stockCountSpan.textContent = newStockCount;

      // Optional: Reset the portfolio row after purchase
      row.querySelector("#share-quantity").textContent = "0";
      row.querySelector(".price-box").textContent = "$ 0.00";
    }
  }
});
