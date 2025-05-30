import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'Demo',
    meta: {
      title: 'Demo',
      title_cn: '代码',
      index: 3,
      show: false
    },
    children: [
      {
        name: 'DemoView',
        path: '',
        component: () => import('@/views/demo/DemoView.vue')
      }
    ]
  }
]

export default routes
