"use strict";
let stocks = [
    { name: "Apple", symbol: "AAPL", price: 150 },
    { name: "Amazon", symbol: "AMZN", price: 3300 },
    { name: "Tesla, Inc", symbol: "TSLA", price: 700 },
    { name: "NVIDIA Corporation", symbol: "NVDA", price: 220 },
    { name: "Meta", symbol: "META", price: 350 },
    { name: "Netflix", symbol: "NFLX", price: 50 }
];
let portfolio = [];
let balance = 10000;
function updateStockPrices() {
    for (let stock of stocks) {
        const change = (Math.random() - 0.5) * 10;
        stock.price = Math.max(1, stock.price + change);
    }
}
function renderStocks() {
    const container = document.getElementById("stock-list");
    container.innerHTML = "<h2>Available Stocks</h2>";
    stocks.forEach((stock, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>${stock.symbol}</strong>: $${stock.price.toFixed(2)}
        `;
        const buyBtn = document.createElement("button");
        buyBtn.textContent = "Buy";
        buyBtn.addEventListener("click", () => buyStock(index));
        const sellBtn = document.createElement("button");
        sellBtn.textContent = "Sell";
        sellBtn.addEventListener("click", () => sellStock(index));
        div.appendChild(buyBtn);
        div.appendChild(sellBtn);
        container.appendChild(div);
    });
}
function renderPortfolio() {
    const container = document.getElementById("portfolio");
    container.innerHTML = `<p>Balance: $${balance.toFixed(2)}</p>`;
    if (portfolio.length === 0) {
        container.innerHTML += "<p>No holdings.</p>";
        return;
    }
    portfolio.forEach(holding => {
        container.innerHTML += `<p>${holding.stock.symbol}: ${holding.quantity} shares</p>`;
    });
}
function buyStock(index) {
    const stock = stocks[index];
    if (balance >= stock.price) {
        balance -= stock.price;
        const existingHolding = portfolio.find(h => h.stock.symbol === stock.symbol);
        if (existingHolding) {
            existingHolding.quantity += 1;
        }
        else {
            portfolio.push({ stock, quantity: 1 });
        }
        renderPortfolio();
    }
}
function sellStock(index) {
    const stock = stocks[index];
    const existingHolding = portfolio.find(h => h.stock.symbol === stock.symbol);
    if (existingHolding && existingHolding.quantity > 0) {
        existingHolding.quantity -= 1;
        balance += stock.price;
        if (existingHolding.quantity === 0) {
            portfolio = portfolio.filter(h => h.stock.symbol !== stock.symbol);
        }
        renderPortfolio();
    }
}

updateStockPrices();
renderStocks();
renderPortfolio();
function loop() {
    updateStockPrices();
    renderStocks();
    renderPortfolio();
}
setInterval(loop, 3000);
