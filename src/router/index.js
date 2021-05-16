import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import PengaduanPetugas from '../views/PengaduanPetugas.vue'
import PengaduanMasyarakat from '../views/PengaduanMasyarakat.vue'
import DataPetugas from '../views/DataPetugas.vue'
import DataMasyarakat from '../views/DataMasyarakat.vue'
import DataKategori from '../views/DataKategori.vue'
import Footer from '../views/layouts/Footer.vue'
import NavbarPetugas from '../views/layouts/NavbarPetugas.vue'
import NavbarMasyarakat from '../views/layouts/NavbarMasyarakat.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/homePetugas',
    name: 'homePetugas',
    // component: Home,
    components: {
      default: PengaduanPetugas,
      header: NavbarPetugas,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dataPetugas',
    name: 'dataPetugas',
    // component: Home,
    components: {
      default: DataPetugas,
      header: NavbarPetugas,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dataMasyarakat',
    name: 'dataMasyarakat',
    // component: Home,
    components: {
      default: DataMasyarakat,
      header: NavbarMasyarakat,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dataKategori',
    name: 'dataKategori',
    // component: Home,
    components: {
      default: DataKategori,
      header: NavbarPetugas,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pengaduanMasyarakat',
    name: 'pengaduanMasyarakat',
    // component: Home,
    components: {
      default: PengaduanMasyarakat,
      header: NavbarMasyarakat,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
