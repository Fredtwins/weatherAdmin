<template>
	<div class="home">
    <top-nav />
    <section class="home-warpper">
			<router-view></router-view>
		</section>
  </div>
</template>

<script>
import TopNav from 'components/Nav/topnav'

export default {
  components: {
    TopNav
  },
  data() {
    return {

    };
  }
}
</script>

<style lang="scss" scope>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  > .home-warpper {

  }
}
</style>
