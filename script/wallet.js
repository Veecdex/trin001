// ==========================
// WALLET CORE (STANDALONE)
// ==========================

function getWalletBalance() {
    const stored = localStorage.getItem("walletBalance");
  
    // default value if nothing exists
    if (stored === null) {
      const defaultBalance = 935000;
  
      localStorage.setItem(
        "walletBalance",
        defaultBalance
      );
  
      return defaultBalance;
    }
  
    return Number(stored);
  }
  
  function setWalletBalance(amount) {
    localStorage.setItem(
      "walletBalance",
      amount
    );
  }