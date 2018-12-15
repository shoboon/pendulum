import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      numberedTicket: null,
      waitingUserIntervalId: null,
      battleRoomIntervalId: null,
      battleStatus: 'ready'
    }),
    mutations: {
      setNumberedTicket (state, payload) {
        state.numberedTicket = payload.numberedTicket
      },
      setBattleStatus (state, payload) {
        state.battleStatus = payload.status
      },
      setWaitingUserIntervalId (state, payload) {
        state.waitingUserIntervalId = payload.intervalId
      },
      setBattleRoomIntervalId (state, payload) {
        state.battleRoomIntervalId = payload.intervalId
      },
      clearWaitingUserIntervalId (state) {
        clearInterval(state.waitingUserIntervalId)
        state.waitingUserIntervalId = null
      },
      clearBattleRoomIntervalId (state) {
        clearInterval(state.battleRoomIntervalId)
        state.battleRoomIntervalId = null
      },
    },
    actions: {
        async requestNumberedTicket({ commit }) {
            const response = await this.$axios.$get('/numbered_ticket')
            const numberedTicket = response.numberedticket
            commit("setNumberedTicket", {numberedTicket: numberedTicket})
            this.$router.push('/waiting_users/' + numberedTicket)
        },
        async pollingWaitingUser ( { dispatch, commit }, payload ) {
          const intervalId = setInterval(() => { dispatch('fetchWaitingUser', { numberedTicket: payload.numberedTicket }) }, 5000);
          commit('setWaitingUserIntervalId', { intervalId })
        },
        async pollingBattleRoom ( { dispatch, commit }, payload ) {
          const intervalId = setInterval(() => { dispatch('fetchBattleRoom', { admissionTicket: payload.admissionTicket }) }, 5000);
          commit('setBattleRoomIntervalId', { intervalId })
        },
        async fetchWaitingUser( { commit }, payload ) {
            const response = await this.$axios.$get('/waiting_users/' + payload.numberedTicket)
            const status = response.status
            if (status === 'waiting') {
              return
            }
            if (status === 'admission') {
                console.log('入場します')
                this.$router.push('/battle_rooms/' + response.admissionTicket)
            }
            if (status === 'exited') {
                this.$router.push('/')
            }
            commit('clearWaitingUserIntervalId')
        },
        async fetchBattleRoom( { commit }, payload ) {
          const response = await this.$axios.$get('/battle_rooms/' + payload.admissionTicket)
          const status = response.status

          if (status === 'ready') {
            return
          }
          if (status === 'started' || status === 'ended') {
              commit('setBattleStatus', { status })
          }
          commit('clearBattleRoomIntervalId')
      }
    }
  })
}

export default createStore