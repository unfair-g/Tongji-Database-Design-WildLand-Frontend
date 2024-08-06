const state = {
    Login: false,
    userId: 0
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
    }
    else {
        console.log('读取失败');
    }
}

export default state;