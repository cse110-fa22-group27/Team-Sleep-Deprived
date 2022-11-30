// Imports useful functions from other files
import { getCurrentUser, updateCurrentUser } from './globals.js';

const currentUser = await getCurrentUser();

// Grabs Necessary buttons
const saveSettings = document.querySelector('#save-button');
const resetSettings = document.querySelector('#reset-button');
// Grabs the dropdown to get user's preferred page
const dropDown = document.querySelector('.default-page-chooser');

const minPasswordLen = 5;
const maxPasswordLen = 20;
const passwordRegex = new RegExp(`\\w{${minPasswordLen},${maxPasswordLen}}`);

document.getElementsByClassName('default-page-chooser')[0].selectedIndex = currentUser['preferred-default-page'];

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

		// Based on preferred page, changes user's preferred page and loads it
		if (input == 'dashboard'){
			currentUser['preferred-default-page'] = 0;
		}
		else if (input == 'wallets'){
			currentUser['preferred-default-page'] = 1;
		}
		else if(input == 'reports'){
			currentUser['preferred-default-page'] = 2;
		}

		updateCurrentUser(currentUser);
	}
	// catches any errors
	catch (err) {
		alert(err);
	}
	
});

/**
 * Resets the default page to the Dashboard page
 */
resetSettings.addEventListener('click', function() {
	currentUser['preferred-default-page'] = 0;
	updateCurrentUser(currentUser);
});