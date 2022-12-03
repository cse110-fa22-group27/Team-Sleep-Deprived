/**
 * Handles all of the changes to user settings such as
 * changing default page and changing password
 * 
 * @author: Andrew Nguyen/Shuo Wang
 */

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

// sets dropdown to users preferred default page
document.getElementsByClassName('default-page-chooser')[0].selectedIndex = currentUser['preferred-default-page'];

/**
 * Disables Save Button when we first get on page,
 * only disable reset if the preffered default page is not dashboard
 */
function disableButtons() {
	// disables Save button at start
	saveSettings.style.opacity = 0.5;
	saveSettings.disabled = true;

	// disables Reset button if User Preferred Page is Dashboard
	if (dropDown.options[dropDown.selectedIndex].value == 'dashboard') {
		resetSettings.style.opacity = 0.5;
		resetSettings.disabled = true;

	}
}
disableButtons();

/**
 * Changes reset button to enabled when we change value in select menu
 */
dropDown.addEventListener('change', (event) => {
	// only does not change if user default is dashboard and current option is dashboard
	if ((event.target.value != 'dashboard') && (currentUser['preferred-default-page'] == 0)) {
		saveSettings.style.opacity = 1;
		saveSettings.disabled = false;
	}
	// only does not change if user default is wallets and current option is wallets
	else if ((event.target.value != 'wallets') && (currentUser['preferred-default-page'] == 1)) {
		saveSettings.style.opacity = 1;
		saveSettings.disabled = false;
	}
	// only does not change if user default is reports and current option is reports
	else if ((event.target.value != 'reports') && (currentUser['preferred-default-page'] == 2)) {
		saveSettings.style.opacity = 1;
		saveSettings.disabled = false;
	}

	// Disables save and reset button if current option is dashboard 
	// and dashboard is user preferred page
	if ((event.target.value == 'dashboard') && (currentUser['preferred-default-page'] == 0)) {
		resetSettings.style.opacity = 0.5;
		resetSettings.disabled = true;
		saveSettings.style.opacity = 0.5;
		saveSettings.disabled = true;
	} 
	// Disables save button if current option is wallets and wallets is user preferred page
	else if ((event.target.value == 'wallets') && (currentUser['preferred-default-page'] == 1)) {
		saveSettings.style.opacity = 0.5;
		saveSettings.disabled = true;
	} 
	// Disables save button if current option is reports and reports is user preferred page
	else if ((event.target.value == 'reports') && (currentUser['preferred-default-page'] == 2)) {
		saveSettings.style.opacity = 0.5;
		saveSettings.disabled = true;
	} 
});

/**
 * Changes save button to enabled if there is text inside the inputs
 * For password 
 */
document.querySelector('[name="new-password"]').addEventListener('input', () => {
	let currNew = document.querySelector('[name="new-password"]').value;
	if (currNew == '') {
		saveSettings.style.opacity = 0.5;
		saveSettings.disabled = true;
	}
	else {
		saveSettings.style.opacity = 1;
		saveSettings.disabled = false;
	}
});

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
				document.querySelector('[name="old-password"]').value = "";
				document.querySelector('[name="new-password"]').value = "";
				alert('Password Changed');
			}
		}

		else if (oldPassword == '' && newPassword != '') {
			throw new Error('Please input current password!');
		}
		else if (oldPassword != '' && newPassword == '') {
			throw new Error('Please input new password!');
		}

		// Based on preferred page, changes user's preferred page and loads it
		if (input == 'dashboard'){
			currentUser['preferred-default-page'] = 0;
			//alert("Updated Default Page to DashBoard!")
		}
		else if (input == 'wallets'){
			currentUser['preferred-default-page'] = 1;
			//alert("Updated Default Page to Wallets!");
		}
		else if(input == 'reports'){
			currentUser['preferred-default-page'] = 2;
			//alert("Updated Default Page to Reports!");
		}

		updateCurrentUser(currentUser);
		
		saveSettings.textContent = 'Saved!';
		saveSettings.style.opacity = 0.5;
		saveSettings.disabled = true;

		window.setTimeout(() => {
			saveSettings.textContent = 'Save';
		}, 500)

		// window.location.reload();

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
	//alert("Reset Default Page to Dashboard!");
	window.location.reload();
});

