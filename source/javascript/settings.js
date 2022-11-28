export const storagePage = {};//create wrapper object to hold storage
let changePassword = document.querySelector('.password-change-setting glass-box setting-component');
changePassword.onclick = function(){
    let formOld = new FormData(this);
    let oldpassword = formOld.get('old-password');
    let formNew = new FormData(this);
    let newpassword = formNew.get('new-password');
    //change password
    if(oldpassword != "" && newpassword != ""){
        if(oldpassword != newpassword){
            user.password = newpassword;
        }
        else{
            alert("Old password and Newpassword cannot be the same!");
        }
    }
    else{
        alert("Old password or Newpassword cannot be empty!");
    }
}

let choseDefault = document.querySelector('.landing-page-setting glass-box setting-component');
choseDefault.onclick = function(){
    let input = document.getElementById('page');
    let dashboard = document.getElementById('page').value = 'dashboard';
    let wallet = document.getElementById('page').value ='wallets';
    let report = document.getElementById('page').value ='reports';
    storagePage = JSON.parse(user.getItem('preferred-default-page'))//get object from db
    if(input == dashboard){
        storagePage = 0;
    }
    else if(input == wallet){
        storagePage = 1;
    }
    else if(input == report){
        storagePage = 2;
    }
    //update current user to all user-object
    
    //store all user in database
}