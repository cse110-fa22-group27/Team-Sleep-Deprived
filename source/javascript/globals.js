/**
 * @author Ashwin Rohit Alagiri Rajan
 */

/**
 * @typedef {Object} transaction-object
 * @property {String} name Name of the transaction
 * @property {Date} date Date of the transaction
 * @property {Number} amount Can be +ve or -ve
 * @property {String} description
 */

/**
 * @typedef {Object} wallet-object
 * @property {String} name Name of the wallet
 * @property {Array<transaction-object>} transactions
 * @property {Number} 'total-amount'
 * @property {Number} target Monthly spending target
 * @property {boolean} includedInTotal
 */

/**
 * @typedef {Object} user-object
 * @property {String} username
 * @property {String} password
 * @property {Array<wallet-object>} 'wallet-objects'
 * @property {Number} 'preferred-default-page' The page that appears when the user logs in
 */

import { getAllUsersObject, setAllUsersObject } from './database.js';


/**
 * Sets the global username object for the currently logged in user
 * @param {String} username
 */
function setCurrentUsername(username) {
	localStorage.setItem('currentUsername', username);
}

/**
 * Get the currently logged in user's username
 * @returns The username of the currently logged in user
 */
function getCurrentUsername() {
	return localStorage.getItem('currentUsername');
}

/**
 * This function checks if the user is logged in for the current page, then if the user is not logged in, it redirects the user to the login page.
 */
async function checkIfUserIsLoggedIn() {
	// check that the current page is not the signup page
	if (window.location.href.includes('signup.html') || window.location.href.includes('login.html')) {
		return;
	}
	// check if the user is logged in
	const currentUsername = getCurrentUsername();
	if (!currentUsername) {
		window.location.replace('../html/login.html');
	}
}

checkIfUserIsLoggedIn();

async function setUserNameForLogoutButton() {
	const logoutDiv = document.querySelector('.user-logout');
	const username = getCurrentUsername();
	if(!username) {
		return;
	}
	logoutDiv.querySelector('.username').innerHTML = `<em>Hi, ${username}!</em>`;
}

setUserNameForLogoutButton();

let currentUserSet = false;
let currentUser = {};

/**
 * Gets the current user object
 * @returns The current user object
 */
async function getCurrentUser() {
	if(!currentUserSet) {
		currentUserSet = true;
		const allUsers = await getAllUsersObject();
		const currentUsername = getCurrentUsername();
		currentUser = allUsers[currentUsername];
	}
	return currentUser;
}

/**
 * Updates the database with any modifications applied to the current user.
 * @param {user-object | null} optionalCurrentUser If the parameter is provided the database will replace the current user with the parameter, else the global current user object will be used. 
 */
async function updateCurrentUser(optionalCurrentUser) {
	let curUser = currentUser;
	if(optionalCurrentUser) {
		curUser = optionalCurrentUser;
	}
	const allUsers = await getAllUsersObject();
	const currentUsername = getCurrentUsername();
	allUsers[currentUsername] = curUser;
	setAllUsersObject(allUsers);
}

/**
 * Gets the wallets for the current user
 * @returns All the wallets for the currently logged in user
 */
async function getCurrentUserWallets() {
	const currentUsr = await getCurrentUser();
	return currentUsr['wallets'];
}

/**
 * Sets the wallets list for the current user
 * @param {wallet-object} wallets 
 */
async function setCurrentUserWallets(wallets) {
	currentUser['wallets'] = wallets;
	updateCurrentUser();
}

async function resetGlobalInfo() {
	currentUserSet = false;
	currentUser = {};
	setCurrentUsername('');
	localStorage.removeItem('currentWalletName');
	localStorage.removeItem('rememberme');
}

export { getAllUsersObject, setAllUsersObject, setCurrentUsername, getCurrentUsername, getCurrentUser, updateCurrentUser, getCurrentUserWallets, setCurrentUserWallets, resetGlobalInfo };