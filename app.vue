<template>
  <NuxtLayout>
  </NuxtLayout>
</template>

<script setup>
const router = useRouter()

onMounted(() => {
  const pageName = router.currentRoute.value.name
  console.info('-----------------------> pageName', pageName)

  useTrackEvent('page_view', {
    page_title: document.title,
    page_path: window.location.pathname,
    page_name: pageName
  })
})
</script>
