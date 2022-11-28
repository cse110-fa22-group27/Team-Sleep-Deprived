import { setCurrentUsername, resetGlobalInfo } from './globals.js';

function logout() {
	resetGlobalInfo();
	window.location.replace('../html/signin.html');
}

const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', logout);