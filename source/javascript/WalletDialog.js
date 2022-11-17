/**
 * @author Anthony Chen
 */

function initForm(){
    //Create popup form
    let  formPopup= document.createElement("div");
    formPopup.className = "form-popup";

    //Create form container
    let formContainer = document.createElement("form");
    formContainer.className = "form-container";

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
    balanceInput.setAttribute("name", "amount");
    balanceInput.setAttribute("required","");

    let targetLabel = document.createElement("label");
    targetLabel.setAttribute("for", "Target Spending");
    targetLabel.innerHTML = "<b>Target Budget</b>";

    let targetInput = document.createElement("input");
    targetInput.setAttribute("type", "number");
    targetInput.setAttribute("step", ".01"); //Allow up to 2 decimal places
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
 * 
 */
export function openDialog(){
    document.getElementsByClassName("form-container")[0].reset();
    document.getElementsByClassName("form-popup")[0].style.display = "block";
}

/**
 * 
 */
function closeDialog(){
    document.getElementsByClassName("form-popup")[0].style.display = "none";
}

/**
 * 
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


    console.log("New wallet info: ");
    console.log(newWallet);
    let wallets = getWalletsFromStorage();
    console.log("Wallets: ")
    console.log(wallets);
    wallets.push(newWallet);
    storeWallets(wallets);
}

/**
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
 * @param {Array<Obejct>} wallets - the array of wallets
 */
function storeWallets(wallets){
    console.log("storing wallets");
    console.log(wallets);
    window.localStorage.setItem("wallet-infos", JSON.stringify(wallets));
}

initForm();