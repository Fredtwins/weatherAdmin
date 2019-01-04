<template>
  <div class="layout">
    <Layout>
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        >
        <Menu :theme="theme2" @on-select="changeActive" width="auto" :class="menuitemClasses">
          <MenuItem name="首页">
            <Icon type="ios-navigate" />
            首页
          </MenuItem>
          <Submenu
            v-for="(item, index) in dataArr"
            :name="item.name"
            :key="item.index">
            <template slot="title">
              <!-- <Icon type="ios-navigate" :class="item.icon" /> -->
              <icon-svg :name="item.icon || ''"></icon-svg>
              {{item.name}}
            </template>
            <MenuItem
              v-for="(i, index) in item.list"
              :key="i.index"
              :name="i.name">{{i.name}}</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar clear">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '0 20px',width:'24px',height:'24px',background:'#ccc'}"
            type="md-menu"
            size="24"></Icon>
          <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item>{{breadtitle}}</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">{{breadcontent}}</a></el-breadcrumb-item>
          </el-breadcrumb> -->
          <div class="adminname pull-right">{{adminname}}</div>
        </Header>
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { Getuser, GetNav } from 'api/home'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      isCollapsed: false,
      theme2: 'dark',
      adminname: '',
      menuArray: [],
      dataArr: [],
      breadtitle: '',
      breadcontent: ''
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    },
    _Getuser() {
      Getuser().then(res => {
        if (res.code === ERR_OK) {
          this.adminname = res.user.username
        }
      })
    },
    _GetNav() {
      GetNav().then(res => {
        if(res.code === ERR_OK) {
          this.dataArr = res.menuList
        }
      })
    },
    changeActive(name) {
      this.breadtitle = '系统设置'
      this.breadcontent = name
      let index = this.dataArr.findIndex(item => {
        return item.name === name
      })
      if (index === -1) {
        let obj = {}
        this.dataArr.map(item => {
          item.list.map(i => {
            if (i.name === name) {
              obj = i
            }
          })
        })
        let path = `/topnav/${obj.url}`
        this.$router.push(path)
      }
    }
  },
  mounted () {
    this._Getuser()
    this._GetNav()
  }
}
</script>

<style scoped lang="scss">
.layout{
  height: 100%;
  // border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  // border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon{
  transition: all .3s;
}
.rotate-icon{
  transform: rotate(-90deg);
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}

.adminname {
  display: inline-block;
  font-size: 24px;
  padding-right: 10px;
}

.el-breadcrumb {
  display: inline-block;
}

</style>
