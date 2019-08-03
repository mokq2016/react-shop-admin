
import asyncComponent from '../components/Boundle/Boundle'

export default [
  {
    path: '/test1',
    component: asyncComponent(() => import('@/views/test/test1.js')),
    exact: true
  },
  {
    path: '/test2',
    component: asyncComponent(() => import('@/views/test/test2.js')),
    exact: true
  }
]
