import {defineStore} from 'pinia';
import {ethers} from "ethers";

export const useCryptoStore = defineStore('cryptoStore', () => {

    const globalProvider = ref(null);
    const currentAccount = ref(null);
    const userBalance = ref(0);
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
    const burritoBalance = ref(0);

    const avaxPrice = ref(0);
    const usdtPrice = ref(0);

    const correctNetwork = ref(-1);


    const getAvaxPrice = async () => {
        const avaxMainnetRpc = 'https://api.avax.network/ext/bc/C/rpc';
        const provider = new ethers.providers.JsonRpcProvider(avaxMainnetRpc);
        const priceFeed = new ethers.Contract('0x0A77230d17318075983913bC2145DB16C7366156', ['function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)'], provider);
        const [roundId, price, startedAt, updatedAt, answeredInRound] = await priceFeed.latestRoundData();
        avaxPrice.value = price / 1e8;
        return avaxPrice.value;
    }

    const syncBalances = async () => {
        /// route = '/synchronize-payment-history'
        const {data} = await useBaseFetch('/web3/synchronize-payment-history');
        console.log("SYNC BALANCES: ", data.value.data);

    };

    return {
        mintTries,
        getAvaxPrice,
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
        burritoBalance,
        userMax,
        avaxPrice,
        usdtPrice,
        correctNetwork,
        totalNFTs,
        userBalance
    };
});