const indexedDB = window.indexedDB;


if (!indexedDB) {
	window.alert('Your browser doesn\'t support a stable version of IndexedDB.');
}

const dbRequest = indexedDB.open('UserDatabase', 1);

dbRequest.onerror = function (event) {
	console.error('An error occured with IndexedDB');
	console.error(event);
};

dbRequest.onupgradeneeded = function () {
	const db = dbRequest.result;
	const store = db.createObjectStore('user', { keyPath: 'id', autoIncrement:true });
};

dbRequest.onsuccess = function () {
	const db = dbRequest.result;
	const user = db.transaction('user', 'readwrite');

	const store = user.objectStore('user');
};

function getAllUsersObject(){
	return new Promise(
		function(resolve, reject) {
			const dbRequest = indexedDB.open('UserDatabase', 1);

			dbRequest.onerror = function() {
				reject(Error('Cannot open database'));
			};

			dbRequest.onupgradeneeded = function() {
				dbRequest.transaction.abort();
				reject(Error('Database version incorrect, use version 1'));
			};

			dbRequest.onsuccess = function() {
				const database = dbRequest.result;
				const transaction = database.transaction('user');
				const objectStore = transaction.objectStore('user');
				const objectRequest = objectStore.get(1);

				objectRequest.onerror = function() {
					resolve({});
				};

				objectRequest.onsuccess = function() {
					if (objectRequest.result) resolve(objectRequest.result);
					else resolve({});
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
				reject(Error('Cannot open database'));
			};
	
			dbRequest.onupgradeneeded = function(event) {
				const database  = event.target.result;
				database.createObjectStore('user', {keyPath: 'id'});
			};
	
			dbRequest.onsuccess = function(event) {
				const database = event.target.result;
				const transaction = database.transaction('user', 'readwrite');
				const objectStore = transaction.objectStore('user');
				const objectRequest = objectStore.put(object); // Overwrite if exists
		
				objectRequest.onerror = function() {
					reject(Error('Error while saving data'));
				};
		
				objectRequest.onsuccess = function() {
					resolve('Data saved successfully');
				};
			};
		}
	);
}

export { getAllUsersObject, setAllUsersObject };