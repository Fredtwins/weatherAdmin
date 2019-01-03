<template>
  <div class="top-name">
    <Header :style="{padding: 0}" class="layout-header-bar clear">
      <Icon
        @click.native="collapsedSider"
        :class="rotateIcon"
        :style="{margin: '0 20px',width:'24px',height:'24px',background:'#ccc'}"
        type="md-menu"
        size="24"></Icon>
      <div class="adminname pull-right">{{adminname}}</div>
    </Header>
  </div>
</template>

<script>
export default {
  props: {
    adminname: {
      type: String,
      default: ''
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  }
}
</script>

<style lang="scss" scoped>
.top-name {

}
</style>
