export default {
    namespaced: true,
    state: {
      camp_orders: [
        {
          order_id: 1,
          campground_id: 21,
          campground_name:'竹野之地',
          startDate: 2024-7-4,
          endDate: 2024-7-6,
          selectedCampsiteIds: ['A1','A2'],
          order_person_name: '毕雅琳',
          order_person_phone_number: '123456789',
          order_person_id: '1111111111111',
          remark: '无',
          //campsite_number: ,
          total_price: 300,
          order_created_time: 2024-7-3,
        },
        {
          order_id: 1,
          campground_id: 11,
          campground_name:'小野（半岛）',
          startDate: 2024-7-4,
          endDate: 2024-7-6,
          selectedCampsiteIds: ['A1','A2'],
          order_person_name: '毕雅琳',
          order_person_phone_number: '123456789',
          order_person_id: '1111111111111',
          remark: '无',
          //campsite_number: ,
          total_price: 200,
          order_created_time: 2024-7-3,
        },

      ]
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
  