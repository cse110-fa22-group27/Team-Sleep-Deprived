import { getCurrentUser, updateCurrentUser } from './globals.js';
const pages = ['../html/dashboard.html', '../html/wallets.html', '../html/report.html'];

const currentUser = await getCurrentUser();

function loadDefaultPage(defaultPageNumber) {
	window.location.replace(pages[defaultPageNumber]);
}
const pageNumber =  currentUser['preferred-default-page'];
loadDefaultPage(pageNumber);

//change password
const changePassword = document.querySelector('.password-change-setting glass-box setting-component');
changePassword.onclick = function(){
	let formOld = new FormData(this);
	let oldpassword = formOld.get('old-password');
	let formNew = new FormData(this);
	let newpassword = formNew.get('new-password');

	if(oldpassword != '' && newpassword != ''){
		if(oldpassword != newpassword){
			currentUser.password = newpassword;
            
		}
		else{
			alert('Old password and Newpassword cannot be the same!');
		}
	}
	else{
		alert('Old password or Newpassword cannot be empty!');
	}
};

//change default page
const choseDefault = document.querySelector('.landing-page-setting glass-box setting-component');
choseDefault.onclick = function(){
	let input = document.getElementById('page');
	let dashboard = document.getElementById('page').value = 'dashboard';
	let wallet = document.getElementById('page').value ='wallets';
	let report = document.getElementById('page').value ='reports';

	if(input == dashboard){
		loadDefaultPage(0);
	}
	else if(input == wallet){
		loadDefaultPage(1);
	}
	else if(input == report){
		loadDefaultPage(2);
	}
    
};

/*update current user to all user-object
store new user password in database*/
function updateDB(){
	updateCurrentUser(currentUser);
}