import { createRouter, createWebHistory } from 'vue-router';
import BookingView from "./views/BookingView";
import MapView from "./views/MapView";
import ProfileView from "./views/ProfileView";
import ModalStartMenu from "./components/modals/ModalStartMenu";
import Home from "./components/Home";
import AdminPanel from './components/AdminPanel.vue';
import AdminBookingView from "./views/AdminBookingView";
import AdminUsersView from "./views/AdminUsersView";
import { isAuthenticated } from "./utils/authUtils";
import { isAdmin } from "./utils/authUtils";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      component: ModalStartMenu
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '', 
          redirect: '/home/profile'
        },
        {
          path: 'profile',
          component: ProfileView
        },
        {
          path: 'booking',
          component: BookingView
        },
        {
          path: 'map',
          component: MapView
        }
      ]
    },
    {
      path: '/admin',
      component: AdminPanel,
      children: [
        {
          path: '', 
          redirect: '/admin/users'
        },
        {
          path: 'users',
          component: AdminUsersView
        },
        {
          path: 'booking',
          component: AdminBookingView
        }
      ]
    }
  ] 
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/auth' && !isAuthenticated()) {
    next('/auth');
  } else if (to.path.startsWith('/admin') && isAdmin() || !to.path.startsWith('/admin')) {
    next();
  } else {
    next('/home');
  }
});

export default router;

