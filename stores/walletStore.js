import {defineStore} from 'pinia';
import {ethers} from "ethers";
import chalk from 'chalk';
import {CoreWallet, MetaMaskWallet, RabbyWallet, WalletConnect} from '@thirdweb-dev/wallets';
import ERC20 from '../contracts/ERC20.sol/ERC20.json';
export const useWalletStore = defineStore('walletStore', () => {

	const globalProvider = ref(null);
	const currentAccount = ref(null);
	const userBalance = ref(0);
	const avaxBalance = ref(0);
	const usdtBalance = ref(0);
	const burritoBalance = ref(0);
	const avaxPrice = ref(0);
	const usdtPrice = ref(0);


	return {

	};
});
