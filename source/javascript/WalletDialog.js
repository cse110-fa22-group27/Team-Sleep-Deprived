/**
 * File to handle the creation of new wallets, namely the dialog
 * and the storage/retreival of wallet information
 * @author Anthony Chen
 */

function initForm(){
    //Create popup form
    let  formPopup= document.createElement("div");
    formPopup.className = "form-popup";

    //Create form container
    let formContainer = document.createElement("form");
    formContainer.className = "form-container glass-box";

    //Create form fields
    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for","Wallet Name");
    nameLabel.innerHTML = "<b>Wallet Name</b>";

    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Enter Wallet Name");
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("required","");

    let balanceLabel = document.createElement("label");
    balanceLabel.setAttribute("for", "Wallet Balance");
    balanceLabel.innerHTML = "<b>Wallet Balance</b>";
    
    let balanceInput = document.createElement("input");
    balanceInput.setAttribute("type", "number");
    balanceInput.setAttribute("step", ".01"); //Allow up to 2 decimal places
    balanceInput.setAttribute("placeholder", "Enter Balance");
    balanceInput.setAttribute("min", "0"); //set minimum balance of each wallet to 0
    balanceInput.setAttribute("name", "amount");
    balanceInput.setAttribute("required","");

    let targetLabel = document.createElement("label");
    targetLabel.setAttribute("for", "Target Spending");
    targetLabel.innerHTML = "<b>Target Budget</b>";

    let targetInput = document.createElement("input");
    targetInput.setAttribute("type", "number");
    targetInput.setAttribute("step", ".01"); //Allow up to 2 decimal places
    targetInput.setAttribute("min", "0");
    targetInput.setAttribute("placeholder", "Optional");
    targetInput.setAttribute("name", "target");
    
    //Create Buttons
    let submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit-wallet");
    submit.innerHTML = "Submit";
    submit.className = "btn";

    let exit = document.createElement("button");
    exit.setAttribute("type", "button");
    exit.setAttribute("id", "closeform");
    exit.innerHTML = "Cancel";
    exit.className = "btn cancel";

    //Attach everything
    formContainer.appendChild(nameLabel);
    formContainer.appendChild(nameInput);
    formContainer.appendChild(balanceLabel);
    formContainer.appendChild(balanceInput);
    formContainer.appendChild(targetLabel);
    formContainer.appendChild(targetInput);
    formContainer.appendChild(submit);
    formContainer.appendChild(exit);
    formPopup.appendChild(formContainer);
    document.body.appendChild(formPopup);

    //Add event listeners
    exit.addEventListener("click", closeDialog);
    formContainer.addEventListener("submit", formSubmission);
}

/**
 * Open the wallet-storage dialog
 */
export function openDialog(){
    document.getElementsByClassName("form-container")[0].reset();
    document.getElementsByClassName("form-popup")[0].style.display = "block";
}

/**
 * Closes the wallet-storage dialog
 */
function closeDialog(){
    document.getElementsByClassName("form-popup")[0].style.display = "none";
}

/**
 * Function that executes on form submssion
 */
function formSubmission(){
    let formElement = document.getElementsByClassName("form-container")[0];
    let fdata  = new FormData(formElement);
    let newWallet = {
        "lastTransaction":{
            "name":"N/A",
            "amount":"0"
        }
    };
  
    for(const pair of fdata.entries()){
      newWallet[`${pair[0]}`] = `${pair[1]}`;
    }

    let wallets = getWalletsFromStorage();
    wallets.push(newWallet);
    storeWallets(wallets);
}

/**
 * Gets all wallets stored in local storage
 * @returns {Array<Object>} - Array of wallets in local storage
 */
function getWalletsFromStorage(){
    let item = JSON.parse(window.localStorage.getItem('wallet-infos'));
    if(!item){
        return [];
    }
    return item;
}

/**
 * Stores the inputted wallets
 * @param {Array<Obejct>} wallets - the array of wallets
 */
function storeWallets(wallets){
    console.log("storing wallets");
    console.log(wallets);
    window.localStorage.setItem("wallet-infos", JSON.stringify(wallets));
}

initForm();