<template>
    <div>
        マッチング中・・・
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        mounted() {
            setInterval(this.fetchWaitingUser, 5000, { numberedTicket: this.$route.params.numbered_ticket });
        },
        methods: {
            ...mapActions([
            'fetchWaitingUser'
            ]),
        }
    }
</script>