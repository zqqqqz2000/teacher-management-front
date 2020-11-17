import Admin from './components/Admin'


export default {
    name: 'routes',
    routes: [
        {
            path: '/',
            component: Admin,
            meta: {
                title: '登录'
            }
        }
    ]
}