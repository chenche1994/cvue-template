<template>
  <WLayout :menu="routes" />
</template>

<script>
import WLayout from "@common-ui/w-layout";
import { routes } from '@/router'
export default {
  name: "IndexVue",
  components: {
    WLayout
  },
  data() {
    return {
      opened: true,
      routes
    }
  },
  methods: {
    toggleSideBar(){
      this.opened = !this.opened
    }
  }
};
</script>

<style scoped lang="scss">
.app-wrapper{
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
