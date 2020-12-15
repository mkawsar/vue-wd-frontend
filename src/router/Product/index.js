const DashboardLayout = () => import('@/components//Layouts/DefaultLayout');
const ProductList = () => import('@/components/Product/List');
const ProductCreate = () => import('@/components/Product/Create');
const ProductEdit = () => import('@/components/Product/Edit');
const ProductDetails = () => import('@/components/Product/Details');

export default [
    {
        path: '/product',
        component: DashboardLayout,
        redirect: '/product/list',
        children: [
            {
                path: 'list',
                name: 'ProductList',
                component: ProductList,
                meta: {title: 'Product List', requireAuth: true}
            },
            {
                path: 'create',
                name: 'ProductCreate',
                component: ProductCreate,
                meta: {title: 'Product Create', requireAuth: true}
            },
            {
                path: 'edit/:id',
                name: 'ProductEdit',
                component: ProductEdit,
                meta: {title: 'Product Edit', requireAuth: true}
            },
            {
                path: 'details/:id',
                name: 'ProductDetails',
                component: ProductDetails,
                meta: {title: 'Product Details', requireAuth: true}
            }
        ]
    }
]
