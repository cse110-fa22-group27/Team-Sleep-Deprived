window.addEventListener('load', () => {
	// TODO: Get yearly spending value -> sum all expenses from all wallets
	let yearlySpending = 0;
	document.getElementById('yearly-spending').innerHTML = 'Yearly Spending: $' + yearlySpending;
});

window.addEventListener('load', () => {
  let xLabels = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// Sample Values - TODO: loop over transactions from each month, assign to yValues
	let yValues = [2500, 3500, 3000, 2100, 1000, 1500, 1250, 500, 750, 900, 1000, 1500];
	// let yMax = Math.max.apply(null, yValues);

	new Chart("report-chart", {
    type: 'bar',
		data: {
			labels: xLabels,
			datasets: [{
				data: yValues
			}]
		},
		options: {
			legend: {
				display: false
			},
			tooltips: {
				enabled: false
			}
		}
	});
});