<template>
  <div class="chat-wrapper">
    <platform-header-wallet/>
    <main class="chat-content">
      <div class="container">
        <div class="chat-experience">
          <chat-queue class="flex-grow-1"/>
          <chat-input class="m-2"/>
        </div>

        <aside class="chat-config">
          <!-- System Prompt -->
          <div class="chat-config-item mb-3">
            <label class="form-label" for="system-prompt">System Prompt</label>
            <textarea class="form-control" id="system-prompt" rows="5" v-model="systemPrompt"></textarea>
          </div>

          <!-- WebSearch Toggle -->
          <div class="chat-config-item mb-3 form-check form-switch">
            <input class="form-check-input" type="checkbox" id="web-search" v-model="webSearchEnabled">
            <label class="form-check-label" for="web-search">Enable WebSearch</label>
          </div>

          <!-- Search Type Radio Buttons -->
          <div v-if="webSearchEnabled" class="chat-config-item mb-3">
            <label class="form-label d-block">Search Type</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="searchType" id="normalSearch" value="normal" v-model="searchType">
              <label class="form-check-label" for="normalSearch">
                Normal WebSearch
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="searchType" id="deepSearch" value="deep" v-model="searchType">
              <label class="form-check-label" for="deepSearch">
                DeepSearch
              </label>
            </div>
          </div>
        </aside>
      </div>
    </main>
    <footer class="chat-footer">
    </footer>
  </div>
</template>

<script setup>
definePageMeta({middleware: 'auth'});
const user = useAuthUser();
const route = useRoute();
const router = useRouter();
const uid = route.params.uid;
const chatStore = useChatStore();
const systemPrompt = ref('');
const webSearchEnabled = ref(false);
const searchType = ref('normal');




if (!uid) {
	router.push('/');
} else {
	await chatStore.getChat(uid);
}

</script>

<style lang="sass" scoped>

.chat-wrapper
	display: flex
	flex-direction: column
	min-height: 100vh

.chat-header
	padding: 0.5rem
	border-bottom: 1px solid rgba($brand1, 0.25)

	.logo
		height: 40px

.chat-content
	flex: 1
	display: flex
	align-items: stretch

	.container
		display: flex
		flex: 1
		align-items: stretch

	.chat-experience
		flex: 1
		display: flex
		flex-direction: column

	.chat-config
		width: 300px
		padding: 1rem
		border-left: 1px solid rgba($brand1, 0.25)

.chat-footer
	border-top: 1px solid rgba($brand1, 0.25)
	padding: 1rem

</style>