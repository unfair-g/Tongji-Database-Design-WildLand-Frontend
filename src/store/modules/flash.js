export default{
    state: {
        flashes: [
            { flash_id:1,
                title: '野游营地 | 逃离燥热城市', 
                meta: ' wsy',
                like:'52900 喜爱',
                view:'370000浏览',
                comment:'260评论',
                tag:'营地推荐',
                isSolid: false,
                favorite:'3424收藏',
                content: '在八月高温的起起落落下，江浙沪又有几家新营地开业啦，有位于水边的玩水露营地也有位于山林间的避暑露营地，还有位于荒野之上的BC露营地，不得不说，现在的露营地越来越“卷”了呀！',
                avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                comments :[  
                    {  
                      auther:'wsy',
                      text: '这是一条评论', 
                      timestamp: '2023-04-01', 
                      replies: [  
                      { text: '这是第一条回复',
                      timestamp: '2023-04-01' }, // 回复也需要时间戳（如果可用）  
                      { text: '这是第二条回复', 
                      timestamp: '2023-04-01' }  
                      ]  
                    },  
                    {  
                      auther:'wsy',
                      text: '这是另一条评论',  
                      timestamp: '2023-04-01', 
                      replies: []  
                    }  
                    // 可以继续添加更多评论和回复  
                  ],
                  like_users: [  
                    { name: '张三', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },  
                    { name: '李四', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },  
                    { name: '王五', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },  
                    // 可以继续添加更多用户  
                  ],  
            },
            { flash_id:2,
                title: '野游营地 | 逃离燥热城市', 
                meta: ' wsy',
                like:'52900 喜爱',
                view:'370000浏览',
                comment:'260评论',
                tag:'营地推荐',
                isSolid: false,
            },
            { flash_id:3,
                title: '野游营地 | 逃离燥热城市', 
                meta: ' wsy',
                like:'52900 喜爱',
                view:'370000浏览',
                comment:'260评论',
                tag:'营地推荐',
                isSolid: false,
            },
          ],
    },
    mutations: {  
        toggleFlashSolid(state, flashId) {  
            const flash = state.flashes.find(f => f.id === flashId);  
            flash.isSolid = !flash.isSolid;  
          }  
      },   
}