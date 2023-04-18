export default [
  {
    path: '/user/',
    layout: false,
    routes: [
      {
        path: '/user/',
        routes: [
          {
            name: 'login',
            path: '/user/login/',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome/',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    name: '图书借阅',
    icon: 'table',
    path: '/student-borrow-book/',
    component: './StudentBorrowBook/Index.tsx',
  },
  {
    name: '图书信息',
    icon: 'table',
    path: '/books/',
    component: './Books/Index.tsx',
  },
  {
    name: '班级信息',
    icon: 'table',
    path: '/classes/',
    component: './Classes/Index.tsx',
  },
  {
    name: '学生信息',
    icon: 'table',
    path: '/students/',
    component: './Students/Index.tsx',
  },
  {
    path: '/',
    redirect: '/welcome/',
  },
  {
    component: './404',
  },
];
