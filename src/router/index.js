
import Vue from 'vue';
import VueRouter from 'vue-router';

// 後台
import Login from '@/components/Login';
import Dashboard from '@/components/admin/Dashboard';
import Products from '@/components/admin/Products';
import Coupon from '@/components/admin/Coupon';
import Order from '@/components/admin/Order';

// 前台
import CustomerContainer from '@/components/customer/customer_container';
import CustomerIndex from '@/components/customer/customer_index';
import ProductsList from '@/components/customer/pages/ProductsList';
import CustomerCart from '@/components/customer/pages/CustomerCart';
import CartCheck from '@/components/customer/pages/CartCheck';
import CustomerCheckout from '@/components/customer/pages/CustomerCheckout';

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path: '*',
            redirect: 'login'
        },
        // 前台
        {
            path: '/',
            component: CustomerContainer,
            children: [
                {
                    path: '/',
                    name: 'customerIndex',
                    component: CustomerIndex,
                },
                {
                    path: 'productslist',
                    name: 'ProductsList',
                    component: ProductsList,
                },
                
                {
                    path: 'customer_cart',
                    name: 'CustomerCart',
                    component: CustomerCart,
                },
                {
                    path: 'cartcheck',
                    name: 'CartCheck',
                    component: CartCheck,
                },
                {
                    path: 'customer_checkout/:orderId',
                    name: 'CustomerCheckout',
                    component: CustomerCheckout,
                },
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/admin',
            meta: { requiresAuth: true },
            component: Dashboard, 
            children: [
                {
                    path: 'products',
                    name: 'products',
                    component: Products,
                },
                {
                    path: 'coupon',
                    name: 'coupon',
                    component: Coupon,
                },
                {
                    path: 'order',
                    name: 'order',
                    component: Order,
                },
            ],
        },
    ],
});