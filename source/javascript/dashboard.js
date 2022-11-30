window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    var flex = document.querySelector('.flex-container');
    var form = document.createElement('trans-form');
    var recent = document.createElement('rec-act');
    flex.append(form, recent);
  });