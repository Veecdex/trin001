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

    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],

    datasets: [{

      data: [
        140,
        280,
        220,
        420,
        310,
        600,
        520
      ],

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
    },

    scales: {

      x: {
        grid: {
          display: false
        }
      },

      y: {
        grid: {
          color: "#f1f5f9"
        },
        border: {
          display: false
        }
      }

    }

  }

});

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
        78,
        22
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

});