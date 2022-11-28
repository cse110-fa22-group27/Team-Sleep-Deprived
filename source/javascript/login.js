/**
 * @author Anthony Chen
 * @contributor Ashwin Rohit Alagiri Rajan
 */
// import {getAllUsersObject, setAllUsersObject} from './userDB.js';
import { setCurrentUsername, getCurrentUsername, getCurrentUser } from "./globals.js";

const signup = new RegExp('/html/signup.html');
const signin = new RegExp('/html/signin.html');
const pages = ['../html/dashboard.html', '../html/wallets.html', '../html/report.html'];

function loadDefaultPage(defaultPageNumber) {
	window.location.replace(pages[defaultPageNumber]);
}

async function loginAutomatically() {
	let username = getCurrentUsername();
	if(username) {
		const currentUser = await getCurrentUser();
		loadDefaultPage(currentUser['preferred-default-page']);
	}
	return;
}

loginAutomatically();

async function getAllUsersObject(){
	let userObjects = JSON.parse(window.localStorage.getItem('users'));
	if(!userObjects){
		return {};
	}
	return userObjects;
}

async function setAllUsersObject(users){
	window.localStorage.setItem('users', JSON.stringify(users));
}


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

async function signinSubmission(){
	let fdata = new FormData(document.getElementById('box'));
	let formObject = {};
	for(const pair of fdata.entries()){
		formObject[`${pair[0]}`] = `${pair[1]}`;
	}
	
	
	try{
		setCurrentUsername(formObject['username']);
		const currentUser = await getCurrentUser();
		console.log(users[formObject['username']]);
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
		alert(e.message)
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
		}

		let users = await checkUsername(formObject['username']);
		users[formObject['username']] = newUser;
	
		console.log(users[formObject['username']])
		await setAllUsersObject(users);
	}
	catch(e){
		loginError(e.message);
	}	
}

/**
 * Checks to make sure that the passwords satisfy requirement
 * @param {String} password 
 * @param {String} confirmpassword 
 */
function checkPassword(password, confirmpassword){
	//TODO: Make sure passwords satisfy other constraints
	if(password != confirmpassword){
		throw new Error('passwords must match');
	}
}

/**
 * Checks to make sure that input is a valid username
 * @param {String} username 
 */
//async function checkUsername(username){
async function checkUsername(username){
	let users = await getAllUsersObject();
	if (users[username]){
		throw new Error('username has already been taken');
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

