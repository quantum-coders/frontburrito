// import NftMinter from '../contracts/BlockpayNfts.sol/BlockpayNfts.json';
// import Token from '../contracts/BPAY.sol/BPAY.json';
// import Staker from '../contracts/BlockpayStaker.sol/BlockpayStaker.json';
import { ethers } from 'ethers';
import chalk from 'chalk';

const nftTypes = ['', 'Whale', 'Shark', 'Dolphin', 'Shrimp'];
const nftTypesBpay = { 'Whale': 130000, 'Shark': 30000, 'Dolphin': 10000, 'Shrimp': 2500 };

export const useWeb3 = () => {

    const cryptoStore = useCryptoStore();

    const config = useRuntimeConfig();

    const web3log = {
        'info': (...args) => {
            console.log("Args", ...args);

            console.log(chalk.bgMagenta.white(' 🕸️🌳 [web3] '), ...args);
        },
        'error': (...args) => {
            console.log("Args", ...args);

            console.log(chalk.bgRed.white(' 🕸️🌳 [web3] '), ...args);
        },
        'success': (...args) => {
            console.log("Args", ...args);

            console.log(chalk.bgGreen.white(' 🕸️🌳 [web3] '), ...args);
        },
    };

    // const contractABI = NftMinter.abi;
    // const tokenABI = Token.abi;
    // const stakerABI = Staker.abi;

    const bpayAddress = config.public.BPAYTokenAddress;
    const bpayTokenAddress = config.public.BPAYTokenAddress;
    const bpayNftAddress = config.public.bpayNftAddress;

    const stakerAddress = config.public.stakerAddress;
    const network = config.public.bC;
    const chainId = config.public.chainId;

    async function checkNetwork() {
        if(typeof window.ethereum === 'undefined') {
            return { message: 'MetaMask is not installed.' };
        }

        try {
            const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
            const chainId = parseInt(chainIdHex, 16);
            let result = {
                chainId: chainId, chain: '', network: '', message: '',
            };

            switch(chainIdHex) {
                case '0xa86a':
                    result.chain = 'Avalanche';
                    result.network = 'Mainnet C-Chain';
                    result.message = 'Connected to Avalanche Mainnet C-Chain';
                    result.chainId = 43114;
                    result.chainIdHex = '0xa86a';
                    break;
                case '0xa869':
                    result.chain = 'Avalanche';
                    result.network = 'Fuji C-Chain';
                    result.message = 'Connected to Avalanche Fuji C-Chain (Testnet)';
                    result.chainId = 43113;
                    result.chainIdHex = '0xa869';
                    break;
                default:
                    result.message = 'Connected to an unknown network: ' + chainIdHex;
            }

            return result;
        } catch(error) {

            web3log.error('Error checking network', error);
            return { message: 'Error checking network: ' + error.message };
        }
    }

    const checkConnection = async () => {
        if(window.ethereum !== undefined) {
            try {
                const account = await ethereum.request({ method: 'eth_accounts' });
                web3log.info('Account', account);
                return account.length > 0;
            } catch(error) {
                web3log.error('Error checking connection', error);
                return false;
            }
        }
    };

    const verifyMainNet = async () => {
        const networkInfo = await checkNetwork();
        web3log.info('Network Info', networkInfo);
        cryptoStore.correctNetwork = networkInfo.chainId === parseInt(chainId) ? 1 : 0;
        return networkInfo.chainId === parseInt(chainId);
    };

    const getAccount = () => window.localStorage.getItem('currentAccount') || null;

    const initProvider = async () => {

        web3log.info('Global Provider initialization');

        cryptoStore.initLoading = true;
        cryptoStore.currentAccount = getAccount();

        if(window.ethereum !== undefined) {

            await verifyMainNet();

            const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
            cryptoStore.globalProvider = markRaw(provider);

            web3log.info('Global Provider in store', cryptoStore.globalProvider);
            web3log.info('Crypto Store Current Account', cryptoStore.currentAccount);

            // If the current account is set, get nfts
            if(cryptoStore.currentAccount != null) {
                try {
                        // your address
                       console.log('Current Account', cryptoStore.currentAccount);
                } catch(error) {
                    web3log.error('Error getting NFTs', error);
                    await disconnectWallet();
                }
            }

            setListeners(true);
            await onAccountsChanged();

            cryptoStore.initLoading = false;

        } else {
            web3log.error('Metamask not found');
        }
    };

    const etherToWei = (etherUnits) => ethers.utils.parseEther(etherUnits);
    const weiToEther = (etherUnits) => ethers.utils.formatEther(etherUnits);

    const currentAccountTrimmed = computed(() => {
        if(cryptoStore.currentAccount != null) {
            return `${ cryptoStore.currentAccount.substring(0, 6) }...${ cryptoStore.currentAccount.substring(38, 42) }`;
        }
    });

    const setListeners = (bool) => {

        web3log.info('Global Provider in setListeners', cryptoStore.globalProvider);
        web3log.info('Crypto Store Current Account', cryptoStore.currentAccount);

        if(bool) {
            if(cryptoStore.globalProvider != null) {
                cryptoStore.globalProvider.provider.on('accountsChanged', onAccountsChanged);
                cryptoStore.globalProvider.provider.on('chainChanged', onChainChanged);
            }
        } else {
            if(cryptoStore.globalProvider != null) {
                cryptoStore.globalProvider.removeListener('accountsChanged', onAccountsChanged);
                cryptoStore.globalProvider.removeListener('chainChanged', onChainChanged);
            }
            window.localStorage.removeItem('currentAccount');
            window.localStorage.removeItem('nftCounter');
        }
    };

    const requestNetworkChange = async () => {
        let chainId;
        if(network === 'mainnet') {
            chainId = '0xa86a';
        } else {
            chainId = '0xa869';
        }

        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }],
            });
        } catch(error) {
            console.error(error);
        }
    };

    const onAccountsChanged = async () => {
        web3log.info('Global Provider in onAccountsChanged', cryptoStore.globalProvider);
        await connectWallet();
    };

    const onChainChanged = async () => {
        web3log.info('Global Provider in onChainChanged', cryptoStore.globalProvider);
        await verifyMainNet();

        if(cryptoStore.correctNetwork) {
            await connectWallet();
        }
    };

    const connectWallet = async () => {

        web3log.info('Connecting wallet...');
        cryptoStore.initLoading = true;

        try {
            const accounts = await cryptoStore.globalProvider.listAccounts();
            web3log.info('Accounts', accounts);

            if(!accounts.length) {
                web3log.error('No accounts found');
                await disconnectWallet();
            }

            await cryptoStore.globalProvider.send('eth_requestAccounts', []);
            window.localStorage.setItem('currentAccount', await cryptoStore.globalProvider.getSigner().getAddress());
            cryptoStore.currentAccount = getAccount();

            cryptoStore.initLoading = false;

        } catch(error) {
            web3log.error('Error connecting wallet', error);
            cryptoStore.initLoading = false;
            await disconnectWallet();

            let e = 'Metamask not found';
            if(error.code === -32002) {
                e = 'Metamask connection is already in progress, please confirm the connection in Metamask';
                useNuxtApp().$toast.error(e, {
                    position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                    timeout: 250000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                });
            }
        }
    };

    const disconnectWallet = async () => {
        try {
            web3log.info('Disconnecting wallet...');
            cryptoStore.currentAccount = null;
            setListeners(false);
            window.localStorage.removeItem('currentAccount');

        } catch(error) {
            web3log.error('Error disconnecting wallet', error);
            decodeErrors(error);
        }
    };

    async function getAVAXPrice() {
        try {
            const p = await getRawPrice();
            return p / (10 ** 8);
        } catch(error) {
            decodeErrors(error);
        }
    }

    async function getRawPrice() {
        const provider = new ethers.providers.JsonRpcProvider(config.public.testnetRPCProvider);
        const priceFeed = new ethers.Contract(config.public.avaxPriceFeedTestnet, ['function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)'], provider);
        const [roundId, price, startedAt, updatedAt, answeredInRound] = await priceFeed.latestRoundData();
        return price;
    }

    // async function mintNfts() {
    //     let status;
    //     let receipt;
    //     let rarities = [];
    //     let ids = [];

    //     cryptoStore.mintingLoading = true;

    //     web3log.info('Minting NFTs...', cryptoStore.nftsToMint);

    //     try {
    //         const nftMinter = new ethers.Contract(bpayNftAddress, contractABI, cryptoStore.globalProvider.getSigner());

    //         const signer = cryptoStore.globalProvider.getSigner();

    //         let cost = (cryptoStore.nftsToMint * 2.5);

    //         if(cryptoStore.nftsToMint === 1) {
    //             cost = ethers.utils.parseEther('2.5');
    //         } else if(cryptoStore.nftsToMint === 2) {
    //             cost = ethers.utils.parseEther('5.0');
    //         } else if(cryptoStore.nftsToMint === 3) {
    //             cost = ethers.utils.parseEther('7.5');
    //         } else if(cryptoStore.nftsToMint === 4) {
    //             cost = ethers.utils.parseEther('10.0');
    //         } else if(cryptoStore.nftsToMint === 5) {
    //             cost = ethers.utils.parseEther('12.5');
    //         }

    //         web3log.info('Cost', cost.toString());

    //         if(cryptoStore.nftsToMint === 1) {


    //             const tx = await nftMinter.connect(signer)
    //                 .mint({ value: cost });
    //             receipt = await tx.wait();
    //         } else {
    //             const tx = await nftMinter.connect(signer)
    //                 .batchMint(cryptoStore.nftsToMint, { value: cost });
    //             receipt = await tx.wait();
    //         }

    //         rarities = [];

    //         for(let i = 0; i < receipt.events.length; i++) {
    //             const event = receipt.events[i];

    //             if(event.event === 'MintedNft') {
    //                 ids.push(event.args.tokenId.toString());
    //                 rarities.push(nftTypes[event.args.rarityId.toString()]);
    //             }
    //         }

    //         await new Promise(resolve => setTimeout(resolve, 2000));

    //         const nfts = await getNfts();

    //         web3log.info('From minting NFTs', ids, nfts);
    //         web3log.info('Rarities', ids, rarities);

    //         status = rarities.length > 1;

    //     } catch(error) {

    //         web3log.error('NFT Minting Error', error);

    //         cryptoStore.mintTries++;

    //         if(cryptoStore.mintTries < 3) {
    //             web3log.info('Retrying minting...', cryptoStore.mintTries);
    //             return await mintNfts();
    //         } else {

    //             decodeErrors(error);
    //             cryptoStore.mintingLoading = false;
    //             return false;
    //         }
    //     }

    //     cryptoStore.mintingLoading = false;

    //     return { status, ids, rarities };
    // }

    const decodeErrors = (error) => {
        // Comprobamos que 'error' no sea nulo o indefinido

        web3log.info('Decoding errors...', error);

        if(!error) {
            useNuxtApp().$toast.error('Unknown error', {
                position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                timeout: 250000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
            });
            return false;
        }

        const errorObj = JSON.parse(JSON.stringify(error));

        // Comprobamos si el objeto de error tiene las propiedades esperadas
        const hasCode = errorObj.code;
        const hasOperation = errorObj.operation;
        const hasReason = errorObj.reason;

        let hasDataMessage = false;
        if(typeof errorObj.data === 'object' && errorObj.data !== null) {
            hasDataMessage = 'message' in errorObj.data;
        }

        let errorMessage = '';

        if(hasCode && hasOperation && hasReason) {
            if(errorObj.code === 'UNSUPPORTED_OPERATION' && errorObj.reason === 'unknown account #0') {
                errorMessage = 'Please connect your wallet with Metamask';
            } else {
                errorMessage = errorObj.reason;
            }
        } else if(hasCode && hasReason) {
            // Comprobamos si 'reason' es una cadena que contiene dos puntos
            if(typeof errorObj.reason === 'string' && errorObj.reason.includes(':')) {
                errorMessage = errorObj.reason.split(':')[1];
            } else {
                errorMessage = errorObj.reason;
            }
        } else if(hasCode && !hasReason && hasDataMessage) {
            if(errorObj.data.message.includes('insufficient funds for gas * price + value: ')) {
                errorMessage = 'Insufficient funds';
            } else {
                // Si el mensaje de los datos no coincide con el esperado, lo devolvemos tal cual
                errorMessage = errorObj.data.message;
            }
        } else if(hasCode && !hasReason && !hasDataMessage) {
            if(hasCode === 'CALL_EXCEPTION') {
                if(errorObj.method === 'investments(address,uint256)') {
                    errorMessage = 'You don\'t have any NFT in staking';
                }
            } else {
                errorMessage = `${ hasCode } at ${ errorObj.method }`;
            }
        } else {
            errorMessage = JSON.stringify(errorObj);
        }

        web3log.info('Error message', errorMessage);

        if(errorMessage) {
            console.log('Error message', errorMessage);
            // Mostramos el mensaje de error
            if(typeof errorMessage != "string"){
                console.log('Error message', errorMessage);
                return false;
            }
            useNuxtApp().$toast.error(errorMessage, {
                position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                timeout: 250000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
            });
        }

        // Devolvemos false para indicar que se ha encontrado un error
        return false;
    };

    const updateNfts = async () => {
        cryptoStore.nftsLoading = true;
        cryptoStore.nfts = await getNfts();
        cryptoStore.stakedNfts = await getStakedNfts();
        cryptoStore.nftsLoading = false;
    };

    // const getNfts = async () => {

    //     web3log.info('Getting NFTs...');

    //     cryptoStore.nftsLoading = true;

    //     try {
    //         const nftMinter = new ethers.Contract(bpayNftAddress, contractABI, cryptoStore.globalProvider.getSigner());
    //         const signer = cryptoStore.globalProvider.getSigner();
    //         const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
    //         console.log('verifyMainNet', await verifyMainNet());
    //         const count = await verifyMainNet() ? await nftMinter.connect(signer).balanceOf(currentAccount) : 0;
    //         const nftArray = [];
    //         for(let i = 0; i < count; i++) {
    //             const nft = await nftMinter.connect(signer).tokenOfOwnerByIndex(currentAccount, i);
    //             const nftId = nft.toString();
    //             console.log("Estas entrando amigo????")
    //             const rarityNft = await nftMinter.connect(signer).tokenRarity(nftId);
    //             let rarityCool
    //             if (rarityNft == 1) {
    //                 rarityCool = 'Whale'
    //             }else if (rarityNft == 2) {
    //                 rarityCool = 'Shark'
    //             }else if (rarityNft == 3) {
    //                 rarityCool = 'Dolphin'
    //             }else if (rarityNft == 4) {
    //                 rarityCool = 'Shrimp'
    //             }
    //             console.log('::::::: ********** :::::::  Rarity', rarityCool);
    //             const uri = await nftMinter.connect(signer).tokenURI(nftId);
    //             let metadataJson = {}
    //             metadataJson.bpay = nftTypesBpay[rarityCool.toString()];
    //             metadataJson.id = nftId;
    //             metadataJson.name = rarityCool;
    //             metadataJson.image = `https://blockpay.nyc3.digitaloceanspaces.com/nfts-prd/${ rarityCool }.png`;
    //             nftArray.push(metadataJson);
    //         }

    //         cryptoStore.nftsLoading = false;

    //         return nftArray;
    //     } catch(error) {

    //         web3log.error('Error getting NFTs', error);
    //         cryptoStore.nftsLoading = false;
    //         return [];
    //     }
    // };

    const addNftToWallet = async (nftId, image, customViewUrl = '') => {
        try {
            let wasAdded  = false
            if (window.ethereum && window.avalanche) {
                useNuxtApp().$toast.success('Your NFT has been automatically detected by Core Wallet.', {
                    position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                    timeout: 250000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                });
                return
            }else{
                wasAdded = await window.ethereum.request({
                    method: 'wallet_watchAsset', params: {
                        type: 'ERC20', options: {
                            address: bpayNftAddress, // Dirección del contrato del NFT
                            symbol: 'BPAYNFTs', // Un símbolo corto para el NFT
                            decimals: 0, // ERC-721 tokens no tienen decimales
                            image: image, // Una URL de imagen para el NFT
                            customViewUrl: ``, // Un enlace a una página que muestra información detallada sobre el NFT
                        },
                    },
                });
            }
            if(wasAdded) {
                useNuxtApp().$toast.success('The NFT has been successfully added to your wallet!', {
                    position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                    timeout: 250000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                });
            } else {
                useNuxtApp().$toast.error('Failed to add the NFT to your wallet. Please try again.', {
                    position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                    timeout: 250000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                });
            }
        } catch(error) {
            decodeErrors(error);
        }
    };

    // create a function to add BPAY token to wallet using bpayTokenAddress, symbol is BPAY
    const addTokenToWallet = async () => {
        if(window.etherum && window.avalanche) {
            /// BPAY Token has been automatically detected by Core Wallet
            useNuxtApp().$toast.success('BPAY Token has been automatically detected by Core Wallet', {
                position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                timeout: 250000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
            });
            return
        }

        const wasAdded = await window.ethereum.request({
            method: 'wallet_watchAsset', params: {
                type: 'ERC20', options: {
                    address: bpayTokenAddress, // NFT contract address
                    symbol: 'BPAY', // A ticker symbol or shorthand, up to 5 chars.
                    decimals: 18, // The number of decimals in the token
                    image: 'https://i.ibb.co/j56QHCs/KPQ-q-Pez-400x400.jpg', // A string url of the token logo
                    customViewUrl: ``, // A string url of a website that displays more information about the token
                },
            },
        });

        if(wasAdded) {
            useNuxtApp().$toast.success('BPAY Token was successfully added to your wallet!', {
                position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                timeout: 250000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
            });
        } else {
            useNuxtApp().$toast.error('Failed to add the NFT to your wallet. Please try again.', {
                position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                timeout: 250000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
            });
        }
    };

    // create a function to verify if staker is online calling getter online(), if true
    // return a message saying that staker is online, if false return a message saying that staker is offline

    const isOnline = async () => {
        try {
            const staker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());
            const signer = cryptoStore.globalProvider.getSigner();
            const online = await staker.connect(signer).online();
            return !!online;
        } catch(error) {
            decodeErrors(error);
        }
    };

    // const getStakedNfts = async () => {
    //     if(!cryptoStore.currentAccount) {
    //         return false;
    //     }

    //     cryptoStore.stakedNftsLoading = true;

    //     web3log.info('Getting staked NFTs...');

    //     try {
    //         const staker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());
    //         const signer = cryptoStore.globalProvider.getSigner();
    //         const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();

    //         web3log.info('STAKER', staker);
    //         web3log.info('SIGNER', signer);
    //         web3log.info('CURRENT ACCOUNT', currentAccount);

    //         const nftCount = await staker.connect(signer).nftCount(currentAccount);

    //         web3log.info('NFT COUNT', nftCount);

    //         const investments = [];

    //         for(let i = 0; i < nftCount; i++) {
    //             const investment = await staker.connect(signer).investments(currentAccount, i);
    //             investments.push(investment);
    //         }

    //         const stakedNfts = [];

    //         for(let i = 0; i < investments.length; i++) {

    //             const nftId = investments[i].tId.toString();
    //             const nftMinter = new ethers.Contract(bpayNftAddress, contractABI, cryptoStore.globalProvider.getSigner());
    //             const uri = await nftMinter.connect(signer).tokenURI(nftId);
    //             console.log("Estas entrando amigo????")
    //             const rarityNft = await nftMinter.connect(signer).tokenRarity(nftId);
    //             let rarityCool
    //             if (rarityNft == 1) {
    //                 rarityCool = 'Whale'
    //             }else if (rarityNft == 2) {
    //                 rarityCool = 'Shark'
    //             }else if (rarityNft == 3) {
    //                 rarityCool = 'Dolphin'
    //             }else if (rarityNft == 4) {
    //                 rarityCool = 'Shrimp'
    //             }
    //             console.log('::::::: ********** :::::::  Rarity', rarityCool.toString());
    //             let metadataJson = {}

    //             metadataJson.bpay = nftTypesBpay[rarityCool.toString()];
    //             console.log('::::::: ********** :::::::  metadataJson.bpay', metadataJson.bpay);
    //             metadataJson.image = `https://blockpay.nyc3.digitaloceanspaces.com/nfts-prd/${ rarityCool }.png`;
    //             metadataJson.id = nftId;
    //             metadataJson.staked = true;
    //             metadataJson.name = rarityCool;

    //             stakedNfts.push(metadataJson);
    //         }

    //         cryptoStore.stakedNftsLoading = false;

    //         return stakedNfts;
    //     } catch(error) {

    //         web3log.error('Error getting staked NFTs', error);
    //         cryptoStore.stakedNftsLoading = false;

    //         return [];
    //     }
    // };

    // const stakeNft = async (nftId) => {
    //     try {

    //         cryptoStore.stakingLoading = true;

    //         const staker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());
    //         const signer = cryptoStore.globalProvider.getSigner();
    //         const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
    //         const nftMinter = new ethers.Contract(bpayNftAddress, contractABI, cryptoStore.globalProvider.getSigner());
    //         const count = await verifyMainNet() ? await nftMinter.connect(signer).balanceOf(currentAccount) : 0;
    //         if(count > 0) {
    //             const tx_1 = await nftMinter.connect(signer).approve(stakerAddress, nftId);
    //             const receipt_1 = await tx_1.wait();
    //             const tx_2 = await staker.connect(signer).stakeNFT(nftId);
    //             const receipt_2 = await tx_2.wait();
    //             const secondEvent = receipt_2.events[2];
    //             const args = receipt_2.events[2].args;

    //             if(secondEvent.event === 'NFTstaked' && args[0] === currentAccount) {
    //                 const tokenType = await nftMinter.connect(signer).tokenRarity(args[1]);
    //                 if(tokenType) {
    //                     useNuxtApp().$toast
    //                         .success(`Congrats! you successfully Stake an NFT type ${ nftTypes[tokenType.toString()] }`, {
    //                             position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
    //                             timeout: 250000,
    //                             closeOnClick: true,
    //                             pauseOnFocusLoss: true,
    //                             pauseOnHover: true,
    //                         });
    //                 }
    //             }
    //         }

    //         cryptoStore.stakedNfts = await getStakedNfts();
    //         cryptoStore.userMax = await getUserMax();

    //         cryptoStore.nfts = await getNfts();

    //         cryptoStore.stakingLoading = false;

    //     } catch(e) {
    //         decodeErrors(e);
    //         cryptoStore.stakingLoading = false;
    //     }
    // };

    const getMaxBpay = (tokenType) => {
        return nftTypesBpay[nftTypes[tokenType.toString()]].toString();
    };

    const getUSDTPrice = async () => {
        if(cryptoStore.currentAccount === '' || cryptoStore.currentAccount == null) return 0;

        try {
            const staker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());
            const price = await verifyMainNet() ?
                await staker.connect(cryptoStore.globalProvider.getSigner()).USDprice() : 0;
            return ethers.utils.formatEther(price);

        } catch(error) {
            decodeErrors(error);
        }
    };

    const bpayBalance = async () => {
        try {
            const token = new ethers.Contract(bpayTokenAddress, tokenABI, cryptoStore.globalProvider.getSigner());
            const signer = cryptoStore.globalProvider.getSigner();
            const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
            // TODO: Fix when contract is deployed on mainnet
            const balance = await verifyMainNet() ? await token.connect(signer).balanceOf(currentAccount) : 0;
            return ethers.utils.formatEther(balance);
        } catch(error) {
            decodeErrors(error);
        }
    };

    const usdtBalance = async () => {
        try {
            const token = new ethers.Contract(config.public.usdtAddress, tokenABI, cryptoStore.globalProvider.getSigner());
            const signer = cryptoStore.globalProvider.getSigner();
            const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
            // TODO: Fix when contract is deployed on mainnet
            const balance = await verifyMainNet() ? await token.connect(signer).balanceOf(currentAccount) : 0;
            // convierte el balance a 18 decimales
            console.log('Balance bro');
            // el balance viene en 6 decimales conviertelo correctamente
            let convertedBalance = ethers.utils.formatUnits(balance, 6);
            console.log('Balance bro', convertedBalance);
            return convertedBalance;
        } catch(error) {
            decodeErrors(error);
        }
    };

    const updateAvaxBalance = async () => {
        cryptoStore.avaxBalance = await avaxBalance();
    };

    const avaxBalance = async () => {
        if(cryptoStore.currentAccount === '' || cryptoStore.currentAccount == null) {
            return 0;
        }
        const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
        if(currentAccount == null) {
            return 0;
        }
        try {
            web3log.info('Getting AVAX BALANCE....');
            const signer = cryptoStore.globalProvider.getSigner();
            const balance = await signer.provider.getBalance(currentAccount);
            return ethers.utils.formatEther(balance);
        } catch(error) {
            decodeErrors(error);
        }
    };

    const determineUsdValueToSend = async (max = false, amountToBuy = 0) => {
        const signer = cryptoStore.globalProvider.getSigner();
        const nftStaker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());
        const usdPrice = await nftStaker.USDprice();
        let valueBpay = 0;
        if(max) {
            const stakedNft = await nftStaker.connect(signer).investments(currentAccount, 0);
            const stakedNftRarity = stakedNft.rar.toString();
            valueBpay = getMaxBpay(stakedNftRarity);
        } else {
            valueBpay = amountToBuy;
        }
        return usdPrice.mul(valueBpay);
    };

    const buyBpayUsdt = async (max = false, total = 0) => {

        cryptoStore.buyingLoading = true;

        try {
            const nftStaker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());
            // create an instance of the token contract
            const token = new ethers.Contract(bpayTokenAddress, tokenABI, cryptoStore.globalProvider.getSigner());

            // get the signer
            const signer = cryptoStore.globalProvider.getSigner();
            // get the current account
            const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
            // determine the max amount of BPAY to buy
            // const value = await determineUsdValueToSend(max,total);
            let usdtAddress = config.public.usdtAddress;
            let usdtContract = new ethers.Contract(usdtAddress, tokenABI, cryptoStore.globalProvider.getSigner());
            const usdPrice = await nftStaker.USDprice();

            //TODO: Modificaicon crucial para que funcione
            let approveValue = usdPrice.mul(ethers.BigNumber.from(total));
            //TODO: Modificaicon crucial para que funcione
            // el approveValue tiene que estar en 6 decimales
            // add to approveValue 0.5 ERC20 token to avoid errors
            // approveValue = approveValue.add(ethers.utils.parseEther('0.5'));
            // convierte approveValue a ether
            console.log('SUPERBALANCE');
            console.log('SUPERBALANCE', approveValue.toString());
            // convierte approveValue a 6 decimales
            // approve value tiene 18 decimales, quitale 12
            // sin utilizar ethers quitale 12 decimales
            approveValue = approveValue / 1000000000000;
            console.log('convertido mtf');
            console.log('convertido mtf', approveValue.toString());
            const tx_1 = await usdtContract.connect(signer).approve(stakerAddress, approveValue.toString());
            const receipt_tx_1 = await tx_1.wait();
            // now increase the allowance
            const allowance = await usdtContract.connect(signer).allowance(currentAccount, stakerAddress);
            // wait for the tx to be mined
            // buy the BPAY

            let totalFixed = ethers.utils.parseEther(total.toString());

            const tx_2 = await nftStaker.connect(signer)
                .USDtoBP(usdtAddress, ethers.utils.parseEther(total.toString()));
            // wait for the tx to be mined
            const receipt_2 = await tx_2.wait();
            // check bpay balance to see if it was bought
            const balance = await token.balanceOf(currentAccount);

            const eventos = receipt_2.events;
            const eventAddr = eventos[4].args[0];
            const eventAmount = eventos[4].args[1];
            // verify the balance of BPAY
            const balance2 = await token.balanceOf(currentAccount);
            // format ether to string
            const balanceFormatted = ethers.utils.formatEther(balance2);
            // verify that the balance is the same as the amount purchased

            if(eventAddr === currentAccount && eventAmount.toString() === totalFixed.toString()) {

                cryptoStore.bpayBalance = await bpayBalance();
                cryptoStore.usdtBalance = await usdtBalance();
                cryptoStore.userMax = await getUserMax();
                cryptoStore.buyingLoading = false;

                useNuxtApp().$toast.success('BPAY bought successfully!', {
                    position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                    timeout: 250000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                });

                return 'BPAY bought successfully!';
            } else {

                cryptoStore.bpayBalance = await bpayBalance();
                cryptoStore.usdtBalance = await usdtBalance();
                cryptoStore.userMax = await getUserMax();
                cryptoStore.buyingLoading = false;
                return 'There was an error buying BPAY: ' + receipt_2;
            }

        } catch(error) {
            cryptoStore.buyingLoading = false;
            decodeErrors(error);
        }
    };

    const increaseBpayAllowance = async (value = '500000000000000000000000') => {
        // create an instance of the token contract
        try {
            const token = new ethers.Contract(bpayTokenAddress, tokenABI, cryptoStore.globalProvider.getSigner());

            const signer = cryptoStore.globalProvider.getSigner();

            const tx = await token.connect(signer).increaseAllowance(stakerAddress, value);
            return await tx.wait();
        } catch(error) {
            decodeErrors(error);
        }
    };

    const buyBpay = async (max = false, total = 0) => {

        cryptoStore.buyingLoading = true;

        web3log.info('Buying BPAY...', total);

        // If the total is 0, send a toast message
        if(total <= 0) {
            useNuxtApp().$toast.error('Please enter a valid amount', {
                position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                timeout: 250000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
            });

            cryptoStore.bpayBalance = await bpayBalance();
            cryptoStore.avaxBalance = await avaxBalance();
            cryptoStore.buyingLoading = false;
            return;
        }

        try {
            // create an instance of the token contract
            const token = new ethers.Contract(bpayTokenAddress, tokenABI, cryptoStore.globalProvider.getSigner());
            const staker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());

            // get the signer
            const signer = cryptoStore.globalProvider.getSigner();

            // get the current account
            const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();

            // determine the max amount of BPAY to buy
            let valueToSend = await determineBpayToBuy(max, total);

            // convert total to big number with 17 decimals
            let totalFixed = ethers.utils.parseEther(total.toString());

            web3log.info('Total fixed', totalFixed.toString());

            const tx = await staker.connect(signer).AVAXtoBP(totalFixed.toString(), { value: valueToSend.toString() });
            const receipt = await tx.wait();
            const eventos = receipt.events;
            const eventAddr = eventos[2].args[0];
            const eventAmount = eventos[2].args[1];

            // verify the balance of BPAY
            const balance = await token.balanceOf(currentAccount);

            // format ether to string
            const balanceFormatted = ethers.utils.formatEther(balance);

            // verify that the balance is the same as the amount purchased
            if(eventAddr === currentAccount && eventAmount.toString() === totalFixed.toString()) {

                useNuxtApp().$toast.success('BPAY bought successfully!', {
                    position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                    timeout: 250000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                });

                cryptoStore.bpayBalance = await bpayBalance();
                cryptoStore.avaxBalance = await avaxBalance();
                cryptoStore.userMax = await getUserMax();
                cryptoStore.buyingLoading = false;

                return 'BPAY bought successfully!';

            } else {
                cryptoStore.bpayBalance = await bpayBalance();
                cryptoStore.avaxBalance = await avaxBalance();
                cryptoStore.userMax = await getUserMax();
                cryptoStore.buyingLoading = false;
                return 'There was an error buying BPAY: ' + receipt;
            }
        } catch(error) {
            decodeErrors(error);
            cryptoStore.bpayBalance = await bpayBalance();
            cryptoStore.avaxBalance = await avaxBalance();
            cryptoStore.buyingLoading = false;
        }
    };

    const claimNft = async () => {
        try {
            const signer = cryptoStore.globalProvider.getSigner();
            const nftStaker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());
            const tx = await nftStaker.connect(signer).claim();
            const receipt = await tx.wait();
            useNuxtApp().$toast.success('NFT UN-STAKE successfully!', {
                position: useNuxtApp().$toast.POSITION.BOTTOM_RIGHT,
                timeout: 250000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
            });
            updateNfts();
            return receipt.events;
        } catch(error) {
            decodeErrors(error);
        }
    };

    const getUserMax = async () => {
        if(cryptoStore.currentAccount === '' || cryptoStore.currentAccount == null) {
            return 0;
        }

        try {
            const signer = cryptoStore.globalProvider.getSigner();
            const nftStaker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());
            const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
            const userMax = await nftStaker.connect(signer).getUserMax(currentAccount);
            console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
            console.log("User max hdp: ", userMax.toString())
            return ethers.utils.formatEther(userMax.toString());
        } catch(error) {
            decodeErrors(error);
        }
    };

    const determineBpayToBuy = async (max = false, total = 0) => {

        // if the total is 0, return 0
        if(total <= 0) return 0;

        const signer = cryptoStore.globalProvider.getSigner();
        const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
        const nftStaker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());
        let AVAXprice = await nftStaker.connect(signer).AVAXprice();
        const stakedNft = await nftStaker.connect(signer).investments(currentAccount, 0);
        const stakedNftRarity = stakedNft.rar.toString();
        let valueBpay = 0;
        valueBpay = total;
        if(max) {
            valueBpay = getMaxBpay(stakedNftRarity);
        }
        valueBpay = ethers.utils.parseEther(valueBpay.toString());
        let valueToSend = valueBpay.mul(AVAXprice).div(ethers.BigNumber.from('1000000000000000000'));
        return valueToSend.toString();
    };

    // const nftSwitch = async () => {
    //     const nftStaker = new ethers.Contract(stakerAddress, stakerABI, cryptoStore.globalProvider.getSigner());

    //     const res = await nftStaker.nftSwitch();
    //     return res;
    // };

    // const getTotalNfts = async () => {
    //     if(cryptoStore.currentAccount === '' || cryptoStore.currentAccount == null) {
    //         return 0;
    //     }

    //     try {
    //         const nftMinter = new ethers.Contract(bpayNftAddress, contractABI, cryptoStore.globalProvider.getSigner());
    //         const signer = cryptoStore.globalProvider.getSigner();
    //         const count = await nftMinter.connect(signer).totalSupply();
    //         web3log.info('Total NFTs', count.toString());

    //         cryptoStore.totalNFTs = count.toString();

    //         return count.toString();
    //     } catch(error) {
    //         decodeErrors(error);
    //     }

    // }

    return {
        checkConnection,
        bpayAddress,
        currentAccountTrimmed,
        bpayTokenAddress,
        checkNetwork,
        claimNft,
        addTokenToWallet,
        isOnline,
        usdtBalance,
        getAVAXPrice,
        buyBpay,
        connectWallet,
        disconnectWallet,
        bpayBalance,
        buyBpayUsdt,
        determineBpayToBuy,
        increaseBpayAllowance,
        initProvider,
        etherToWei,
        weiToEther,
        addNftToWallet,
        getUSDTPrice,
        avaxBalance,
        updateAvaxBalance,
        getUserMax,
        decodeErrors,
        requestNetworkChange,
    };
};