export default {
    namespaced: true,
    state: {
      camp_orders: []
    },
    mutations: {
      ADD_CAMP_ORDER(state, camp_order) {
        state.camp_orders.push(camp_order);
      }
    },
    actions: {
      addCampOrder({ commit }, camp_order) {
        commit('ADD_CAMP_ORDER', camp_order);
      }
    },
    getters: {
      getCampOrders: (state) => state.camp_orders
    }
  };
  