/**
 * @author Andrew Lu
 * @author Kevin Chang
 * @fileoverview This is database file which contains the api for the IndexedDB database operations. Follows CRUD principles.
 */
const indexedDB = window.indexedDB;


if (!indexedDB) {
	window.alert('Your browser doesn\'t support a stable version of IndexedDB.');
}

const dbRequest = indexedDB.open('UserDatabase', 1);

/**
 * Error handler for the database
 * @param {Event} event 
 */
dbRequest.onerror = function (event) {
	console.error('Database could not be opened');
	console.error(event);
};

/**
 * Upgrades the database to the latest version
 */
dbRequest.onupgradeneeded = function () {
	const db = dbRequest.result;
	db.createObjectStore('user', { keyPath: 'id', autoIncrement:true });
};

/**
 * Reads the current user info from the database and loads it
 */
dbRequest.onsuccess = function () {
	const db = dbRequest.result;
	const user = db.transaction('user', 'readwrite');

	user.objectStore('user');
};

/**
 * Gets all the users from the database
 * @returns A promise that resolves to the all users object
 */
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

/**
 * Updates the all users object by overwriting it
 * @param {Array<User>} object
 * @returns Promise that resolves to a string indicating whether the store was completed successfully
 */
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