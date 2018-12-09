<template>
    <div>
        対戦ルームです<br>
        {{ msg }}
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        mounted() {
            this.pollingBattleRoom({admissionTicket: this.$route.params.admission_ticket})
        },
        methods: {
            ...mapActions([
                'pollingBattleRoom'
            ]),
        },
        computed: {
            ...mapState([
                'battleStatus'
            ]),
            msg: function () {
                if (this.battleStatus === 'ready') {
                    return "対戦相手を待っています..."
                }
                if (this.battleStatus === 'started') {
                    return "対戦を開始します"
                }
                if (this.battleStatus === 'ended') {
                    return "対戦が終了しました"
                }
            }
        }
    }
</script>