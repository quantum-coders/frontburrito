import {ethers} from 'ethers';
import {CoreWallet, MetaMaskWallet, RabbyWallet, WalletConnect} from '@thirdweb-dev/wallets';
import ERC20 from '../contracts/ERC20.sol/ERC20.json';

export const useWeb3 = () => {
	const {successToast, errorToast} = usePrettyToast();
	const cryptoStore = useCryptoStore();
	const config = useRuntimeConfig();
	const tokenABI = ERC20.abi;
	const burritoTokenAddress = config.public.burritoTokenAddress;
	const chainId = parseInt(config.public.chainId);

	const isCorrectNetwork = async () => {
		try {
			const providerNetwork = await cryptoStore.globalProvider.getNetwork();
			console.info('Provider network chainId:', providerNetwork.chainId);
			console.info('Expected chainId:', chainId);
			cryptoStore.isCorrectNetwork = parseInt(providerNetwork.chainId) === chainId;
			console.info("CryptoStore isCorrectNetwork:", cryptoStore.isCorrectNetwork);
			return cryptoStore.isCorrectNetwork;
		} catch (error) {
			console.error('Error checking network', error);
			return false;
		}
	};

	const getAccount = () => window.localStorage.getItem('currentAccount') || null;

	const initProvider = async (providerName, connected = false, isMobile = false) => {
		cryptoStore.initLoading = true;
		cryptoStore.currentAccount = getAccount();
		let provider;

		try {
			provider = await getThirdWebWalletProvider(providerName, connected, isMobile);
			window.localStorage.setItem('providerName', providerName);
			cryptoStore.globalProvider = markRaw(provider);

			if (cryptoStore.currentAccount) {
				cryptoStore.burritoBalance = await burritoBalance();
				cryptoStore.avaxBalance = await avaxBalance();
				cryptoStore.usdtBalance = await usdtBalance();
			}

			setListeners(true);
			await onAccountsChanged();
		} catch (error) {
			console.error('Error initializing provider', error);
		} finally {
			cryptoStore.initLoading = false;
		}
	};

	const etherToWei = (etherUnits) => ethers.utils.parseEther(etherUnits);
	const weiToEther = (weiUnits) => ethers.utils.formatEther(weiUnits);

	const setListeners = (shouldListen) => {
		if (shouldListen && cryptoStore.globalProvider) {
			cryptoStore.globalProvider.provider.on('accountsChanged', onAccountsChanged);
			cryptoStore.globalProvider.provider.on('chainChanged', onChainChanged);
		} else if (cryptoStore.globalProvider) {
			cryptoStore.globalProvider.provider.removeListener('accountsChanged', onAccountsChanged);
			cryptoStore.globalProvider.provider.removeListener('chainChanged', onChainChanged);
			window.localStorage.removeItem('currentAccount');
		}
	};

	const requestNetworkChange = async () => {
		const chainHexId = chainId === 43114 ? '0xa86a' : '0xa869';
		const providerName = window.localStorage.getItem('providerName');

		try {
			switch (providerName) {
				case 'metamask':
					await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{chainId: chainHexId}],
					});
					break;
				case 'core':
					await window.avalanche.request({
						method: 'wallet_switchEthereumChain',
						params: [{chainId: chainHexId}],
					});
					break;
				case 'rabby':
					await window.rabby.request({
						method: 'wallet_switchEthereumChain',
						params: [{chainId: chainHexId}],
					});
					break;
				default:
					await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{chainId: chainHexId}],
					});
			}
		} catch (error) {
			console.error('Error switching network', error);
		}
	};

	const onAccountsChanged = async () => {
		await connectWallet();
		await isCorrectNetwork();
	};

	const switchNetwork = async () => {
		if (!window.ethereum && !window.avalanche && !window.rabby) {
			console.error('No wallet detected');
			return;
		}

		const providerName = window.localStorage.getItem('providerName');
		const chainHexId = chainId === 43114 ? '0xa86a' : '0xa869';
		let wallet;

		try {
			switch (providerName) {
				case 'metamask':
					wallet = new MetaMaskWallet({qrcode: false});
					break;
				case 'core':
					wallet = new CoreWallet({qrcode: false});
					break;
				case 'rabby':
					wallet = new RabbyWallet({qrcode: false});
					break;
				default:
					wallet = new MetaMaskWallet({qrcode: false});
			}

			await wallet.connect({
				dappMetadata: {
					name: 'BurritoAI',
					url: 'https://burritoai.finance',
					description: 'Simplifying crypto AI Markets',
					icons: ['https://burritoai.com/favicon.ico'],
				},
			});
			await wallet.switchChain(chainHexId);
			return wallet;
		} catch (error) {
			console.error('Error switching network', error);
			return null;
		}
	};

	const onChainChanged = async () => {
		await initProvider(window.localStorage.getItem('providerName'), true);
		await isCorrectNetwork();
	};

	const connectWallet = async () => {
		cryptoStore.initLoading = true;

		try {
			const accounts = await cryptoStore.globalProvider.listAccounts();

			if (!accounts.length) {
				console.error('No accounts found');
				await disconnectWallet();
				return;
			}

			await cryptoStore.globalProvider.send('eth_requestAccounts', []);
			const signer = cryptoStore.globalProvider.getSigner();
			window.localStorage.setItem('currentAccount', await signer.getAddress());
			cryptoStore.currentAccount = getAccount();
			cryptoStore.burritoBalance = await burritoBalance();
			cryptoStore.avaxBalance = await avaxBalance();
			cryptoStore.usdtBalance = await usdtBalance();

			const {data} = await useBaseFetch('/users/authenticate', {
				method: 'POST',
				body: {wallet: cryptoStore.currentAccount},
			});

			if (data.value) {
				localStorage.setItem('authToken', data.value.token);
			}
		} catch (error) {
			console.error('Error connecting wallet', error);
			await disconnectWallet();

			if (error.code === -32002) {
				errorToast('Metamask connection is already in progress, please confirm in Metamask', 'bottom-right');
			}
		} finally {
			cryptoStore.initLoading = false;
		}
	};

	const disconnectWallet = async () => {
		try {
			cryptoStore.currentAccount = null;
			setListeners(false);
			window.localStorage.removeItem('currentAccount');
			window.localStorage.removeItem('providerName');
			window.localStorage.removeItem('authToken');
		} catch (error) {
			console.error('Error disconnecting wallet', error);
			decodeErrors(error);
		}
	};

	const decodeErrors = (error) => {
		console.error('Decoding error...', error);

		if (!error) {
			errorToast('Unknown error', 'bottom-right');
			return false;
		}

		let errorMessage = '';

		if (error.code && error.reason) {
			errorMessage = error.reason.includes(':') ? error.reason.split(':')[1] : error.reason;
		} else if (error.data?.message) {
			errorMessage = error.data.message.includes('insufficient funds')
				? 'Insufficient funds'
				: error.data.message;
		} else {
			errorMessage = JSON.stringify(error);
		}

		if (errorMessage) {
			errorToast(errorMessage, 'bottom-right');
		}

		return false;
	};

	const addTokenToWallet = async () => {
		if (!window.ethereum && !window.avalanche && !window.rabby) {
			errorToast('No wallet detected', 'bottom-right');
			return;
		}

		try {
			const wasAdded = await window.ethereum.request({
				method: 'wallet_watchAsset',
				params: {
					type: 'ERC20',
					options: {
						address: burritoTokenAddress,
						symbol: 'BAI',
						decimals: 18,
						image: '',
						customViewUrl: '',
					},
				},
			});

			if (wasAdded) {
				successToast('BurritoAI Token was successfully added to your wallet!', 'bottom-right');
			} else {
				errorToast('Failed to add the token to your wallet. Please try again.', 'bottom-right');
			}
		} catch (error) {
			console.error('Error adding token to wallet', error);
		}
	};

	const burritoBalance = async () => {
		try {
			const token = new ethers.Contract(burritoTokenAddress, tokenABI, cryptoStore.globalProvider.getSigner());
			const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
			const balance = await token.balanceOf(currentAccount);
			return ethers.utils.formatEther(balance);
		} catch (error) {
			decodeErrors(error);
		}
	};

	const usdtBalance = async () => {
		try {
			const token = new ethers.Contract(config.public.usdtAddress, tokenABI, cryptoStore.globalProvider.getSigner());
			const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
			const balance = await token.balanceOf(currentAccount);
			return ethers.utils.formatUnits(balance, 6);
		} catch (error) {
			decodeErrors(error);
		}
	};

	const avaxBalance = async () => {
		try {
			const currentAccount = await cryptoStore.globalProvider.getSigner().getAddress();
			const balance = await cryptoStore.globalProvider.getSigner().provider.getBalance(currentAccount);
			return ethers.utils.formatEther(balance);
		} catch (error) {
			decodeErrors(error);
		}
	};

	const getThirdWebWalletProvider = async (providerName, connected = false, isMobile = false) => {
		let wallet;
		if (isMobile) {
			window.open('https://metamask.app.link/dapp/burritoai.finance?isMobileDevice=true', '_blank');
			return;
		}

		switch (providerName) {
			case 'core':
				wallet = new CoreWallet({qrcode: false});
				break;
			case 'metamask':
				wallet = new MetaMaskWallet({qrcode: false});
				break;
			case 'rabby':
				wallet = new RabbyWallet({qrcode: false});
				break;
			default:
				wallet = new MetaMaskWallet({qrcode: false});
		}

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
		isCorrectNetwork,
		switchNetwork,
		decodeErrors,
		requestNetworkChange,
	};
};
