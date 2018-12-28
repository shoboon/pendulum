import Vuex from 'vuex'
import Status from '../domains/values/battle/Status'
import StatusTransition from '../domains/values/battle/StatusTransition';
import Fencer from '../domains/values/battle/fencer/Fencer'
import FencerType from '../domains/values/battle/fencer/Type'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      numberedTicket: null,
      waitingUserIntervalId: null,
      battleRoomIntervalId: null,
      battleStatus: new Status(),
      fencer: null
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
      setFencer (state, payload) {
        state.fencer = payload.fencer
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
          const numberedTicket = response.numberedTicket
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
      async fetchBattleRoom( { commit, state }, payload ) {
        const response = await this.$axios.$get('/battle_rooms/' + payload.admissionTicket)
        const newStatus = new Status(response.status)
        const oldStatus = state.battleStatus
        const transition = new StatusTransition(oldStatus, newStatus)

        if (transition.isNone()) {
          return
        }
        if (transition.isStart()) {
          const response = await this.$axios.$get('/battle_rooms/' + payload.admissionTicket +'/fencers/type')
          commit('setFencer', { fencer: new Fencer(new FencerType(response.type)) })
        }
        if (transition.isEnd()) {
          //ToDo: 終了時の処理を書く
        }
        commit('setBattleStatus', { status: newStatus })
      },
    }
  })
}

export default createStore