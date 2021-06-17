<template>
  <footer class="footer px-4">
      <div class="row align-items-center justify-content-lg-between">
        <div class="col-lg-6">
          <div class="copyright text-center text-lg-left text-muted">
            © {{ year }}
            <a
                href="https://www.creative-tim.com"
                class="font-weight-bold ml-1"
                target="_blank"
            >Brest APP</a
            >
          </div>
        </div>
        <div class="col-lg-6">
          <ul
              class="nav nav-footer justify-content-center justify-content-lg-end"
          >
            <li class="nav-item">
              <a
                  href="https://www.creative-tim.com"
                  class="nav-link"
                  target="_blank"
              >Brest APP</a
              >
            </li>
            <li class="nav-item">
              <a
                  href="https://www.creative-tim.com/presentation"
                  class="nav-link"
                  target="_blank"
              >About Us</a
              >
            </li>
            <li class="nav-item">
              <a
                  href="http://blog.creative-tim.com"
                  class="nav-link"
                  target="_blank"
              >Blog</a
              >
            </li>
            <li class="nav-item">
              <a
                  href="https://www.creative-tim.com/license"
                  class="nav-link"
                  target="_blank"
              >License</a
              >
            </li>
            <li class="nav-item d-xl-none" style="align-self: center">
              <div
                  class="sidenav-toggler "
                  :class="{
            active: $sidebar.showSidebar,
            'sidenav-toggler-dark': type === 'default',
            'sidenav-toggler-light': type === 'light',
          }"
                  @click="toggleSidebar"
              >
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
  methods:{
    toggleSidebar() {
      console.log(this.$sidebar.showSidebar);
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
  }
};
</script>
<style scoped>
  footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 1000;
  }
  .sidenav-toggler{
    padding: 10px;
  }
</style>
