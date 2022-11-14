window.addEventListener('load', () => {
    // TODO: Get yearly spending value
    let yearlySpending = 0;
    document.getElementById('yearly-spending').innerHTML = "Yearly Spending: $" + yearlySpending;

});

window.addEventListener('load', () => {
    let xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // Sample Values
    let yValues = [2500, 3500, 3000, 2100, 1000, 1500, 1250, 500, 750, 900, 1000, 1500];

new Chart("report-chart", {
    type: "bar",
    data: {
      labels: xLabels,
      datasets: [{
        data: yValues
      }]
    },
  });
});
