const indexedDB = window.indexedDB;


if (!indexedDB) {
	window.alert('Your browser doesn\'t support a stable version of IndexedDB.');
}

function getAllUsersObject(){
	return new Promise(
		function(resolve, reject) {
			const dbRequest = indexedDB.open('UserDatabase', 1);

			dbRequest.onerror = function() {
				reject(Error('Error text'));
			};

			dbRequest.onupgradeneeded = function() {
				dbRequest.transaction.abort();
				reject(Error('Not found'));
			};

			dbRequest.onsuccess = function() {
				const database = dbRequest.result;
				const transaction = database.transaction('user');
				const objectStore = transaction.objectStore('user');
				const objectRequest = objectStore.get(1);

				objectRequest.onerror = function() {
					reject(Error('Error text'));
				};

				objectRequest.onsuccess = function() {
					if (objectRequest.result) resolve(objectRequest.result);
					else reject(Error('object not found'));
				};
			};
		}
	);
}

function setAllUsersObject(object){
	return new Promise(
		function(resolve, reject) {
			const dbRequest = indexedDB.open('UserDatabase', 1);
	
			dbRequest.onerror = function() {
				reject(Error('IndexedDB database error'));
			};
	
			dbRequest.onupgradeneeded = function(event) {
				const database    = event.target.result;
				database.createObjectStore('user', {keyPath: "id"});
			};
	
			dbRequest.onsuccess = function(event) {
				const database      = event.target.result;
				const transaction   = database.transaction('user', 'readwrite');
				const objectStore   = transaction.objectStore('user');
				const objectRequest = objectStore.put(object); // Overwrite if exists
		
				objectRequest.onerror = function() {
					reject(Error('Error text'));
				};
		
				objectRequest.onsuccess = function() {
					resolve('Data saved OK');
				};
			};
		}
	);
}

export { getAllUsersObject, setAllUsersObject };

//======below test cases
//	class User {
//		constructor(username, password, wallets, preferredDefaultPage) {
//			this.username = username;
//			this.password = password;
//			this.wallets = wallets;
//			this.preferredDefaultPage = preferredDefaultPage;
//		}
//	}
//	
//	class Wallet {
//		constructor(name, balance) {
//			this.name = name;
//			this.balance = balance;
//		}
//	}
//	
//	
//	let BOA = new Wallet('BOA', 100);
//	let Chase = new Wallet('Chase', 200);
//	
//	const user1 = new User('kevin', '01234567', [], 'dashboard');
//	const user2 = new User('ashwin', '00000', [BOA, Chase], 'reports');
//	const user3 = new User('john', '123456', [new Wallet(), new Wallet()], 'wallets');
//	
//	const request = indexedDB.open('UserDatabase', 1);
//	
//	request.onerror = function (event) {
//		console.error('An error occured with IndexedDB');
//		console.error(event);
//	};
//	
//	request.onupgradeneeded = function () {
//		const db = request.result;
//		const store = db.createObjectStore('user', { keyPath: 'id', autoIncrement:true });
//	};
//	
//	request.onsuccess = async function () {
//		const db = request.result;
//		const user = db.transaction('user', 'readwrite');
//	
//		const store = user.objectStore('user');
//		const IDIndex = store.index('user-name');
//	
//		store.put({
//			"id": 1,
//			"ashwin": user1,
//			"kevin": user2,
//			"john": user3
//		});
//	
//		console.log(await getAllUsersObject());
//		console.log(await setAllUsersObject({
//			"id": 1,
//			"john": user1,
//			"jimmy": user2,
//			"josh": user3
//		}));
//		console.log(await getAllUsersObject());	
//	};
//==above test cases