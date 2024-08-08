import {ethers} from 'ethers';
import chalk from 'chalk';
import {CoreWallet, MetaMaskWallet, RabbyWallet} from '@thirdweb-dev/wallets';
import ERC20 from '../contracts/ERC20.sol/ERC20.json';

export const useWeb3 = () => {

		const {successToast, errorToast} = usePrettyToast();
		const cryptoStore = useCryptoStore();
		const config = useRuntimeConfig();
		const web3log = {
			'info': (...args) => {
				console.log(chalk.bgMagenta.white(' 🚧 [web3] '), ...args);
			},
			'error': (...args) => {
				console.log(chalk.bgRed.white(' 🕸️🌳 [web3] '), ...args);
			},
			'success': (...args) => {
				console.log(chalk.bgGreen.white(' 🕸️🌳 [web3] '), ...args);
			},
		};
		const tokenABI = ERC20.abi;
		const burritoTokenAddress = config.public.burritoTokenAddress;
		const network = config.public.network;
		const chainId = parseInt(config.public.chainId);
		const isCorrectNetwork = async () => {
			let chainId = useRuntimeConfig().public.chainId;
			try {
				const providerNetwork = await cryptoStore.globalProvider.getNetwork();
				console.log("THIS IS the correct chainId", chainId);
				console.log("THIS IS the provider chainId", providerNetwork.chainId);
				cryptoStore.wrongNetwork = parseInt(providerNetwork.chainId) === parseInt(chainId);
				console.log("Correct network", cryptoStore.wrongNetwork);
				return cryptoStore.wrongNetwork;
			} catch (error) {
				web3log.error('Error checking network', error);
				return {message: 'Error checking network: ' + error.message};
			}
		};
		const getAccount = () => window.localStorage.getItem('currentAccount') || null;
		const initProvider = async (providerName, connected = false) => {

			web3log.info('Global Provider initialization');

			cryptoStore.initLoading = true;
			cryptoStore.currentAccount = getAccount();

			let provider;
			web3log.info('Provider NAME::::::::::::::::::::::::::::::::::::', providerName);

			provider = await getThirdWebWalletProvider(providerName, connected);
			window.localStorage.setItem('providerName', providerName);
			cryptoStore.globalProvider = markRaw(provider);

			web3log.info('Global Provider in store', cryptoStore.globalProvider);
			web3log.info('Crypto Store Current Account', cryptoStore.currentAccount);

			// If the current account is set, get nfts
			if (cryptoStore.currentAccount != null) {
				try {
					web3log.info('checkpoint...');
					cryptoStore.burritoBalance = await burritoBalance();
					cryptoStore.avaxBalance = await avaxBalance();
					cryptoStore.usdtBalance = await usdtBalance();
				} catch (error) {
					web3log.error('Error getting NFTs', error);
					await disconnectWallet();
				}
			}

			setListeners(true);
			await onAccountsChanged();

			cryptoStore.initLoading = false;

		};
		const etherToWei = (etherUnits) => ethers.utils.parseEther(etherUnits);
		const weiToEther = (etherUnits) => ethers.utils.formatEther(etherUnits);

		const setListeners = (bool) => {

			web3log.info('Global Provider in setListeners', cryptoStore.globalProvider);
			web3log.info('Crypto Store Current Account', cryptoStore.currentAccount);

			if (bool) {
				if (cryptoStore.globalProvider != null) {
					cryptoStore.globalProvider.provider.on('accountsChanged', onAccountsChanged);
					cryptoStore.globalProvider.provider.on('chainChanged', onChainChanged);
				}
			} else {
				if (cryptoStore.globalProvider != null) {
					cryptoStore.globalProvider.removeListener('accountsChanged', onAccountsChanged);
					cryptoStore.globalProvider.removeListener('chainChanged', onChainChanged);
				}
				window.localStorage.removeItem('currentAccount');
			}
		};
		const requestNetworkChange = async () => {
			let chainId;
			if (network === 'mainnet') {
				chainId = '0xa86a';
			} else {
				chainId = '0xa869';
			}

			try {
				let providerName = window.localStorage.getItem('providerName');
				switch (providerName) {
					case 'metamask':
						await window.ethereum.request({
							method: 'wallet_switchEthereumChain',
							params: [{chainId}],
						});
						break;
					case 'core':
						await window.avalanche.request({
							method: 'wallet_switchEthereumChain',
							params: [{chainId}],
						});
						break;
					case 'rabby':
						await window.rabby.request({
							method: 'wallet_switchEthereumChain',
							params: [{chainId}],
						});
						break;
					default:
						await window.ethereum.request({
							method: 'wallet_switchEthereumChain',
							params: [{chainId}],
						});
				}

			} catch (error) {
				console.error(error);
			}
		};
		const onAccountsChanged = async () => {
			web3log.info(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::Global Provider in onAccountsChanged', cryptoStore.globalProvider);
			await connectWallet();
			await isCorrectNetwork();
		};

		async function switchNetwork() {
			if (window.ethereum === undefined && window.avalanche === undefined && window.rabby === undefined) {
				console.log('No wallet detected');
				return {message: 'No wallet detected'};
			}
			let providerName = window.localStorage.getItem('providerName');
			let chainIdHex = parseInt(useRuntimeConfig().public.chainId) === 43114 ? '0xa86a' : '0xa869';
			chainIdHex = chainIdHex.toString();
			await isCorrectNetwork();
			let wallet;
			try {
				switch (providerName) {
					case 'metamask':
						wallet = new MetaMaskWallet({
							qrcode: false,
						});
						await wallet.connect(
							{
								dappMetadata: {
									name: 'BurritoAI',
									url: 'https://burritoai.finance',
									description: 'Simplifying crypto AI Markets',
									icons: ['https://burritoai.com/favicon.ico'],
								},
							}
						);
						chainIdHex = await wallet.switchChain(chainIdHex);
						break;
					case 'core':
						wallet = new CoreWallet();
						await wallet.connect({
							dappMetadata: {
								name: 'BurritoAI',
								url: 'https://burritoai.finance',
								description: 'Simplifying crypto AI Markets',
								icons: ['https://burritoai.com/favicon.ico'],
							},
						});
						chainIdHex = await wallet.switchChain(chainIdHex);
						break;
					case 'rabby':
						wallet = new RabbyWallet();
						await wallet.connect({
							dappMetadata: {
								name: 'BurritoAI',
								url: 'https://burritoai.finance',
								description: 'Simplifying crypto AI Markets',
								icons: ['https://burritoai.com/favicon.ico'],
							},
						});
						chainIdHex = await wallet.switchChain(chainIdHex);
						break;
					default:
						wallet = new MetaMaskWallet({
							qrcode: false,
						});
						await wallet.connect({
							dappMetadata: {
								name: 'BurritoAI',
								url: 'https://burritoai.finance',
								description: 'Simplifying crypto AI Markets',
								icons: ['https://burritoai.com/favicon.ico'],
							},
						});
						chainIdHex = await wallet.switchChain(chainIdHex);
						break;
				}
				return wallet;
			} catch (error) {
				web3log.error('Error checking network', error);
				return {message: 'Error checking network: ' + error.message};
			}
		}

		const onChainChanged = async () => {
			web3log.info('Global Provider in onChainChanged', cryptoStore.globalProvider);
			await initProvider(window.localStorage.getItem('providerName'), true);
			await isCorrectNetwork();
		};


		const connectWallet = async () => {
			web3log.info('Connecting wallet...');
			cryptoStore.initLoading = true;
			try {
				web3log.info('Global Provider in connectWallet', cryptoStore.globalProvider);
				const accounts = await cryptoStore.globalProvider.listAccounts();
				web3log.info('Accounts', accounts);
				if (!accounts.length) {
					web3log.error('No accounts found');
					await disconnectWallet();
				}
				await cryptoStore.globalProvider.send('eth_requestAccounts', []);
				window.localStorage.setItem('currentAccount', await cryptoStore.globalProvider.getSigner().getAddress());
				cryptoStore.currentAccount = getAccount();
				cryptoStore.burritoBalance = await burritoBalance();
				cryptoStore.avaxBalance = await avaxBalance();
				cryptoStore.usdtBalance = await usdtBalance();
				cryptoStore.initLoading = false;

				try {
					const {error, data} = await useBaseFetch('/users/authenticate', {
						method: 'POST',
						body: {wallet: cryptoStore.currentAccount},
					});

					if (!error.value) {
						localStorage.setItem('authToken', data.value.token);
					}

				} catch (error) {
					console.log(error)
				}


			} catch
				(error) {
				web3log.error('Error connecting wallet', error);
				cryptoStore.initLoading = false;
				await disconnectWallet();
				let e = 'Metamask not found';
				if (error.code === -32002) {
					e = 'Metamask connection is already in progress, please confirm the connection in Metamask';
					errorToast(e, 'bottom-right');
				}
			}
		};

		const disconnectWallet = async () => {
			try {
				web3log.info('Disconnecting wallet...');
				cryptoStore.currentAccount = null;
				setListeners(false);
				window.localStorage.removeItem('currentAccount');
				window.localStorage.removeItem('providerName');
				window.localStorage.removeItem('authToken');
				if (window.ethereum) {
					console.log('Disconnecting wallet');
				}

			} catch (error) {
				web3log.error('Error disconnecting wallet', error);
				decodeErrors(error);
			}
		};

		const decodeErrors = (error) => {
			// Comprobamos que 'error' no sea nulo o indefinido

			web3log.info('Decoding errors...', error);

			if (!error) {
				web3log.error('Unknown error', error);
				errorToast('Unknown error', 'bottom-right');
				return false;
			}

			const errorObj = JSON.parse(JSON.stringify(error));

			// Comprobamos si el objeto de error tiene las propiedades esperadas
			const hasCode = errorObj.code;
			const hasOperation = errorObj.operation;
			const hasReason = errorObj.reason;

			let hasDataMessage = false;
			if (typeof errorObj.data === 'object' && errorObj.data !== null) {
				hasDataMessage = 'message' in errorObj.data;
			}

			let errorMessage = '';

			if (hasCode && hasOperation && hasReason) {
				if (errorObj.code === 'UNSUPPORTED_OPERATION' && errorObj.reason === 'unknown account #0') {
					errorMessage = 'Please connect your wallet with Metamask';
				} else {
					errorMessage = errorObj.reason;
				}
			} else if (hasCode && hasReason) {
				// Comprobamos si 'reason' es una cadena que contiene dos puntos
				if (typeof errorObj.reason === 'string' && errorObj.reason.includes(':')) {
					errorMessage = errorObj.reason.split(':')[1];
				} else {
					errorMessage = errorObj.reason;
				}
			} else if (hasCode && !hasReason && hasDataMessage) {
				if (errorObj.data.message.includes('insufficient funds for gas * price + value: ')) {
					errorMessage = 'Insufficient funds';
				} else {
					// Si el mensaje de los datos no coincide con el esperado, lo devolvemos tal cual
					errorMessage = errorObj.data.message;
				}
			} else if (hasCode && !hasReason && !hasDataMessage) {
				if (hasCode === 'CALL_EXCEPTION') {
					if (errorObj.method === 'investments(address,uint256)') {
						errorMessage = 'You don\'t have any NFT in staking';
					}
				} else {
					errorMessage = `${hasCode} at ${errorObj.method}`;
				}
			} else {
				errorMessage = JSON.stringify(errorObj);
			}

			web3log.info('Error message', errorMessage);

			if (errorMessage) {
				console.log('Error message', errorMessage);
				// Mostramos el mensaje de error
				if (typeof errorMessage != 'string') {
					console.log('Error message', errorMessage);
					return false;
				}
				errorToast(errorMessage, 'bottom-right');
			}

			return false;
		};

		const addTokenToWallet = async () => {
			if (window.ethereum || window.avalanche || window.rabby) {
				successToast('Adding BurritoAI Token to your wallet...', 'bottom-right');
				return;
			}

			const wasAdded = await window.ethereum.request({
				method: 'wallet_watchAsset', params: {
					type: 'ERC20', options: {
						address: burritoTokenAddress, // NFT contract address
						symbol: 'BAI', // A ticker symbol or shorthand, up to 5 chars.
						decimals: 18, // The number of decimals in the token
						image: '', // A string url of the token logo
						customViewUrl: ``, // A string url of a website that displays more information about the token
					},
				},
			});

			if (wasAdded) {
				successToast('BurritoAI Token was successfully added to your wallet!', 'bottom-right');
			} else {
				errorToast('Failed to add the NFT to your wallet. Please try again.', 'bottom-right');
			}
		};
		const burritoBalance = async () => {
			try {
				const token = new ethers.Contract(burritoTokenAddress, tokenABI, cryptoStore.globalProvider.getSigner());
				const signer = cryptoStore.globalProvider.getSigner();
				const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
				const balance = await token.connect(signer).balanceOf(currentAccount);
				return ethers.utils.formatEther(balance);
			} catch (error) {
				decodeErrors(error);
			}
		};

		const usdtBalance = async () => {
			try {
				const token = new ethers.Contract(config.public.usdtAddress, tokenABI, cryptoStore.globalProvider.getSigner());
				const signer = cryptoStore.globalProvider.getSigner();
				const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
				const balance = await token.connect(signer).balanceOf(currentAccount);
				return ethers.utils.formatUnits(balance, 6);
			} catch (error) {
				decodeErrors(error);
			}
		};

		const updateAvaxBalance = async () => {
			cryptoStore.avaxBalance = await avaxBalance();
		};

		const avaxBalance = async () => {
			if (cryptoStore.currentAccount === '' || cryptoStore.currentAccount == null) {
				return 0;
			}
			const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
			if (currentAccount == null) {
				return 0;
			}
			try {
				const signer = cryptoStore.globalProvider.getSigner();
				const balance = await signer.provider.getBalance(currentAccount);
				return ethers.utils.formatEther(balance);
			} catch (error) {
				decodeErrors(error);
			}
		};

		const getThirdWebWalletProvider = async (provider, connected = false) => {
			let wallet;
			console.log("[GETWALLET PROVIDER] Provider: ", provider);
			switch (provider) {
				case 'core':
					wallet = new CoreWallet({});
					await wallet.connect({
						dappMetadata: {
							name: 'BurritoAI',
							url: 'https://burritoai.finance',
							description: 'Simplifying crypto AI Markets',
							icons: ['https://burritoai.com/favicon.ico'],
						},
					});
					if (!connected) await wallet.signMessage('Approve Connection to BurritoAI Platform');
					return (await wallet.getSigner()).provider;
					break;
				case 'metamask':
					wallet = new MetaMaskWallet({
						qrcode: false,
					});
					await wallet.connect({
						dappMetadata: {
							name: 'BurritoAI',
							url: 'https://burritoai.finance',
							description: 'Simplifying crypto AI Markets',
							icons: ['https://burritoai.com/favicon.ico'],
						},
					});
					if (!connected) await wallet.signMessage('Approve Connection to BurritoAI Platform');
					return (await wallet.getSigner()).provider;
					break;
				case 'rabby':
					wallet = new RabbyWallet({});
					await wallet.connect({
						dappMetadata: {
							name: 'BurritoAI',
							url: 'https://burritoai.finance',
							description: 'Simplifying crypto AI Markets',
							icons: ['https://burritoai.com/favicon.ico'],
						},
					});
					if (!connected) await wallet.signMessage('Approve Connection to BurritoAI Platform');
					return (await wallet.getSigner()).provider;
					break;
			}
		};
		return {
			addTokenToWallet,
			usdtBalance,
			connectWallet,
			disconnectWallet,
			burritoBalance,
			initProvider,
			etherToWei,
			weiToEther,
			avaxBalance,
			updateAvaxBalance,
			isCorrectNetwork,
			switchNetwork,
			decodeErrors,
			requestNetworkChange,
		};
	}
;
