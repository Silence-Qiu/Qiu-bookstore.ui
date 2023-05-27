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
  {
    name: 'student-borrow-book',
    icon: 'icon-book-borrow',
    path: '/student-borrow-book/',
    component: './StudentBorrowBook/Index.tsx',
  },
  {
    name: 'books',
    icon: 'icon-tushu',
    path: '/books/',
    component: './Books/Index.tsx',
  },
  {
    name: 'classes',
    icon: 'icon-banji',
    path: '/classes/',
    component: './Classes/Index.tsx',
  },
  {
    name: 'students',
    icon: 'icon-xuesheng',
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
