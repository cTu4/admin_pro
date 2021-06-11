<template>
  <div
    class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white"
    @mouseenter="$sidebar.onMouseEnter()"
    @mouseleave="$sidebar.onMouseLeave()"
  >
    <div class="scrollbar-inner" ref="sidebarScrollArea">
      <div class="sidenav-header d-flex align-items-center">
        <a class="navbar-brand" href="#">
          <img :src="logo" class="navbar-brand-img" alt="Sidebar logo" />
        </a>
        <div class="ml-auto">
          <!-- Sidenav toggler -->
          <div
            class="sidenav-toggler d-none d-xl-block"
            :class="{ active: !$sidebar.isMinimized }"
            @click="minimizeSidebar"
          >
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
      <div class="navbar-inner">
        <ul class="navbar-nav">
          <slot name="links">
            <sidebar-item
              v-for="(link, index) in sidebarLinks"
              :key="link.name + index"
              :link="link"
            >
              <sidebar-item
                v-for="(subLink, index) in link.children"
                :key="subLink.name + index"
                :link="subLink"
              >
              </sidebar-item>
            </sidebar-item>
          </slot>
        </ul>
        <slot name="links-after"></slot>

<!--        <hr class="my-3" />-->

<!--          <ul v-if="$store.state.auth" class="navbar-nav ml-auto ml-md-0">-->
<!--            <base-dropdown-->
<!--                menu-on-up-->
<!--                tag="li"-->
<!--                title-tag="a"-->
<!--                title-classes="nav-link pr-0"-->
<!--                direction="up"-->
<!--            >-->
<!--              <template v-slot:title-container>-->
<!--                <a href="#" class=" pr-0" @click.prevent>-->
<!--                  <div class="media align-items-center">-->
<!--              <span class="avatar avatar-sm rounded-circle">-->
<!--                <img alt="Image placeholder" src="img/theme/team-4.jpg" />-->
<!--              </span>-->
<!--                    <div :class="{ show: isActive }" class="media-body ml-2 d-none d-lg-block">-->
<!--                      <span class="mb-0 text-sm font-weight-bold">John Snow</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </a>-->
<!--              </template>-->

<!--              <div class="dropdown-header noti-title">-->
<!--                <h6 class="text-overflow m-0">Welcome!</h6>-->
<!--              </div>-->
<!--              <a href="#!" class="dropdown-item">-->
<!--                <i class="ni ni-single-02"></i>-->
<!--                <span>My profile</span>-->
<!--              </a>-->
<!--              <a href="#!" class="dropdown-item">-->
<!--                <i class="ni ni-settings-gear-65"></i>-->
<!--                <span>Settings</span>-->
<!--              </a>-->
<!--              <a href="#!" class="dropdown-item">-->
<!--                <i class="ni ni-calendar-grid-58"></i>-->
<!--                <span>Activity</span>-->
<!--              </a>-->
<!--              <a href="#!" class="dropdown-item">-->
<!--                <i class="ni ni-support-16"></i>-->
<!--                <span>Support</span>-->
<!--              </a>-->
<!--              <div class="dropdown-divider"></div>-->
<!--              <router-link @click="logOut" to="/login" class="dropdown-item">-->
<!--                <i class="ni ni-user-run"></i>-->
<!--                <span>Logout</span>-->
<!--              </router-link>-->
<!--            </base-dropdown>-->
<!--          </ul>-->

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "sidebar",
  props: {
    title: {
      type: String,
      default: "Creative Tim",
      description: "Sidebar title",
    },
    shortTitle: {
      type: String,
      default: "CT",
      description: "Sidebar short title",
    },
    logo: {
      type: String,
      default:
        "img/brand/BrestAppLogo.png",
      description: "Sidebar app logo",
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these.",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item",
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
    logOut(){
      this.$store.commit("logOut");
    }
  },
  mounted() {
    this.$sidebar.isMinimized = this.$sidebar.breakpoint < window.innerWidth;
    this.minimizeSidebar();
  },
  beforeUnmount() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>
