<!-- components/GtmNoscript.vue -->
<template>
  <noscript>
    <iframe
      :src="`https://www.googletagmanager.com/ns.html?id=${gtmId}`"
      height="0"
      width="0"
      style="display:none;visibility:hidden"
    ></iframe>
  </noscript>
</template>

<script setup>
const gtmId = 'GTM-KSS5DT2L'
</script>
