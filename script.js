// variables
const chartMon = document.querySelector(".spending__main__chart--mon");
const chartTue = document.querySelector(".spending__main__chart--tue");
const chartWed = document.querySelector(".spending__main__chart--wed");
const chartThu = document.querySelector(".spending__main__chart--thu");
const chartFri = document.querySelector(".spending__main__chart--fri");
const chartSat = document.querySelector(".spending__main__chart--sat");
const chartSun = document.querySelector(".spending__main__chart--sun");

const red = "hsl(10, 79%, 65%)";
const redHover = "hsl(10, 79%, 65%, 0.8)";
const blue = "hsl(186, 34%, 60%)";
const blueHover = "hsl(186, 34%, 60%, 0.8)";
var myChart = document.getElementById("myChart");
let days = [];
let values = [];
let background = [];
let backgroundHover = [];
let viewportWidth = top.innerWidth;

// functions
function test(data) {
  var max = Math.max.apply(
    null,
    data.map((a) => Number(a.amount))
  );
  data.forEach((element) => {
    days.push(element.day);
    values.push(Number(element.amount));
    if (element.amount === max) {
      background.push(blue);
      backgroundHover.push(blueHover);
    } else {
      background.push(red);
      backgroundHover.push(redHover);
    }
  });
  const chart = new Chart("myChart", {
    type: "bar",
    data: {
      labels: days,
      datasets: [
        {
          backgroundColor: background,
          hoverBackgroundColor: backgroundHover,
          data: values,
          borderRadius: 5,
          borderSkipped: false, // To make all side rounded
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // remove legend
        },
        tooltip: {
          enabled: () => (viewportWidth > 600 ? true : false),
          displayColors: false, // remove color pallet
          caretSize: 0, // remove arrow
          yAlign: "above",
          xAliyn: "center",
          bodyFont: {
            size: 18, // label font size
          },
          //   boxHeight: bodyFont.11;
          callbacks: {
            title: () => null, // remove title
            label: (e) => "$" + e.parsed.y, // format label
          },
        },
      },

      // Remove gird
      scales: {
        x: {
          grid: {
            display: false, // remove grid lines
            drawBorder: false, // remove axis line
          },
        },
        y: {
          grid: {
            display: false, // remove grid lines
            drawBorder: false, // remove axis line
          },
          ticks: {
            display: false, // remove ticks
          },
        },
      },
    },
  });
}

// data json data
fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => test(jsondata));

addEventListener("resize", (event) => {
  viewportWidth = top.innerWidth;
});
