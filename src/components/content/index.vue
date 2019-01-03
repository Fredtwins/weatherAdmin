<template>
  <div class="content">
    <Content
      :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
      <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
        <Form-item label="用户名称">
          <Input v-model="formInline.username" :maxlength="16" style="width:200px" placeholder="请输入"></Input>
        </Form-item>
        <div class="searchbutton">
          <button @click="submitSearch(1)">搜索</button>
          <button class="addbtn" @click="addBtn">新增</button>
          <button class="delbtn">批量删除</button>
        </div>
        <!-- <div class="add pull-right">
          <Button type="primary">
            <span class="icon-xinzeng"></span>新增</Button>
        </div> -->
		</Form>
      <div class="center table">
        <Table
          border
          stripe
          highlight-row
          :loading="loading"
          :columns="theadArr"
          :data="theaddata"></Table>
      </div>
      <div class="page">
        <Page
          :total="total"
          :current="current"
          show-elevator
          show-total
          @on-change="changePage"></Page>
      </div>
    </Content>
    <template slot="content">
			<!--新增，修改-->
			<Modal v-model="modal1" class="modalx">
				<div slot="header" ref="inter">{{updateTitle}}</div>
				<Form :model="formItem" ref="formItem" :label-width="102">
					<Form-item label="用户账号">
						<Input v-model="formItem.username" placeholder="请输入账号"></Input>
					</Form-item>
					<Form-item label="用户密码">
						<Input v-model="formItem.password" type="password" placeholder="请输入密码"></Input>
					</Form-item>
					<Form-item label="真实姓名">
						<Input v-model="formItem.realname" placeholder="请输入名称"></Input>
					</Form-item>
					<Form-item label="电话号">
						<Input v-model="formItem.mobile" placeholder="请输入联系方式"></Input>
					</Form-item>
          <Form-item label="邮箱">
						<Input v-model="formItem.mobile" placeholder="请输入邮箱"></Input>
					</Form-item>
          <Form-item label="状态">
						<!-- <Select @on-change="selectRole" v-model="formItem.role" style="width:260px">
							<Option v-for="item in statusArr" :value="item.value" :key="item.value">{{ item.value }}</Option>
						</Select> -->
            <RadioGroup v-model="formItem.role">
              <Radio label="正常" true-value="1"></Radio>
              <Radio label="禁用" false-value="0"></Radio>
            </RadioGroup>
					</Form-item>
				</Form>
				<div slot="footer">
					<Button class="footerbtn" v-if="btnSave" type="primary" @click="addclick('formItem')">保存</Button>
					<Button class="footerbtn" v-if="btnChange" type="primary" @click="changeNotice">修改</Button>
				</div>
			</Modal>

			<!--确认删除  -->
			<Modal v-model="modal2" width="360">
				<p slot="header" style="color:red;text-align:center">
					<Icon type="information-circled"></Icon>
					<span>删除</span>
				</p>
				<div style="text-align:center">
					<p>确认删除？</p>
				</div>
				<div slot="footer">
					<Button type="error" size="large" long @click="dels">确认</Button>
				</div>
			</Modal>
		</template>
  </div>
</template>

<script>
import { Getuserthead } from 'common/js/table'
import { Getuserlist, Getlist } from 'api/home'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      theadArr: Getuserthead(this),
      theaddata: [],
      total: 1,
      current: 1,
      page: 1,
      loading: false,
      formInline: {
        username: ''
      },
      modal2: false,
      btnSave: false,
      btnChange: false,
      formItem: {},
      modal1: false,
      updateTitle: '',
      statusArr: [
        {
          value: 0,
        }, {
          value: 1
        }]
    }
  },
  methods: {
    _Getuserlist(page, search) {
      this.loading = true
      Getuserlist(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          for (var i = 0; i < res.page.list.length; i++) {
            if (res.page.list[i].status === 1) {
              res.page.list[i].status = '正常'
            } else if (res.page.list[i].status === 0) {
              res.page.list[i].status = '禁用'
            }
          }
          this.theaddata = res.page.list
          this.total = res.page.totalCount
          this.current = res.page.currPage
        }
      })
    },
    changePage(page) {
      this.page = page
      this._Getuserlist(page)
    },
    submitSearch(page) {
      let search = {}
      if (this.formInline.username) {
        search.username = `${this.formInline.username}¦$¦like`
      }
      this._Getuserlist(page, search)
    },
    dels () {

    },
    addBtn () {
      this.modal1 = true
      this.updateTitle = '新增',
      this.btnSave = true
    },
    addclick () {

    },
    changeNotice() {

    },
    selectRole () {

    }
  },
  mounted () {
    this._Getuserlist()
  }
}
</script>

<style lang="scss" scoped>

</style>
