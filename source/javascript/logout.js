/**
 * @author Ashwin Rohit Alagiri Rajan
 * @fileoverview This file contains the logout function which is used to log the user out
 */
import { resetGlobalInfo } from './globals.js';

/**
 * Logs the user out by resetting the global info and redirecting to the login page
 */
function logout() {
	resetGlobalInfo();
	window.location.replace('../html/login.html');
}

const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', logout);