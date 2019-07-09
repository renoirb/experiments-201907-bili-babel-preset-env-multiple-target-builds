<template>
  <h1>{{ textContent }}</h1>
</template>

<script>
export default {
  params: {
    text: {
      type: String,
      default: 'Hello world',
    },
  },
  computed: {
    textContent() {
      const text = this.text
      return String(text).toLocaleUpperCase()
    },
  },
}
</script>
