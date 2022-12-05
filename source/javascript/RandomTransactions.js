import { getCurrentUserWallets, setCurrentUserWallets } from './globals.js';

const getRandomWallet = async () => {
	const wallets = await getCurrentUserWallets();
	const randIndex = Math.floor(Math.random() * wallets.length);
  	return [wallets[randIndex], randIndex];
}

// generate random dates 12 months ago to now
const getRandomDate = () => {
	const now = new Date();
	const randomDate = new Date(now.getFullYear(), now.getMonth() - Math.floor(Math.random() * 12), Math.floor(Math.random() * 28));
	return randomDate;
}

// get some random words
const randomWords = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'Ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'Duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'Excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'];
const randomSentences = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'];
const getRandomTransactionInternal = async () => {
	const [wallet, randIndex] = await getRandomWallet();
	const date = getRandomDate();
	const amount = Math.floor(Math.random() * 2000) - 1000; 
	const name = randomWords[Math.floor(Math.random() * randomWords.length)];
	const description = randomSentences[Math.floor(Math.random() * randomSentences.length)];
	return {date, amount, name, description};
}

const setRandomTransactions = async () => {
	const transactions = [];
	for (let i = 0; i < 100; i++) {
		transactions.push(await getRandomTransactionInternal());
	}
	const [wallet, randIndex] = await getRandomWallet();
	console.log(transactions);
	wallet.transactions = transactions;
	const wallets = await getCurrentUserWallets();
	wallets[randIndex] = wallet;
	setCurrentUserWallets(wallets);
}

const getRandomTransaction = async () => {
	await setRandomTransactions();
}

export { getRandomTransaction };