import asyncComponent from '../components/Boundle/Boundle'

/* const userComponent = (props) => {
  <Bundle load={() => import('@/views/userManage/userManage.js')}>
    {userComponent => <userComponent {...props} />}
  </Bundle>
} */

export default {
  path: '/userManage',
  component: asyncComponent(() => import('@/views/userManage/userManage.js')),
  exact: true,
  children: [

  ]
}
