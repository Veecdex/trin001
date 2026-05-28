// ==========================
// WALLET CORE
// ==========================

function getWalletBalance() {

  let wallet =
    localStorage.getItem(
      "walletBalance"
    );

  // DEFAULT VALUE
  if (wallet === null) {

    wallet = 935000;

    localStorage.setItem(
      "walletBalance",
      wallet
    );
  }

  return Number(wallet);
}

// ==========================
// DASHBOARD SALES
// ==========================

function renderDashboardSales() {

  const sales =
    JSON.parse(
      localStorage.getItem("sales")
    ) || [];

  const totalSales =
    sales.reduce(
      (sum, sale) =>
        sum + Number(sale.total || 0),
      0
    );

  const salesEl =
    document.getElementById(
      "dashboardTotalSales"
    );

  if (salesEl) {

    salesEl.textContent =
      "₦" +
      totalSales.toLocaleString();
  }
}

// ==========================
// DASHBOARD ORDERS
// ==========================

function loadDashboardOrders() {

  const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

  const ordersEl =
    document.getElementById(
      "dashboardOrders"
    );

  const successfulEl =
    document.getElementById(
      "dashboardSuccessfulOrders"
    );

  const pendingEl =
    document.getElementById(
      "dashboardPendingOrders"
    );

  if (ordersEl) {

    ordersEl.textContent =
      orders.length;
  }

  if (successfulEl) {

    successfulEl.textContent =
      orders.filter(
        o => o.status === "Successful"
      ).length;
  }

  if (pendingEl) {

    pendingEl.textContent =
      orders.filter(
        o => o.status === "Pending"
      ).length;
  }
}

// ==========================
// DASHBOARD CUSTOMERS
// ==========================

function loadDashboardCustomers() {

  const customers =
    JSON.parse(
      localStorage.getItem("customers")
    ) || [];

  const customersEl =
    document.getElementById(
      "dashboardCustomers"
    );

  if (customersEl) {

    customersEl.textContent =
      customers.length;
  }
}

// ==========================
// DASHBOARD WALLET
// ==========================

function loadDashboardWallet() {

  const walletBalance =
    getWalletBalance();

  const walletEl =
    document.getElementById(
      "dashboardWalletBalance"
    );

  if (walletEl) {

    walletEl.textContent =
      "₦" +
      walletBalance.toLocaleString();
  }
}

// ==========================
// REFRESH
// ==========================

function refreshDashboard() {

  renderDashboardSales();

  loadDashboardOrders();

  loadDashboardCustomers();

  loadDashboardWallet();
}

// ==========================
// INIT
// ==========================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    refreshDashboard();

    window.addEventListener(
      "storage",
      refreshDashboard
    );
  }
);