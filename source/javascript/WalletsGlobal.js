import { getAllUsersObject, setAllUsersObject } from './database.js';

const getAllWalletsForUser = (username) => {
	const allUsersObject = getAllUsersObject();
	const userObject = allUsersObject[username];
	const walletsObject = userObject.wallets;
	return walletsObject;
}

const setWalletsForUser = (username, walletsObject) => {
	const allUsersObject = getAllUsersObject();
	const userObject = allUsersObject[username];
	userObject.wallets = walletsObject;
	setAllUsersObject(allUsersObject);
}

export default { getAllWalletsForUser, setWalletsForUser };