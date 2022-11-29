// Imports useful functions from other files
import { getCurrentUser, updateCurrentUser } from './globals.js';
import { minPasswordLen, maxPasswordLen, passwordRegex, loadDefaultPage } from './login.js';

const currentUser = await getCurrentUser();
// Creates Variables for default page options
const pages = ['../html/dashboard.html', '../html/wallets.html', '../html/report.html'];
// grabs the Save button
const saveSettings = document.querySelector('.glass-box#save-button');
// grabs the reset button
const resetSettings = document.querySelector('.glass-box#reset-button');
// Grabs the dropdown to get user's preferred page
const dropDown = document.querySelector('.default-page-chooser');
// Creates arrays to store page name and index
let dashboard = ['dashboard', 0];
let wallet = ['wallets', 1];
let report = ['reports', 2];

/**
 * Changes Password and/or Changes Preferred Default Page of User
 * Can do change of one category or both categories
 */
saveSettings.addEventListener('click', function() {
	// Grab's users old/new password if inputted
	let oldPassword = document.querySelector('[name="old-password"]').value;
	let newPassword = document.querySelector('[name="new-password"]').value;
	// Grabs user's preferred page
	let input = dropDown.options[dropDown.selectedIndex].value;
	try {
		// Changes password if both inputs are not empty
		if (oldPassword != '' && newPassword != '') {
			changePassword(oldPassword, newPassword);
		}
		changeDefaultPage(input);
	}
	// catches any errors
	catch (err) {
		alert(err.msg);
	}
	// Updates database with user changes and loads default page
	finally {
		// async function just to try something since not working
		async function update(){
			await updateCurrentUser(currentUser);
			loadDefaultPage(currentUser['preferred-default-page']);
		};
		update();
	}
});

/**
 * Resets the default page to the Dashboard page
 */
 resetSettings.addEventListener('click', function() {
	currentUser['preferred-default-page'] = pages[dashboard[1]];
	loadDefaultPage(currentUser['preferred-default-page']);
 });

/**
 * Checks if old password and new password is valid and changes 
 * password if new password is valid and old is correct
 * Throws errors otherwise
 */
function changePassword(oldPassword, newPassword) {
	// Checks if the Old Password is inputted correctly
	if (oldPassword !== currentUser.password){
		throw new Error('Incorrect Password');
	}
	// Checks that the old password is not used for new password
	else if (oldPassword == newPassword) {
		throw new Error('Please Do Not Use The Same Password');
	}
	// Checks new password's length requirements
	else if(newPassword.length <  minPasswordLen || newPassword.length > maxPasswordLen) {
		throw new Error(`Password must be between ${minPasswordLen} and ${maxPasswordLen} characters`);
	}
	// Checks new password's regex requirements
	else if(!passwordRegex.test(newPassword)){
		throw new Error('Password contains character(s) that are not alphanumeric or underscore');
	}
	// sets password if there is no problems with the new password
	else {
		currentUser['password'] = newPassword;
	}
}

/**
 * Grabs the page that user wants to change default page to user preference
 */
function changeDefaultPage(input){
	// Based on preferred page, changes user's preferred page and loads it
	if(input == dashboard[0]){
		currentUser['preferred-default-page'] = pages[dashboard[1]];
	}
	else if(input == wallet[0]){
		currentUser['preferred-default-page'] = pages[wallet[1]];
	}
	else if(input == report[0]){
		currentUser['preferred-default-page'] = pages[report[1]];
	}
};


