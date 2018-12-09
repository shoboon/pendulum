<template>
    <div>
        マッチング中・・・
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        mounted() {
            this.pollingWaitingUser({numberedTicket: this.$route.params.numbered_ticket})
        },
        methods: {
            ...mapActions([
            'pollingWaitingUser'
            ]),
        }
    }
</script>