import { defineStore } from 'pinia';

export const useCryptoStore = defineStore('cryptoStore', () => {

	const globalProvider = ref(null);
	const currentAccount = ref(null);
	const nftsToMint = ref(1);
	const userMax = ref(0);
	const totalNFTs = ref(0);
	const wallet = ref(null);
	const mintTries = 0;
	const wrongNetwork = ref(false);
	const nfts = ref([]);
	const stakedNfts = ref([]);

	const initLoading = ref(false);
	const nftsLoading = ref(false);
	const stakedNftsLoading = ref(false);
	const mintingLoading = ref(false);
	const stakingLoading = ref(false);
	const buyingLoading = ref(false);

	const avaxBalance = ref(0);
	const usdtBalance = ref(0);
	const bpayBalance = ref(0);

	const avaxPrice = ref(0);
	const usdtPrice = ref(0);

	const correctNetwork = ref(-1);

	return {
		mintTries,
		initLoading,
		nftsLoading,
		wallet,
		stakedNftsLoading,
		mintingLoading,
		stakingLoading,
		buyingLoading,
		wrongNetwork,
		currentAccount,
		globalProvider,
		nftsToMint,
		nfts,
		stakedNfts,
		avaxBalance,
		usdtBalance,
		bpayBalance,
		userMax,
		avaxPrice,
		usdtPrice,
		correctNetwork,
		totalNFTs,

	};
});