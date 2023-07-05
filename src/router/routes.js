const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') },
      { path: 'list-products/:id', name: 'list-products', component: () => import('pages/products/PublicProducts.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'me', name: 'me', component: () => import('pages/Me.vue') },
      { path: 'category', name: 'category', component: () => import('pages/category/List.vue') },
      { path: 'form-category/:id?', name: 'form-category', component: () => import('pages/category/Form.vue') },
      { path: 'products', name: 'products', component: () => import('pages/products/List.vue') },
      { path: 'form-products/:id?', name: 'form-products', component: () => import('pages/products/Form.vue') },
      { path: 'posts', name: 'posts', component: () => import('pages/posts/List.vue') },
      { path: 'form-posts/:id?', name: 'form-posts', component: () => import('pages/posts/Form.vue') },
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
