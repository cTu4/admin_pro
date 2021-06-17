<template>
  <div class="header" :class="{ [`bg-${type}`]: type }">
    <div class="container-fluid">
      <div class="header-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "base-header",
  props: {
    type: {
      type: String,
      default: "success",
      description: "Header background type",
    },
  },
};
</script>
<style scoped>
.header{
  background: linear-gradient(
      87deg
      , #5e72e4 0, #825ee4 100%) !important;
}



</style>
