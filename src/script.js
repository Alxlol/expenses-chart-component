const dataContainer = document.getElementById("data");
const graphData = [];
const graphDays = [];
const graphValues = [];
const ctx = document.getElementById("myChart");

createChart();

async function createChart() {
  await getData();
  getDays();
  getValues();
  console.log(graphDays[day - 1]);
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...graphDays],
      datasets: [
        {
          label: "$",
          data: [...graphValues],
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

function getDays() {
  for (let i = 0; i < graphData.length; i++) {
    graphDays.push(graphData[i].day);
  }
}
function getValues() {
  for (let i = 0; i < graphData.length; i++) {
    graphValues.push(graphData[i].amount);
  }
}

const d = new Date();
let day = d.getDay();
