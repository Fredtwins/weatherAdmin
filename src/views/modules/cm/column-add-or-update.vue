<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="父栏目编号" prop="parentId">
      <el-popover
        ref="menuListPopover"
        placement="bottom-start"
        trigger="click">
        <el-tree
          :data="menuList"
          :props="menuListTreeProps"
          node-key="menuId"
          ref="menuListTree"
          @current-change="menuListTreeCurrentChangeHandle"
          :default-expand-all="true"
          :highlight-current="true"
          :expand-on-click-node="false">
        </el-tree>
      </el-popover>
      <el-input v-model="dataForm.parentId" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input>
      <!-- <el-input v-model="dataForm.parentId" placeholder="父栏目编号"></el-input> -->
    </el-form-item>
    <el-form-item label="栏目名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="栏目名称"></el-input>
    </el-form-item>
    <el-form-item label="别名（若name是中文则值为其拼音，否则同name）" prop="alias">
      <el-input v-model="dataForm.alias" placeholder="别名（若name是中文则值为其拼音，否则同name）"></el-input>
    </el-form-item>
    <el-form-item label="模板路径" prop="modelPath">
      <el-input v-model="dataForm.modelPath" placeholder="模板路径"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="dataForm.description" placeholder="描述"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="状态  0：禁用   1：正常" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态  0：禁用   1：正常"></el-input>
    </el-form-item>
    <el-form-item label="跳转类型 1 普通目录 2 a标签 3 a标签_blank 4 直接加载url信息" prop="jumpType">
      <el-input v-model="dataForm.jumpType" placeholder="跳转类型 1 普通目录 2 a标签 3 a标签_blank 4 直接加载url信息"></el-input>
    </el-form-item>
    <el-form-item label="跳转地址" prop="jumpUrl">
      <el-input v-model="dataForm.jumpUrl" placeholder="跳转地址"></el-input>
    </el-form-item>
    <el-form-item label="菜单URL" prop="url">
      <el-input v-model="dataForm.url" placeholder="菜单URL"></el-input>
    </el-form-item>
    <el-form-item label="网站编号" prop="siteId">
      <el-input v-model="dataForm.siteId" placeholder="网站编号"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="创建者编号" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建者编号"></el-input>
    </el-form-item>
    <el-form-item label="修改者编号" prop="updateUserId">
      <el-input v-model="dataForm.updateUserId" placeholder="修改者编号"></el-input>
    </el-form-item>
    <el-form-item label="类型 1 栏目 2 文章 3 图片 4 视频 5 其它" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型 1 栏目 2 文章 3 图片 4 视频 5 其它"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { treeDataTranslate } from '@/utils'

  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          parentId: '',
          name: '',
          alias: '',
          modelPath: '',
          description: '',
          sort: '',
          status: '',
          jumpType: '',
          jumpUrl: '',
          url: '',
          siteId: '',
          createTime: '',
          updateTime: '',
          createUserId: '',
          updateUserId: '',
          type: ''
        },
        menuList: [],
        dataRule: {
          parentId: [
            { required: true, message: '父栏目编号不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '栏目名称不能为空', trigger: 'blur' }
          ],
          alias: [
            { required: true, message: '别名（若name是中文则值为其拼音，否则同name）不能为空', trigger: 'blur' }
          ],
          modelPath: [
            { required: true, message: '模板路径不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态  0：禁用   1：正常不能为空', trigger: 'blur' }
          ],
          jumpType: [
            { required: true, message: '跳转类型 1 普通目录 2 a标签 3 a标签_blank 4 直接加载url信息不能为空', trigger: 'blur' }
          ],
          jumpUrl: [
            { required: true, message: '跳转地址不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '菜单URL不能为空', trigger: 'blur' }
          ],
          siteId: [
            { required: true, message: '网站编号不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '创建者编号不能为空', trigger: 'blur' }
          ],
          updateUserId: [
            { required: true, message: '修改者编号不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型 1 栏目 2 文章 3 图片 4 视频 5 其它不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/cm/column/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.parentId = data.column.parentId
                this.dataForm.name = data.column.name
                this.dataForm.alias = data.column.alias
                this.dataForm.modelPath = data.column.modelPath
                this.dataForm.description = data.column.description
                this.dataForm.sort = data.column.sort
                this.dataForm.status = data.column.status
                this.dataForm.jumpType = data.column.jumpType
                this.dataForm.jumpUrl = data.column.jumpUrl
                this.dataForm.url = data.column.url
                this.dataForm.siteId = data.column.siteId
                this.dataForm.createTime = data.column.createTime
                this.dataForm.updateTime = data.column.updateTime
                this.dataForm.createUserId = data.column.createUserId
                this.dataForm.updateUserId = data.column.updateUserId
                this.dataForm.type = data.column.type
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/cm/column/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'parentId': this.dataForm.parentId,
                'name': this.dataForm.name,
                'alias': this.dataForm.alias,
                'modelPath': this.dataForm.modelPath,
                'description': this.dataForm.description,
                'sort': this.dataForm.sort,
                'status': this.dataForm.status,
                'jumpType': this.dataForm.jumpType,
                'jumpUrl': this.dataForm.jumpUrl,
                'url': this.dataForm.url,
                'siteId': this.dataForm.siteId,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'createUserId': this.dataForm.createUserId,
                'updateUserId': this.dataForm.updateUserId,
                'type': this.dataForm.type
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
