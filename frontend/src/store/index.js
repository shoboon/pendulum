import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      numberedTicket: null
    }),
    mutations: {
      setNumberedTicket (state, payload) {
        state.numberedTicket = payload.numberedTicket
      }
    },
    actions: {
        async requestNumberedTikect({ commit }) {
            const response = await this.$axios.$get('/numbered_tikect')
            const numberedTicket = response.numberedTikect
            commit("setNumberedTicket", {numberedTicket: numberedTicket})
            this.$router.push('/waiting_users/' + numberedTicket)
        },
        async fetchWaitingUser( context, payload ) {
            const response = await this.$axios.$get('/waiting_users/' + payload.numberedTicket)
            const status = response.status
            if (status === 'admission') {
                console.log('入場します')
                this.$router.push('/battle_rooms/aaaaaa')
            }
            if (status === 'exited') {
                this.$router.push('/')
            }
            console.log(status);
        }
    }
  })
}

export default createStore