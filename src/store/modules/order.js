export default{
    state: {
        orders: [
            {
                id:1,
                product_id: 1,
                product_name:'商品1',
                product_image: require('@/assets/product-1.png'),
                price: 100,
                product_tag: ['all', '帐篷天幕类'],
                size: '10*10',
                material: '无纺布',
                suitable_users: 5,
                brand: 'LV',
                purchase_quantity: 2
            }
        ]
    }
}