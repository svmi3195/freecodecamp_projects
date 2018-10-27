<template>
  <div>
    <h2>Welcome to FCC Projects SPA!</h2>
    <p>Projecs:</p>
      <p
        v-for="name in list"
        v-bind:key="name"
        > {{name}} </p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: this.$store.getters.list
    }
  }
}
</script>

<style>

</style>
