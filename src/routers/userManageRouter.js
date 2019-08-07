import asyncComponent from '../components/Boundle/Boundle'

export default {
  path: '/userManage',
  component: asyncComponent(() => import('@/views/userManage/userManage.js')),
  exact: true,
  children: [

  ]
}
