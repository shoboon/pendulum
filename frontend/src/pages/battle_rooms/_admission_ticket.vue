<template>
    <div>
        対戦ルームです<br>
        {{ msg }}
        {{ fencerType }}
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
                'battleStatus',
                'fencer'
            ]),
            msg: function () {
                if (this.battleStatus.isReady()) {
                    return "対戦相手を待っています..."
                }
                if (this.battleStatus.isStarted()) {
                    return "対戦を開始します"
                }
                if (this.battleStatus.isEnded()) {
                    return "対戦が終了しました"
                }
            },
            fencerType: function () {
                if (this.fencer === null) {
                    return '未設定'
                }
                return this.fencer.type.value
            }
        }
    }
</script>