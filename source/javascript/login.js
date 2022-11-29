/**
 * @author Anthony Chen
 * @contributor Ashwin Rohit Alagiri Rajan
 */

import { setCurrentUsername, getCurrentUsername, getCurrentUser, getAllUsersObject, setAllUsersObject } from './globals.js';

const signup = new RegExp('/html/signup.html');
const pages = ['../html/dashboard.html', '../html/wallets.html', '../html/report.html'];
const minPasswordLen = 5;
const maxPasswordLen = 20;
const minUsernameLen = 5;
const maxUsernameLen = 15;
const passwordRegex = new RegExp(`\\w{${minPasswordLen},${maxPasswordLen}}`);
const usernameRegex = new RegExp(`\\w{${minUsernameLen},${maxUsernameLen}}`);

/**
 * Loads the default page set by user upon login/signup 
 * @param {int} defaultPageNumber 0 - dashboard, 1 - wallets, 2 - report
 */
function loadDefaultPage(defaultPageNumber) {
	window.location.replace(pages[defaultPageNumber]);
}

/**
 * Automatically login if user has signed in (but not logged out)
 * @returns 
 */
async function loginAutomatically() {
	let username = getCurrentUsername();
	if(username) {
		const currentUser = await getCurrentUser();
		loadDefaultPage(currentUser['preferred-default-page']);
	}
	return;
}

loginAutomatically();

//Logic for signup window
if(signup.test(window.location.href)){
	let form= document.getElementById('box');
	let terms = document.getElementById('terms');
	
	//Disable submit button by default, until terms and conditions are checked
	document.getElementById('submit').disabled = true;

	form.addEventListener('submit', signUpSubmission);
	terms.addEventListener('click', checkTerms);

}

//Logic for sign-in window
else {
	let form = document.getElementById('box');
	form.addEventListener('submit', signinSubmission, false);
}

/**
 * Converts the data in the form into a new userObject,
 * then loads the preferred default page
 */
async function signinSubmission(){
	let fdata = new FormData(document.getElementById('box'));
	let formObject = {};
	for(const pair of fdata.entries()){
		formObject[`${pair[0]}`] = `${pair[1]}`;
	}

	try{
		setCurrentUsername(formObject['username']);
		const currentUser = await getCurrentUser();
		if(!currentUser){
			throw new Error('Invalid Username');
		}
		else if(currentUser['password'] != formObject['password']){			
			throw new Error('Invalid password');
		}
		let pageNumber =  currentUser['preferred-default-page'];
		loadDefaultPage(pageNumber);
	}
	catch(e){
		alert(e.message);
		alert(e.stack);
	}
}

/**
 * Function performed after signup button is clicked
 */
async function signUpSubmission(){
	let fdata = new FormData(document.getElementById('box'));
	let formObject = {};

	for(const pair of fdata.entries()){
		formObject[`${pair[0]}`] = `${pair[1]}`;
	}
	try{
		checkPassword(formObject['password'], formObject['confirmpassword']);
		
		let newUser = {
			'username':formObject['username'],
			'password':formObject['password'],
			'preferred-default-page':0,
			'wallets':[]
		};

		let users = await checkUsername(formObject['username']);
		users[formObject['username']] = newUser;
		await setAllUsersObject(users);

		setCurrentUsername(formObject['username']);
		const currentUser = await getCurrentUser();

		let pageNumber = currentUser['preferred-default-page'];
		loadDefaultPage(pageNumber);
	}
	catch(e){
		loginError(e.message);
		loginError(e.stack)
	}	
}

/**
 * Checks to make sure that the passwords satisfy requirement
 * @param {String} password 
 * @param {String} confirmpassword 
 */
function checkPassword(password, confirmpassword){
	if(password != confirmpassword){
		throw new Error('Passwords must match');
	}
	if(password.length <  minPasswordLen || password.length > maxPasswordLen){
		throw new Error(`Password must be between ${minPasswordLen} and ${maxPasswordLen} characters`);
	}
	if(!passwordRegex.test(password)){
		throw new Error('Password contains character(s) that are not alphanumeric or underscore');
	}

}

/**
 * Checks to make sure that input is a valid username
 * @param {String} username 
 */
//async function checkUsername(username){
async function checkUsername(username){
	let users = await getAllUsersObject();
	if(!users){
		return {};
	}
	if (users[username]){
		throw new Error('Username has already been taken');
	}
	if(username.length < minUsernameLen || username.length > maxUsernameLen){
		throw new Error(`Username must be between ${minUsernameLen} and ${maxUsernameLen} characters`);
	}
	if(!usernameRegex.test(username)){ //Check if username contains invalid characters
		throw new Error('Username contains characters that are not alphanumeric or underscore');
	}
	return users;
}

/**
 * Prevents submission if terms and conditions are not checked
 */
function checkTerms(){
	let submit = document.getElementById('submit');
	if(document.getElementById('terms').checked){
		submit.disabled =  false;
	}
	else{
		submit.disabled = true;
	}
}

/**
 * Function to do if invalid password
 * @param {String} message 
 */
function loginError(message){
	alert(message);
}

