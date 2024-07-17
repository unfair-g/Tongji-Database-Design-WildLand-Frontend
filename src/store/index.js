import { createStore } from 'vuex'
import user from './modules/user'

export default createStore({
  state: {
    camps: [
      {
        id: 11,
        name: '小野（半岛）',
        image: require('@/assets/camp11.png'),
        introduction: '上海最美的日落营地，可体验浆板、帆船',
        tags: ['上海'],
        location: '上海市青浦区金泽镇双祥村商周公路988号',
        infrastructures: ['停车场', '信号', '卫生间', '消防措施', '淋浴房'],
        campsite_number: 15,
        availabilities: ['可供电', '可拎包入住', '可携带宠物', '可明火', '可自带帐篷', '可过夜', '草地', '沙地'],
        detail_images: [require('@/assets/camp/detail/11-1.png'), require('@/assets/camp/detail/11-2.png'), require('@/assets/camp/detail/11-3.png'),],
        introduction_image: require('@/assets/camp/introduction/11.png'),

      },
      {
        id: 21,
        name: '竹野公园',
        image: require('@/assets/camp21.png'),
        introduction: '竹林环绕的静谧之所',
        tags: ['绍兴'],
        location: '上海市青浦区金泽镇双祥村商周公路988号',
        infrastructures: ['停车场', '信号', '卫生间', '消防措施', '淋浴房'],
        campsite_number: 15,
        availabilities: ['可供电', '可拎包入住', '可携带宠物', '可明火', '可自带帐篷', '可过夜', '草地', '沙地'],
        detail_images: [require('@/assets/camp/detail/11-1.png'), require('@/assets/camp/detail/11-2.png'), require('@/assets/camp/detail/11-3.png'),],
        introduction_image: require('@/assets/camp/introduction/11.png'),
      },
      {
        id: 22,
        name: '诸暨红枫岭营地',
        image: require('@/assets/camp22.png'),
        introduction: '藏在五泄森林中的法式小清新',
        tags: ['绍兴'],
        location: '上海市青浦区金泽镇双祥村商周公路988号',
        infrastructures: ['停车场', '信号', '卫生间', '消防措施', '淋浴房'],
        campsite_number: 15,
        availabilities: ['可供电', '可拎包入住', '可携带宠物', '可明火', '可自带帐篷', '可过夜', '草地', '沙地'],
        detail_images: [require('@/assets/camp/detail/11-1.png'), require('@/assets/camp/detail/11-2.png'), require('@/assets/camp/detail/11-3.png'),],
        introduction_image: require('@/assets/camp/introduction/11.png'),
      },
      {
        id: 31,
        name: '小野（森谷）',
        image: require('@/assets/camp31.png'),
        introduction: '林间山野，溪流石苔',
        tags: ['桐庐'],
        location: '上海市青浦区金泽镇双祥村商周公路988号',
        infrastructures: ['停车场', '信号', '卫生间', '消防措施', '淋浴房'],
        campsite_number: 15,
        availabilities: ['可供电', '可拎包入住', '可携带宠物', '可明火', '可自带帐篷', '可过夜', '草地', '沙地'],
        detail_images: [require('@/assets/camp/detail/11-1.png'), require('@/assets/camp/detail/11-2.png'), require('@/assets/camp/detail/11-3.png'),],
        introduction_image: require('@/assets/camp/introduction/11.png'),
      },
      {
        id: 41,
        name: '小野（杭州）',
        image: require('@/assets/camp41.png'),
        introduction: '不设限的城市乌托邦',
        tags: ['杭州'],
        location: '上海市青浦区金泽镇双祥村商周公路988号',
        infrastructures: ['停车场', '信号', '卫生间', '消防措施', '淋浴房'],
        campsite_number: 15,
        availabilities: ['可供电', '可拎包入住', '可携带宠物', '可明火', '可自带帐篷', '可过夜', '草地', '沙地'],
        detail_images: [require('@/assets/camp/detail/11-1.png'), require('@/assets/camp/detail/11-2.png'), require('@/assets/camp/detail/11-3.png'),],
        introduction_image: require('@/assets/camp/introduction/11.png'),
      },
      {
        id: 51,
        name: '小野（松屿）',
        image: require('@/assets/camp51.png'),
        introduction: '与湖景相伴，与松林为伍，全景观营地',
        tags: ['湖州'],
        location: '上海市青浦区金泽镇双祥村商周公路988号',
        infrastructures: ['停车场', '信号', '卫生间', '消防措施', '淋浴房'],
        campsite_number: 15,
        availabilities: ['可供电', '可拎包入住', '可携带宠物', '可明火', '可自带帐篷', '可过夜', '草地', '沙地'],
        detail_images: [require('@/assets/camp/detail/11-1.png'), require('@/assets/camp/detail/11-2.png'), require('@/assets/camp/detail/11-3.png'),],
        introduction_image: require('@/assets/camp/introduction/11.png'),
      },
      {
        id: 52,
        name: '小野（莫干山）',
        image: require('@/assets/camp52.png'),
        introduction: '抹茶千层味的山顶营地，晨起看云雾，黄昏有夕阳',
        tags: ['湖州'],
        location: '上海市青浦区金泽镇双祥村商周公路988号',
        infrastructures: ['停车场', '信号', '卫生间', '消防措施', '淋浴房'],
        campsite_number: 15,
        availabilities: ['可供电', '可拎包入住', '可携带宠物', '可明火', '可自带帐篷', '可过夜', '草地', '沙地'],
        detail_images: [require('@/assets/camp/detail/11-1.png'), require('@/assets/camp/detail/11-2.png'), require('@/assets/camp/detail/11-3.png'),],
        introduction_image: require('@/assets/camp/introduction/11.png'),
      },
      
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
