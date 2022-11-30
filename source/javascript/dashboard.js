
window.addEventListener("load", (event) => {
	console.log("page is fully loaded");
	var flex = document.querySelector('.flex-container');
	var form = document.createElement('trans-form');

	// update select (tested using local storage)
	form.data =  JSON.parse(localStorage.getItem("wallets") || "[]");
	// flex.append(form);
});