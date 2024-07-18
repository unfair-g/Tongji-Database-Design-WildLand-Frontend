export default{
    state: {
        products: [
            {
                product_id: 1,
                product_name:'商品1',
                product_image: require('@/assets/product-1.png'),
                price: 100,
                product_tag: ['all', '帐篷天幕类'],
                size: '10*10',
                material: '无纺布',
                suitable_users: 5,
                brand: 'LV',
                stock_quantity: 20
            },
            {
                product_id: 2, 
                product_name: '商品2', 
                product_image: require('@/assets/product-2.png'),
                price: 200, 
                product_tag: ['all', '工具类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20
            },
            {
                product_id: 3, 
                product_name: '商品3', 
                product_image: require('@/assets/product-3.png'), 
                price: 300, 
                product_tag: ['all', '烹饪类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20

            },
            {
                product_id: 4, 
                product_name: '商品4', 
                product_image: require('@/assets/product-4.png'), 
                price: 400, 
                product_tag: ['all', '帐篷天幕类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 

            },
            { 
                product_id: 5, 
                product_name: '商品5', 
                product_image: require('@/assets/product-5.png'), 
                price: 500, 
                product_tag: ['all', '桌椅类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20
            },
            { 
                product_id: 6, 
                product_name: '商品6',
                product_image: require('@/assets/product-4.png'), 
                price: 600, 
                product_tag: ['all', '帐篷天幕类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 
            },
            { 
                product_id: 7, 
                product_name: '商品7', 
                product_image: require('@/assets/product-3.png'), 
                price: 700, 
                product_tag: ['all', '烹饪类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 
            },
            { 
                product_id: 8, 
                product_name: '商品8', 
                product_image: require('@/assets/product-2.png'), 
                price: 600, 
                product_tag: ['all', '工具类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 },
            { 
                product_id: 9, 
                product_name: '商品9', 
                product_image: require('@/assets/product-1.png'), 
                price: 500, 
                product_tag: ['all', '帐篷天幕类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 
            },
            { 
                product_id: 10, 
                product_name: '商品10', 
                product_image: require('@/assets/product-5.png'), 
                price: 400, 
                product_tag: ['all', '桌椅类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 
            },
            { 
                product_id: 11, 
                product_name: '商品11', 
                product_image: require('@/assets/product-4.png'), 
                price: 300, 
                product_tag: ['all', '帐篷天幕类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 
            },
            {
                product_id: 12, 
                product_name: '商品12', 
                product_image: require('@/assets/product-3.png'), 
                price: 200, 
                product_tag: ['all', '烹饪类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 
            },
            { 
                product_id: 13, 
                product_name: '商品13', 
                product_image: require('@/assets/product-2.png'), 
                price: 100, 
                product_tag: ['all', '工具类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 
            },
            { 
                product_id: 14, 
                product_name: '商品14', 
                product_image: require('@/assets/product-1.png'), 
                price: 100, 
                product_tag: ['all', '帐篷天幕类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 
            },
            { 
                product_id: 15, 
                product_name: '商品15', 
                product_image: require('@/assets/product-5.png'), 
                price: 100, 
                product_tag: ['all', '桌椅类'], 
                size: '10*10', 
                material: '无纺布', 
                suitable_users: 5, 
                brand: 'LV', 
                stock_quantity: 20 
            }
    
        ]
    },
  getters: {
    getProduct(productId){
      return this.products.find(product => product.product_id === parseInt(productId)); 
    }
  }
}