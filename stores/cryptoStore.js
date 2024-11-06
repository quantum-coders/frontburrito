import {defineStore} from 'pinia';
import {ethers} from "ethers";

export const useCryptoStore = defineStore('cryptoStore', () => {
	const globalProvider = ref(null);
	const currentAccount = ref(null);
	const isCorrectNetwork = ref(false);
	const avaxBalance = ref(0);
	const usdtBalance = ref(0);
	const burritoBalance = ref(0);
	const avaxPrice = ref(0);

	const getAvaxPrice = async () => {
		const avaxMainnetRpc = 'https://api.avax.network/ext/bc/C/rpc';
		const provider = new ethers.providers.JsonRpcProvider(avaxMainnetRpc);
		const priceFeed = new ethers.Contract(
			'0x0A77230d17318075983913bC2145DB16C7366156',
			['function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)'],
			provider
		);
		const [, price] = await priceFeed.latestRoundData();
		avaxPrice.value = price / 1e8;
		return avaxPrice.value;
	};

	return {
		getAvaxPrice,
		globalProvider,
		currentAccount,
		avaxBalance,
		usdtBalance,
		burritoBalance,
		avaxPrice,
		isCorrectNetwork
	};
});
