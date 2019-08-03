
import asyncComponent from '../components/Boundle/Boundle'

export default {
  path: '/category',
  component: asyncComponent(() => import('@/views/categoryManage/list.js')),
  exact: true,
  children: [

  ]
}
