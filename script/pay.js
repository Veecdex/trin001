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

function setWalletBalance(amount) {

  localStorage.setItem(
    "walletBalance",
    amount
  );
}

// ==========================
// TRANSACTIONS
// ==========================

const storedTransactions =
  JSON.parse(
    localStorage.getItem("transactions")
  ) || [];

const defaultTransactions = [

  {
    id: "TXN-948520",
    type: "credit",
    category: "customer_payment",
    amount: 75000,
    customer: "John Doe",
    orderId: "ORD-1004",
    status: "successful",
    date: "23 May 2026 • 12:14 PM"
  },

  {
    id: "TXN-948521",
    type: "credit",
    category: "customer_payment",
    amount: 42000,
    customer: "Sarah James",
    orderId: "ORD-1005",
    status: "successful",
    date: "23 May 2026 • 11:10 AM"
  },

  {
    id: "TXN-948522",
    type: "withdrawal",
    category: "withdrawal",
    amount: 200000,
    bankName: "GTBank",
    accountNumber: "3281",
    status: "successful",
    date: "22 May 2026 • 08:45 AM"
  }

];

const transactions = [
  ...storedTransactions,
  ...defaultTransactions
];

const container =
  document.getElementById(
    "transactionsContainer"
  );

const searchInput =
  document.getElementById(
    "transactionSearch"
  );

const filterSelect =
  document.getElementById(
    "transactionFilter"
  );

// ==========================
// FORMAT
// ==========================

function formatAmount(amount) {

  return "₦" +
    Number(amount).toLocaleString();
}

// ==========================
// RENDER WALLET
// ==========================

function renderWalletBalance() {

  const wallet =
    getWalletBalance();

  const walletEl =
    document.getElementById(
      "walletBalance"
    );

  if (walletEl) {

    walletEl.textContent =
      formatAmount(wallet);
  }
}

// ==========================
// RENDER TRANSACTIONS
// ==========================

function renderTransactions(data) {

  if (!container) return;

  if (!data.length) {

    container.innerHTML = `
      <div class="p-12 text-center">
        <p class="text-slate-500">
          No transactions found.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    data.map(txn => {

      const isCredit =
        txn.type === "credit";

      let title = "";
      let subtitle = "";
      let icon = "";

      if (
        txn.category ===
        "customer_payment"
      ) {

        title = "Customer Payment";

        subtitle =
          `${txn.customer} • ${txn.orderId}`;

        icon = "shopping-cart";

      }

      else if (
        txn.category ===
        "product_sale"
      ) {

        title = "Product Sale";

        subtitle =
          `${txn.product}`;

        icon = "shopping-bag";

      }

      else {

        title = "Bank Withdrawal";

        subtitle =
          `${txn.bankName} • ****${txn.accountNumber}`;

        icon = "landmark";
      }

      return `
        <div class="p-5 border-b border-slate-100 hover:bg-slate-50 transition">

          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div class="flex gap-4">

              <div class="
                w-12 h-12 rounded-xl
                ${isCredit ? "bg-green-100" : "bg-red-100"}
                flex items-center justify-center
              ">

                <i
                  data-lucide="${icon}"
                  class="
                    w-5 h-5
                    ${isCredit ? "text-green-600" : "text-red-600"}
                  ">
                </i>

              </div>

              <div>

                <h3 class="font-semibold">
                  ${title}
                </h3>

                <p class="text-sm text-slate-500">
                  ${txn.id}
                </p>

                <p class="text-sm text-slate-500">
                  ${subtitle}
                </p>

              </div>

            </div>

            <div class="text-left lg:text-right">

              <div class="
                text-lg font-bold
                ${isCredit ? "text-green-600" : "text-red-600"}
              ">

                ${isCredit ? "+" : "-"}
                ${formatAmount(txn.amount)}

              </div>

              <p class="text-sm text-slate-500">
                ${txn.date}
              </p>

            </div>

          </div>

        </div>
      `;

    }).join("");

  lucide.createIcons();
}

// ==========================
// FILTERS
// ==========================

function applyFilters() {

  const searchTerm =
    searchInput.value
    .toLowerCase()
    .trim();

  const filterValue =
    filterSelect.value;

  const filtered =
    transactions.filter(txn => {

      const matchesSearch =

        txn.id
        .toLowerCase()
        .includes(searchTerm)

        ||

        (txn.customer || "")
        .toLowerCase()
        .includes(searchTerm)

        ||

        (txn.bankName || "")
        .toLowerCase()
        .includes(searchTerm)

        ||

        (txn.product || "")
        .toLowerCase()
        .includes(searchTerm);

      let matchesFilter = true;

      if (filterValue !== "all") {

        matchesFilter =

          txn.type === filterValue ||

          txn.category === filterValue;
      }

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  renderTransactions(filtered);
}

// ==========================
// EVENTS
// ==========================

if (searchInput) {

  searchInput.addEventListener(
    "input",
    applyFilters
  );
}

if (filterSelect) {

  filterSelect.addEventListener(
    "change",
    applyFilters
  );
}

// ==========================
// INIT
// ==========================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderTransactions(
      transactions
    );

    renderWalletBalance();
  }
);
function updateTotalCredits() {

  const totalCredits =
    transactions
    .filter(txn => txn.type === "credit")
    .reduce(
      (sum, txn) =>
        sum + Number(txn.amount),
      0
    );

  // UPDATE TRANSACTION PAGE CARD
  document
    .getElementById("totalCredits")
    .textContent =
    "₦" +
    totalCredits.toLocaleString();

}
renderTransactions(transactions);
updateTotalCredits();