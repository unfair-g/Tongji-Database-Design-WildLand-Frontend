export default {
    namespaced: true,
    state: {
      lease_orders: [
        {
            avatar: require('@/assets/avatar.jpg'),
            username: 'sjy',
            post_id: 1,
            item_summary: "野营帐篷 可以容纳10-15人 高2m 占地3m*3m",
            item_name: "闲置1",
            price: 100,
            condition: "八成新",
            item_image: require('@/assets/product-1.png'),
            recipient_name: "zyj",
            recipient_address: "上海市·同济大学嘉定校区",
            recipient_phone: "12345678900",
            order_status: "待支付",
            order_date: "2023-04-23",
        },
      ]
    },
    mutations: {
      ADD_LEASE_ORDER(state, lease_order) {
        state.lease_orders.push(lease_order);
      }
    },
    actions: {
      addLeaseOrder({ commit }, lease_order) {
        commit('ADD_LEASE_ORDER', lease_order);
      }
    },
    getters: {
      getLeaseOrders: (state) => state.lease_orders
    }
  };
  