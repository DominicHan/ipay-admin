import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'sys_manage',
    meta: {
      icon: 'logo-buffer',
      title: 'sys_manage'
    },
    component: Main,
    children: [
      {
        path: 'tree_table_page1',
        name: 'account',
        meta: {
          icon: 'md-git-branch',
          title: 'account'
        },
        component: () => import('@/view/components/admin-user-list/index.vue')
      },
      {
        path: '/add_admin_user',
        name: 'add_account',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/components/add-admin-user/index.vue')
      },
      {
        path: '/update_admin_user',
        name: 'update_account',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/components/update-admin-user/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'user_manage',
    meta: {
      icon: 'logo-buffer',
      title: 'user_manage'
    },
    component: Main,
    children: [
      {
        path: 'tree_table_page2',
        name: 'investors_manage',
        meta: {
          icon: 'md-git-branch',
          title: 'role'
        },
        component: () => import('@/view/components/investor-manage/index.vue')
      },
      {
        path: 'tree_table_page3',
        name: 'trans_re_manage',
        meta: {
          icon: 'md-git-branch',
          title: 'account'
        },
        component: () => import('@/view/components/trans-record-manage/index.vue')
      },
      {
        path: 'investor_relationship',
        name: 'investors_rel',
        meta: {
          hideInMenu: true,
          icon: 'ios-people',
          title: 'investors_rel'
        },
        component: () => import('@/view/components/investor-relationship/index.vue')
      },
      {
        path: 'investor_edit',
        name: 'investor_edit',
        meta: {
          hideInMenu: true,
          icon: 'ios-people',
          title: 'investor_edit'
        },
        component: () => import('@/view/components/investor-edit/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'sys_setting',
    meta: {
      icon: 'logo-buffer',
      title: 'sys_setting'
    },
    component: Main,
    children: [
      {
        path: 'system_config',
        name: 'para_setting',
        meta: {
          icon: 'md-git-branch',
          title: 'para_setting'
        },
        component: () => import('@/view/components/system_config/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'game_setting',
    meta: {
      icon: 'logo-buffer',
      title: 'game_setting'
    },
    component: Main,
    children: [
      {
        path: 'game-manage',
        name: 'game_setting',
        meta: {
          icon: 'md-git-branch',
          title: 'game_setting'
        },
        component: () => import('@/view/components/game-manage/index.vue')
      },
      {
        path: '/add_game',
        name: 'add_game',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/components/add-game/index.vue')
      },
      {
        path: '/game_profit',
        name: 'game_profit',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/components/game-profit/index.vue')
      },
      {
        path: '/game_set',
        name: '游戏内容设置',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/components/game-set/index.vue')
      },
      {
        path: '/game_result_set',
        name: 'game_result_set',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/components/game-result-set/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'message',
    meta: {
      icon: 'logo-buffer',
      title: 'message'
    },
    component: Main,
    children: [
      {
        path: 'push_message',
        name: 'send_message',
        meta: {
          icon: 'md-git-branch',
          title: 'send_message'
        },
        component: () => import('@/view/components/push-message/index.vue')
      },
      {
        path: 'push_message_list',
        name: 'message_list',
        meta: {
          icon: 'md-git-branch',
          title: 'message_list'
        },
        component: () => import('@/view/components/push-message-list/index.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
