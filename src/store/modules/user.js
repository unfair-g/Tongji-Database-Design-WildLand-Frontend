import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
    state: {
        users: [
            {
                user_id: 2004090642,
                user_name: 'unfair',
                password: '123456',
                email: '',
                phone_number: 18247855400,
                gender: '女',
                birthday: '2004-09-06',
                personal_signature: 'lalalalalala',
                location: '上海',
                points: 50,
                follows: 10,
                fans: 10,
                outdoor_master_title: false
            },
            {
                user_id: 2003082200,
                user_name: '',
                password: '',
                email: '',
                phone_number: '',
                gender: '',
                birthday: '',
                personal_signature: '',
                location: '',
                points: 0,
                follows: 0,
                fans: 0,
                outdoor_master_title: false
            },
        ],
        userInfo: null
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
    },
    actions: {
        async fetchUserInfo({ commit }, token) {
            try {
                const response = await axios.get(`https://localhost:7218/api/Users/getUserInfo`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                commit('setUserInfo', response.data.data);
            } catch (error) {
                ElMessage.error('error');
                console.error('Fetching user info failed:', error);
            }
        }
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        }
    }
}