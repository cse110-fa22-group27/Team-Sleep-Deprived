import { resetGlobalInfo } from './globals.js';

function logout() {
	resetGlobalInfo();
	window.location.replace('../html/login.html');
}

const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', logout);