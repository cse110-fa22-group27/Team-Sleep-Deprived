import { getAllUsersObject, setAllUsersObject } from './database.js';

const getAllWalletsForUser = async (username) => {
	const allUsersObject = await getAllUsersObject();
	const userObject = allUsersObject[username];
	const walletsObject = userObject.wallets;
	return walletsObject;
}

const setWalletsForUser = async (username, walletsObject) => {
	const allUsersObject = await getAllUsersObject();
	const userObject = allUsersObject[username];
	userObject.wallets = walletsObject;
	setAllUsersObject(allUsersObject);
}

export default { getAllWalletsForUser, setWalletsForUser };