import {ethers} from 'ethers';
import {CoreWallet, MetaMaskWallet, RabbyWallet, TrustWallet} from '@thirdweb-dev/wallets';
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
	const etherToWei = (etherUnits) => ethers.utils.parseEther(etherUnits);
	const weiToEther = (weiUnits) => ethers.utils.formatEther(weiUnits);
	const setListeners = (shouldListen) => {
		try {
			// Obtener el provider correcto con fallback seguro
			const provider = cryptoStore.globalProvider?.provider || cryptoStore.globalProvider;

			if (!provider) {
				console.warn('No provider available for setting listeners');
				return;
			}

			// Funciones de evento
			const onAccountsChanged = async (accounts) => {
				if (Array.isArray(accounts) && accounts.length === 0) {
					await disconnectWallet();
					return;
				}
				await connectWallet();
				await isCorrectNetwork();
			};

			const onChainChanged = async () => {
				await initProvider(window.localStorage.getItem('providerName'), true);
				await isCorrectNetwork();
			};

			// Función segura para agregar/remover listeners
			const safeSetListener = (eventName, handler) => {
				try {
					if (shouldListen) {
						// Primero intentamos remover para evitar duplicados
						if (typeof provider.removeListener === 'function') {
							provider.removeListener(eventName, handler);
						} else if (typeof provider.off === 'function') {
							provider.off(eventName, handler);
						}

						// Luego agregamos el nuevo listener
						if (typeof provider.on === 'function') {
							provider.on(eventName, handler);
						} else if (typeof provider.addListener === 'function') {
							provider.addListener(eventName, handler);
						}
					} else {
						// Removemos los listeners
						if (typeof provider.removeListener === 'function') {
							provider.removeListener(eventName, handler);
						} else if (typeof provider.off === 'function') {
							provider.off(eventName, handler);
						}
					}
				} catch (error) {
					console.warn(`Error managing ${eventName} listener:`, error);
				}
			};

			// Configurar cada evento de manera segura
			safeSetListener('accountsChanged', onAccountsChanged);
			safeSetListener('chainChanged', onChainChanged);

			if (!shouldListen) {
				window.localStorage.removeItem('currentAccount');
			}
		} catch (error) {
			console.warn('Error in setListeners:', error);
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
		console.info('Conectando wallet...');
		cryptoStore.initLoading = true;
		const auth = useAuth();
		auth.isAuthenticating.value = true;

		try {
			const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			);

			if (isMobileDevice) {
				// Forzar Trust Wallet en móvil
				window.localStorage.setItem('providerName', 'trust');
			}

			const accounts = await cryptoStore.globalProvider.listAccounts();

			if (!accounts.length) {
				console.error('No se encontraron cuentas');
				await disconnectWallet();
				return;
			}

			await cryptoStore.globalProvider.send('eth_requestAccounts', []);
			const signer = cryptoStore.globalProvider.getSigner();
			const address = await signer.getAddress();

			window.localStorage.setItem('currentAccount', address);
			cryptoStore.currentAccount = address;

			// Resto de tu lógica de autenticación...

		} catch (error) {
			console.error('Error conectando wallet', error);
			await disconnectWallet();
		} finally {
			cryptoStore.initLoading = false;
			auth.isAuthenticating.value = false;
		}
	}

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
	const initProvider = async (providerName, connected = false, isMobile = false) => {
		cryptoStore.initLoading = true;
		cryptoStore.currentAccount = getAccount();
		let provider;

		try {
			provider = await getThirdWebWalletProvider(providerName, connected, isMobile);
			if (provider === null) return 'Provider is null, mobile detected';
			// Asegurarse de que el provider sea válido
			if (!provider) {
				throw new Error('Failed to initialize provider', provider);
			}

			// delete  key providerName
			// window.localStorage.removeItem('providerName');
			window.localStorage.setItem('providerName', providerName);
			cryptoStore.globalProvider = markRaw(provider);

			// Configurar listeners después de inicializar el provider
			setListeners(true);

			if (cryptoStore.currentAccount) {
				cryptoStore.burritoBalance = await burritoBalance();
				cryptoStore.avaxBalance = await avaxBalance();
				cryptoStore.usdtBalance = await usdtBalance();
			}

			await onAccountsChanged();
		} catch (error) {
			console.error('Error initializing provider', error);
			errorToast(`Failed to initialize wallet provider with error: ${error}`, 'bottom-right');
		} finally {
			cryptoStore.initLoading = false;
		}
	};
	const getThirdWebWalletProvider = async (providerName, connected = false) => {
		let wallet;

		try {
			// Detectar si es dispositivo móvil
			const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			);

			if (isMobileDevice) {
				// Usar Trust Wallet para móvil
				wallet = new TrustWallet({
					qrcode: true, // Habilitamos QR para Trust Wallet
					preferredModalDimensions: {
						width: '100%',
						height: '100%'
					}
				});
			} else {
				// Flujo normal para desktop
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
			}

			await wallet.connect({
				dappMetadata: {
					name: 'BurritoAI',
					url: 'https://burritoai.finance',
					description: 'Simplifying crypto AI Markets',
					icons: ['https://burritoai.com/favicon.ico']
				}
			});

			const signer = await wallet.getSigner();
			return signer.provider;

		} catch (error) {
			console.error('Error en provider:', error);
			throw error;
		}
	}
	const refreshBalances = async () => {
		if (!cryptoStore.currentAccount) {
			console.error('No current account found');
			return;
		}

		try {
			cryptoStore.burritoBalance = await burritoBalance();
			cryptoStore.avaxBalance = await avaxBalance();
			cryptoStore.usdtBalance = await usdtBalance();
		} catch (error) {
			console.error('Error refreshing balances', error);
			decodeErrors(error);
		}
	}

	return {
		addTokenToWallet,
		usdtBalance,
		connectWallet,
		refreshBalances,
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
