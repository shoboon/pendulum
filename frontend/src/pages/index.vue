<template>
  <v-layout
    column
    justify-center
    align-center>

    トップページ
    <button @click="requestNumberedTicket()">マッチング</button>

  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      matching() {
        this.requestNumberedTicket()
      },
      ...mapActions([
        'requestNumberedTicket'
      ]),
    }
  }
</script>
