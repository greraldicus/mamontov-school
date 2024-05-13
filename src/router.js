import { createRouter, createWebHistory } from 'vue-router';
import BookingView from "./views/BookingView";
import MapView from "./views/MapView";
import ProfileView from "./views/ProfileView";
import ModalStartMenu from "./components/modals/ModalStartMenu";
import Home from "./components/Home"
import { isAuthenticated } from "./utils/authUtils";

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
    }
  ] 
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/auth' && !isAuthenticated()) {
    next('/auth');
  } else {
    next();
  }
});

export default router;

