const state = {
    Login: false,
    userId: 0,
};

// 保存数据到 sessionStorage
export function saveToSessionStorage(state, Id) {
    sessionStorage.setItem('state', JSON.stringify(state));
    sessionStorage.setItem('userId', JSON.stringify(Id));
    console.log('保存成功');
}

// 从 sessionStorage 恢复数据
export function loadFromSessionStorage() {
    const data = sessionStorage.getItem('state');
    if (data) {
        state.Login = true;
        const id = sessionStorage.getItem('userId')
        state.userId = JSON.parse(id);
        console.log('从storage中读取',state.Login,state.userId);
    }
    else {
        console.log('读取失败');
    }
}

export default state;

export const provinceMap = {
    "Beijing": "北京",
    "Shanghai": "上海",
    "Tianjin": "天津",
    "Chongqing": "重庆",
    "Hebei": "河北",
    "Shanxi": "山西",
    "Liaoning": "辽宁",
    "Jilin": "吉林",
    "Heilongjiang": "黑龙江",
    "Jiangsu": "江苏",
    "Zhejiang": "浙江",
    "Anhui": "安徽",
    "Fujian": "福建",
    "Jiangxi": "江西",
    "Shandong": "山东",
    "Henan": "河南",
    "Hubei": "湖北",
    "Hunan": "湖南",
    "Guangdong": "广东",
    "Hainan": "海南",
    "Sichuan": "四川",
    "Guizhou": "贵州",
    "Yunnan": "云南",
    "Shaanxi": "陕西",
    "Gansu": "甘肃",
    "Qinghai": "青海",
    "Taiwan": "台湾",
    "Inner Mongolia": "内蒙古",
    "Guangxi": "广西",
    "Tibet": "西藏",
    "Ningxia": "宁夏",
    "Xinjiang": "新疆",
    "Hong Kong": "香港",
    "Macau": "澳门"
};