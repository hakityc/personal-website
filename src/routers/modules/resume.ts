import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
  {
    path: '/resume',
    name: 'ResumeView',
    meta: {
      title: 'Resume',
      title_cn: '简历',
      index: 5,
      show: true
    },
    children: [
      {
        path: '',
        component: () => import('@/views/resume/ResumeView.vue')
      }
    ]
  }
]
export default route
