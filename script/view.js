function renderDashboardSales() {

  const sales =
  JSON.parse(localStorage.getItem("sales")) || [];

  const totalSales =
  sales.reduce(
      (sum, sale) =>
      sum + Number(sale.total || 0),
      0
  );

  document.getElementById(
      "dashboardTotalSales"
  ).textContent =
  "₦" + totalSales.toLocaleString();
}

renderDashboardSales();