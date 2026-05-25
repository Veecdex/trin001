const sales =
JSON.parse(localStorage.getItem("sales")) || [];

function loadDashboardCharts() {

  // SALES OVERVIEW CHART
  const last7Days = {};
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  // Initialize all days
  days.forEach(day => {
    last7Days[day] = 0;
  });

  sales.forEach(sale => {

    const saleDate = new Date(sale.date);

    const dayName =
    days[saleDate.getDay()];

    last7Days[dayName] += Number(sale.total);

  });

  const salesData =
  days.map(day => last7Days[day]);

  const salesCtx =
  document.getElementById("salesChart");

  const gradient =
  salesCtx.getContext("2d")
  .createLinearGradient(
    0,
    0,
    0,
    350
  );

  gradient.addColorStop(
    0,
    "rgba(99,102,241,.35)"
  );

  gradient.addColorStop(
    1,
    "rgba(99,102,241,0)"
  );

  new Chart(salesCtx, {

    type: "line",

    data: {

      labels: days,

      datasets: [{

        data: salesData,

        borderColor: "#6366f1",

        backgroundColor: gradient,

        fill: true,

        tension: 0.45,

        borderWidth: 4,

        pointRadius: 0

      }]
    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false
        }
      }

    }

  });



  // SALES CHANNEL CHART

  const onlineSales =
  sales
  .filter(
    sale => sale.type === "Online"
  )
  .reduce(
    (sum, sale) =>
    sum + Number(sale.total),
    0
  );

  const offlineSales =
  sales
  .filter(
    sale => sale.type === "Offline"
  )
  .reduce(
    (sum, sale) =>
    sum + Number(sale.total),
    0
  );

  const totalSales =
  onlineSales + offlineSales;

  const onlinePercent =
  totalSales
  ? Math.round(
      (onlineSales / totalSales) * 100
    )
  : 0;

  const offlinePercent =
  totalSales
  ? Math.round(
      (offlineSales / totalSales) * 100
    )
  : 0;

  new Chart(
    document.getElementById("channelChart"),
    {

      type: "doughnut",

      data: {

        labels: [
          "Online",
          "Offline"
        ],

        datasets: [{

          data: [
            onlineSales,
            offlineSales
          ],

          backgroundColor: [
            "#6366f1",
            "#e2e8f0"
          ],

          borderWidth: 0

        }]
      },

      options: {

        responsive: true,

        cutout: "75%",

        plugins: {

          legend: {
            display: false
          }

        }

      }

    }
  );



  // UPDATE SALES CHANNEL TEXT

  document.querySelector(
    ".absolute h2"
  ).textContent =
  onlinePercent + "%";

  document.querySelector(
    ".absolute p"
  ).textContent =
  "Online";

  document
  .getElementById("onlineChannelPercent")
  .textContent =
  onlinePercent + "%";

  document
  .getElementById("offlineChannelPercent")
  .textContent =
  offlinePercent + "%";

  document
  .getElementById("onlineChannelAmount")
  .textContent =
  "₦" +
  onlineSales.toLocaleString();

  document
  .getElementById("offlineChannelAmount")
  .textContent =
  "₦" +
  offlineSales.toLocaleString();

}

loadDashboardCharts();