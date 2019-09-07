import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization:
    "Bearer ErWcgn221jmQgnbN4UHLxfKg4YSfiu0nIBMs4nU2UQEFCdB7ya0aaq5sHVMd"
};

export default new Vuex.Store({
  state: {
    isLoading: true,
    hovering: {},
    rooms: [],
    currentRoom: {},
    booking: []
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setRooms(state, payload) {
      state.rooms = payload;
    },
    setHovering(state, payload) {
      state.hovering = payload;
    },
    setCurrentRoom(state, payload) {
      state.currentRoom = payload;
    },
    setBooking(state, payload) {
      state.booking = payload;
    }
  },
  actions: {
    getAllRooms({ commit }) {
      commit("setLoading", true);
      Vue.axios
        .get("https://challenge.thef2e.com/api/thef2e2019/stage6/rooms", {
          headers
        })
        .then(res => {
          if (res.data.success) {
            commit("setRooms", res.data.items);
            commit("setLoading", false);
          }
        });
    },
    async getRoom({ commit }, roomId) {
      await Vue.axios
        .get(
          "https://challenge.thef2e.com/api/thef2e2019/stage6/room/" + roomId,
          { headers }
        )
        .then(res => {
          if (res.data.success) {
            commit("setCurrentRoom", res.data.room[0]);
            commit("setBooking", res.data.booking);
          }
        });
    }
  }
});
