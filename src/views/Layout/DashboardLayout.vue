<template>
  <div class="wrapper">
    <!-- <notifications></notifications> -->
    <side-bar>
      <template v-slot:links>
        <sidebar-item
            :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard',
          }"
        />
        <sidebar-item
            :link="{
            name: 'Brands',
            icon: 'ni ni-planet text-primary',
            path: '/brands',
          }"
        />
        <sidebar-item
            :link="{
            name: 'Outlets',
            icon: 'ni ni-shop text-primary',
            path: '/outlets',
          }"
        />
        <sidebar-item
            :link="{
            name: 'Departments',
            icon: 'ni ni-building text-primary',
            path: '/departments',
          }"
        />
        <sidebar-item
            :link="{
            name: 'Users',
            icon: 'fas fa-users text-primary',
            path: '/users',
          }"
        />
        <sidebar-item
            :link="{
            name: 'Menu Items',
            icon: 'ni ni-folder-17 text-primary',
            path: '/items',
          }"
        />
        <!--        <sidebar-item-->
        <!--          :link="{-->
        <!--            name: 'Reports',-->
        <!--            icon: 'ni ni-single-copy-04 text-primary',-->
        <!--            path: '#',-->
        <!--          }"-->
        <!--        />-->
        <sidebar-item
            :link="{
            name: 'Payments',
            icon: 'ni ni-money-coins text-primary',
            path: '/payments',
          }"
        />
        <sidebar-item
            :link="{
            name: 'Orders',
            icon: 'ni ni-cart text-primary',
            path: '/orders',
          }"
        />
      </template>

    </side-bar>
    <div class="main-content">
<!--      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>-->

      <div @click="$sidebar.displaySidebar(false)">

        <router-view></router-view>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
  },
  mounted() {
    this.initScrollbar();
  },
};
</script>
<style lang="scss">
.main-content{
  height: 100vh;
}
</style>
