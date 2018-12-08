<template>
  <v-layout
    column
    justify-center
    align-center>

    トップページ
    <button @click="requestNumberedTikect()">マッチング</button>

  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      matching() {
        this.requestNumberedTikect()
      },
      ...mapActions([
        'requestNumberedTikect'
      ]),
    }
  }
</script>
