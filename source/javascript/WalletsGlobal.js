import { currentUserObject } from './globals.js'
/**
 * Gets all the wallets from the current user 
 * @param {String} username 
 * @returns All the wallets for the currently logged in user 
 */
const getAllWalletsForUser = async (username) => {
	const wallets = currentUserObject['wallets'];
	return wallets;
}

/**
 * @typedef {Object} wallet-object 
 * @property {String} name The name of the wallet
 * @property {Array<transactions>} transactions List of all the transactions for this wallet
 * @property {Number} "total-amount" The total amount that the wallet starts with 
 */

/**
 * Sets the wallets list for the current user 
 * @param {String} username 
 * @param {Array<wallet-object>} wallets 
 */
const setWalletsForUser = async (wallets) => {
	currentUserObject['wallets'] = walletsObject;
}

export default { getAllWalletsForUser, setWalletsForUser };