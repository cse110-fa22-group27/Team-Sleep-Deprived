const indexedDB = window.indexedDB;

class User {
    constructor(username, password, wallets, preferredDefaultPage) {
        this.username = username;
        this.password = password;
        this.wallets = wallets;
        this.preferredDefaultPage = preferredDefaultPage;
    }
}

class Wallet {
    constructor(name, balance) {
        this.name = name;
        this.balance = balance;
    }
}
//====below test cases

let BOA = new Wallet("BOA", 100);
let Chase = new Wallet("Chase", 200);

const user1 = new User("kevin", "01234567", [], "dashboard");
const user2 = new User("ashwin", "00000", [BOA, Chase], "reports");
const user3 = new User("john", "123456", [new Wallet(), new Wallet()], "wallets");
//==above test cases


if (!indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
};

const request = indexedDB.open("UserDatabase", 1);

request.onerror = function (event) {
    console.error("An error occured with IndexedDB");
    console.error(event);
};

request.onupgradeneeded = function () {
    const db = request.result;
    const store = db.createObjectStore("user", { keyPath: "id", autoIncrement:true });
    store.createIndex("user-name", ["userID", "password", "wallet"], { unique: true });// we cant have same user-name
};

request.onsuccess = function () {
    const db = request.result;
    const user = db.transaction("user", "readwrite");

    const store = user.objectStore("user");
    const IDIndex = store.index("user-name");
    // const pwdIndex = store.index("password");
    // const walletIndex = store.index("wallet");

    // below testing code and leave here for reference 
    // lets try put some data into Database:

    // store.put({
    //     "id": 1,
    //     "ashwin": user1,
    //     "kevin": user2,
    //     "john": user3
    // });

    // //const idQuery = store.get("ashwin");

    // ==above testing code

    async function getAllUsersObject() {
        let users = await store.getAll();
        users.onsuccess = function () {
            const userObjects = users.result;
            console.log("All user objects retrieved");
            return userObjects;
    }
    }

    function setAllUsersObject(objectStore) {
        store.put(objectStore);
        console.log("All user objects stored in database");
    }

};



    