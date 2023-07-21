const dataContainer = document.getElementById("data");
const ctx = document.getElementById("myChart");
const graphData = [];

createChart();

async function createChart() {
  await getData();

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...graphData.map((obj) => obj.day)],
      datasets: [
        {
          label: "$",
          data: [...graphData.map((obj) => obj.amount)],
          borderWidth: 0,
          borderRadius: 4,
          backgroundColor: "#EC775F",
          display: false,
          hoverBackgroundColor: "#76B5BC",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          border: {
            display: false,
          },
          ticks: {
            display: false,
          },
          grid: {
            drawOnChartArea: false,
            display: false,
          },
        },
      },
    },
  });
}

async function getData() {
  const response = await fetch("data/data.json");
  const data = await response.json();
  if (response.ok) {
    graphData.unshift(...data);
  }
}
