import {defineStore} from 'pinia'

export const useMarketingStore = defineStore('marketing', () => {
	const isLoading = ref(false)
	const errorData = ref('')
	const web3Store = useWeb3Store()
	const router = useRouter()
	const config = useRuntimeConfig()

	const emailRegex = /^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

	const trackEvent = (eventName, eventParams = {}) => {
		const wallet = web3Store.address || 'unknown_wallet'
		const finalParams = {
			...eventParams,
			wallet
		}
		useTrackEvent(eventName, finalParams)
	}

	const subscribe = async (email) => {
		if (!email) {
			errorData.value = 'Please enter a valid email address chump.'
			return false
		}

		if (!emailRegex.test(email)) {
			errorData.value = 'Please enter a valid email address'
			return false
		}

		errorData.value = ''
		isLoading.value = true

		try {
			const {error} = await useFetch(`${config.public.baseURL}/wait-list`, {
				method: 'POST',
				body: JSON.stringify({email})
			})

			if (error.value?.data) {
				errorData.value = error.value.data.message
				return false
			}

			// Suscripción exitosa: disparar el evento join_waitlist
			trackEvent('join_waitlist', {
				form_id: 'waitlist_form'
			})

			return true
		} catch (err) {
			errorData.value = err.message
			return false
		} finally {
			isLoading.value = false
		}
	}

	const trackPageView = () => {
		if (!process.client) return
		const pageName = router.currentRoute.value.name
		const urlParams = new URLSearchParams(window.location.search)
		const trackingParams = {
			page_title: document.title,
			page_path: window.location.pathname,
			page_name: pageName,
			traffic_source: urlParams.get('utm_source') || document.referrer || 'direct'
		}

		if (urlParams.get('utm_medium')) {
			trackingParams.utm_medium = urlParams.get('utm_medium')
		}

		if (urlParams.get('utm_campaign')) {
			trackingParams.utm_campaign = urlParams.get('utm_campaign')
		}

		trackEvent('page_view', trackingParams)
	}

	return {
		isLoading,
		errorData,
		subscribe,
		trackPageView,
		trackEvent
	}
})
