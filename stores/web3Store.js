import {defineStore} from 'pinia';
import {ref, computed, markRaw} from 'vue';
import {ethers, Contract} from 'ethers';
import {useToast} from 'vue-toast-notification';
import {useRuntimeConfig} from '#app';
import {MetaMaskWallet, CoreWallet, RabbyWallet, TrustWallet, WalletConnect} from '@thirdweb-dev/wallets';

import {MetaMaskSDK} from '@metamask/sdk';

export const SUPPORTED_WALLETS = {
	METAMASK: 'metamask',
	TRUST: 'trust',
	CORE: 'core',
	RABBY: 'rabby',
	WALLET_CONNECT: 'walletconnect',
};

export const useWeb3Store = defineStore('web3', () => {
	const toast = useToast();
	const config = useRuntimeConfig();
	const chainId = parseInt(config.public.chainId);
	const burritoTokenAddress = config.public.burritoTokenAddress;
	const usdtAddress = config.public.usdtAddress;
	const isMobileDevice = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
	const walletMobileLoading = ref(false);
	// State
	const walletInstance = ref(null);
	const signer = ref(null);
	const provider = ref(null);
	const address = ref(null);
	const currentChainId = ref(null);
	const connectionStatus = ref('disconnected');
	const connectionError = ref(null);
	const initLoading = ref(false);

	// Balance tracking
	const balances = ref({
		native: '0',
		burrito: '0',
		usdt: '0',
	});

	// Computed
	const isConnected = computed(() => connectionStatus.value === 'connected');
	const isConnecting = computed(() => connectionStatus.value === 'connecting');
	const formattedAddress = computed(() => {
		if (!address.value) return '';
		return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`;
	});
	const isCorrectNetwork = computed(() => currentChainId.value === chainId);

	const resetState = () => {
		console.log('🔄 Resetting state');
		walletInstance.value = null;
		signer.value = null;
		provider.value = null;
		address.value = null;
		currentChainId.value = null;
		connectionStatus.value = 'disconnected';
		connectionError.value = null;
		balances.value = {
			native: '0',
			burrito: '0',
			usdt: '0',
			usd: '0',
		};
	};


	const getThirdWebWalletProvider = async (providerName) => {
		let wallet;

		const dappMetadata = {
			name: 'BurritoAI',
			url: 'https://burritoai.finance',
			description: 'Simplifying crypto AI Markets',
			logoUrl: 'https://burritoai.com/favicon.ico',
		};

		try {
			const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			);

			if (isMobileDevice) {
				console.log('📱 Mobile device detected, provider:', providerName);

				const dappMetadata = {
					name: 'BurritoAI',
					url: 'https://burritoai.finance',
					description: 'Simplifying crypto AI Markets',
					logoUrl: 'https://burritoai.com/favicon.ico',
				};

				const mmsdk = new MetaMaskSDK({
					dappMetadata,
					// checkInstallationImmediately: false,
					openDeeplink: (link) => {
						// Aquí manejas cómo se abre el deeplink
						window.location.href = link;

					},

					/* logging: {
						developerMode: true,
						sdk: true
					}**/
				});
				console.log('🔌 Provider:', mmsdk.getProvider());
				const accounts = await mmsdk.connect();
				console.log('🔌 Wallet:', accounts);
				console.log('🔌 Wallet accounts array from provider:', mmsdk.getProvider().state.accounts);

				let mmsdkProvider = mmsdk.getProvider();

				if (!mmsdkProvider?.state?.accounts) {
					/// request connection again
					await mmsdk.getProvider().request({method: 'eth_requestAccounts'});
					// now print again the accounts
					console.log('🔌 Wallet accounts array from provider:', mmsdk.getProvider().state.accounts);
				}
				const web3Provider = new ethers.providers.Web3Provider(mmsdkProvider);
				const signer = web3Provider.getSigner();
				const walletObject = new MetaMaskWallet({
					dappMetadata, qrcode: false,
				});
				return {
					wallet: markRaw(walletObject),
					provider: markRaw(web3Provider),
					signer,
				};

			} else {
				console.log('🖥️ Desktop device detected, using preferred wallet:', providerName);

				switch (providerName) {
					case 'metamask':
						wallet = new MetaMaskWallet({
							dappMetadata, qrcode: false,
						});
						break;
					case 'core':
						wallet = new CoreWallet({
							dappMetadata,
						});
						break;
					case 'rabby':
						wallet = new RabbyWallet({
							dappMetadata,
						});
						break;
					default:
						wallet = new MetaMaskWallet({
							dappMetadata,
						});
				}

				console.log('🔌 Wallet:', wallet);

				await wallet.connect();

				const walletSigner = await wallet.getSigner();

				console.table({
					'🔌 Wallet provider': wallet.provider,
					'🔑 Wallet signer': walletSigner,
				});

				return {
					wallet: markRaw(wallet),
					provider: markRaw(walletSigner.provider),
					signer: markRaw(walletSigner),
				};
			}

		} catch (error) {
			console.error('Error en provider:', error);
			throw error;
		}
	};


	// Add this helper function to manage connection persistence
	const getStoredConnection = () => {
		try {
			const storedData = localStorage.getItem('walletConnection');
			if (!storedData) return null;

			const data = JSON.parse(storedData);
			const expiryTime = 24 * 60 * 60 * 1000; // 24 hours

			if (Date.now() - data.timestamp > expiryTime) {
				localStorage.removeItem('walletConnection');
				return null;
			}

			return data;
		} catch (err) {
			console.error('Error reading stored connection:', err);
			return null;
		}
	};

	const storeConnection = (address, chainId) => {
		try {
			localStorage.setItem('walletConnection', JSON.stringify({
				address,
				chainId,
				timestamp: Date.now()
			}));
		} catch (err) {
			console.error('Error storing connection:', err);
		}
	};

	const setWalletListeners = (shouldListen) => {
		try {
			const currentProvider = provider.value;

			if (!currentProvider) {
				console.warn('No provider available for setting listeners');
				return;
			}

			// Usamos los métodos on/off directamente del provider
			if (shouldListen) {
				if (typeof currentProvider.on === 'function') {
					currentProvider.on('accountsChanged', handleAccountsChanged);
					currentProvider.on('chainChanged', handleChainChanged);
				}
			} else {
				if (typeof currentProvider.off === 'function') {
					currentProvider.off('accountsChanged', handleAccountsChanged);
					currentProvider.off('chainChanged', handleChainChanged);
				}
				localStorage.removeItem('currentAccount');
			}
		} catch (error) {
			console.warn('Error in setListeners:', error);
		}
	};

	const handleAccountsChanged = async (accounts) => {
		if (Array.isArray(accounts) && accounts.length === 0) {
			await disconnect();
			return;
		}
		address.value = accounts[0];
		await refreshBalances();
	};

	const handleChainChanged = async (newChainId) => {
		currentChainId.value = parseInt(newChainId);
		await refreshBalances();
	};

	const updateUsdBalance = (balance) => {
		balances.value.usd = balance || '0';
	};

	const isReconnection = () => {
		const savedWallet = localStorage.getItem('preferredWallet');
		const currentAccount = localStorage.getItem('currentAccount');
		return savedWallet && currentAccount;
	};
	const connectWallet = async (walletType, isMobile = false) => {
		console.log('🚀 Starting wallet connection...', walletType);

		if (connectionStatus.value === 'connecting') {
			console.log('⚠️ Connection already in progress');
			return false;
		}

		try {
			connectionStatus.value = 'connecting';
			initLoading.value = true;
			connectionError.value = null;

			const {
				wallet,
				provider: walletProvider,
				signer: walletSigner,
			} = await getThirdWebWalletProvider(walletType);

			// Validate connection
			console.log('🔍 Validating connection...');
			const connectedAddress = await walletSigner.getAddress();

			console.log('🔗 Connected address:', connectedAddress);

			const network = await walletProvider.getNetwork();

			console.log('🔗 Network:', network);

			// Update state with raw objects
			console.log('📝 Updating wallet state...');
			walletInstance.value = wallet;
			provider.value = walletProvider;
			signer.value = walletSigner;
			address.value = connectedAddress;
			currentChainId.value = network.chainId;

			// Save connection info
			localStorage.setItem('currentAccount', connectedAddress);
			localStorage.setItem('providerName', walletType);
			localStorage.setItem('preferredWallet', walletType);

			// Setup event listeners and update status
			console.log('👂 Setting up wallet listeners...');
			setWalletListeners(true);
			connectionStatus.value = 'connected';

			// Refresh balances
			console.log('💰 Fetching initial balances...');
			await refreshBalances();

			// Handle authentication
			try {
				console.log('🔐 Checking authentication status...');
				const auth = useAuth();
				const authToken = localStorage.getItem('authToken');
				let meUser = null;
				console.log('🔑 Auth token:', authToken);
				if (!authToken) {
					await auth.login({wallet: connectedAddress});
				}
				meUser = await auth.me();
				if (meUser?.balance) {
					console.log('💰 Updating USD balance:', meUser.balance);
					updateUsdBalance(meUser.balance);
				}

			} catch (error) {
				console.error('❌ Authentication check failed:', error);
			}

			console.log('✅ Wallet connected successfully');
			if (!isReconnection()) toast.success('Wallet connected successfully');
			return true;

		} catch (error) {
			console.error('❌ Wallet connection failed:', error);
			connectionError.value = {
				message: error.message,
				timestamp: new Date().toISOString(),
			};
			resetState();
			toast.error(error.message || 'Failed to connect wallet');
			return false;
		} finally {
			initLoading.value = false;
		}
	};
	const refreshBalances = async (me = false) => {
		if (!isConnected.value || !provider.value || !signer.value) {
			console.warn('⚠️ Cannot refresh balances - wallet not properly connected');
			walletMobileLoading.value = false;
			return;
		}

		try {
			walletMobileLoading.value = true;
			console.log('🔄 Refreshing balances...');

			if (me) {
				try {
					let userMe = await useAuth().me();
					if (!userMe && walletInstance.value) {
						await useAuth().login({wallet: address.value});
						userMe = await useAuth().me();
					}
					if (userMe?.balances) {
						// updateUsdBalance(userMe.balance);
						balances.value = {
							...userMe.balances
						};
					}
				} catch (authError) {
					console.error('❌ Auth error:', authError);
				}
			}

			console.log('💰 Balances updated:', balances.value);
		} catch (error) {
			console.error('❌ Failed to refresh balances:', error);
			toast.error('Failed to refresh balances');
			throw error;
		} finally {
			walletMobileLoading.value = false;
		}
	};

	// En useWeb3Store
	const disconnect = async () => {
		try {
			console.log('🔌 Disconnecting wallet');
			setWalletListeners(false); // Remover listeners primero
			if (walletInstance.value?.disconnect) {
				await walletInstance.value.disconnect();
			}
			resetState();
			localStorage.removeItem('preferredWallet');
			localStorage.removeItem('currentAccount'); // Importante!
			toast.success('Wallet disconnected');
		} catch (error) {
			console.error('❌ Error disconnecting wallet:', error);
			toast.error('Failed to disconnect wallet');
			resetState();
		}
	};

	const switchToAvalanche = async () => {
		if (!walletInstance.value) {
			throw new Error('No wallet connected');
		}

		try {
			await walletInstance.value.switchChain(chainId);
			currentChainId.value = chainId;
			await refreshBalances();
			return true;
		} catch (error) {
			console.error('❌ Failed to switch network:', error);
			toast.error('Failed to switch network');
			throw error;
		}
	};

	const getAvaxPrice = async () => {
		const avaxMainnetRpc = 'https://api.avax.network/ext/bc/C/rpc';
		const provider = new ethers.providers.JsonRpcProvider(avaxMainnetRpc);
		const priceFeed = new ethers.Contract(
			'0x0A77230d17318075983913bC2145DB16C7366156',
			['function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)'],
			provider,
		);
		const [, price] = await priceFeed.latestRoundData();
		return price / 1e8;
	};

	return {
		getAvaxPrice,
		connectionStatus,
		connectionError,
		address,
		currentChainId,
		balances,
		initLoading,
		isConnected,
		isConnecting,
		formattedAddress,
		isCorrectNetwork,
		connectWallet,
		signer,
		provider,
		isMobileDevice,
		disconnect: resetState,
		walletMobileLoading,
		getThirdWebWalletProvider,
		refreshBalances,
		SUPPORTED_WALLETS,
		switchToAvalanche,
	};
});
