export default {
    state: {
        shareposts: [
            {
                avatar: require('@/assets/avatar.jpg'),
                username: 'fby',
                time: '19分钟前',
                title: '泉州露营溯溪好去处 | 营地超详细攻略来了',
                views: 350,
                likes: 101,
                comments: 5,
                comments_details: [
                    {
                        avatar: require('@/assets/avatar.jpg'),
                        username: 'fby',
                        user_id: 360,
                        timestamp: '昨天',
                        location: '上海',
                        content: '太好了！！！',
                        likes: 5,
                        comments: 1,
                        replies: [
                            {
                                avatar: require('@/assets/avatar-female.jpg'),
                                username: 'zyj',
                                user_id: 225,
                                timestamp: '18:25',
                                location: '上海',
                                content: '支持！',
                                likes: 1,
                                comments: 0
                            }
                        ]

                    }
                ],
                post_id: 1,
                location: '上海市·同济大学嘉定校区',
                content: [
                    '夏天当然要玩水啦，小朋友的快乐就这么简单~',
                    '地址: 泉州市洛江区罗溪镇八峰露营基地',
                    '停车: 收费',
                    '路程: 晋江市区出发自驾1个多小时',
                    '人数: 11大13小',
                    '除了露营设备，我们所有食物都是自带，大家可根据人数和需求采买~',
                    '食材准备——',
                    '主食: 披萨，蛋挞，寿司',
                    '水果: 西瓜，圣女果，提子，蓝莓',
                    '烧烤: 虾，牛肉，生蚝，鸡翅，五花肉，玉米串，茄子，黄瓜，金针菇，娃娃菜',
                    '饮料: 咖啡，北冰洋，华洋，果汁，椰汁 冰红茶 娃哈哈大人小孩都爱喝'
                ],
                shortContent: '夏天当然要玩水啦，小朋友的快乐就这么简单~ 地址: 泉州市洛江区罗溪镇八峰露营基地; 停车: 收费;路程: 晋江市区出发自驾1个多小时……',
                post_images: [
                    // require('@/assets/post/post1_1.jpg'),
                    // require('@/assets/post/post1_2.jpg'),
                    require('@/assets/post/post1_3.jpg'),
                    require('@/assets/post/post1_4.jpg')
                    // require('@/assets/post/post1_5.jpg'),
                    // require('@/assets/post/post1_6.jpg')

                ]
            }
        ],
        ldleitemsposts: [

        ],
        recruitmentposts: [
            {
                avatar: require('@/assets/avatar.jpg'),
                username: 'fby',
                time: '19分钟前',
                views: 350,
                likes: 101,
                comments: 5,
                post_id: 1,
                item_summary: "野营帐篷 可以容纳10-15人 高2m 占地3m*3m",
                item_name: "闲置1",
                price: 100,
                condition: "八成新",
                item_image: require('@/assets/product-1.png')
            }

        ]
    }
}