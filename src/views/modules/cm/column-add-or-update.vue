<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="上级栏目" prop="parentName">
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
        <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input>
      <!-- <el-input v-model="dataForm.parentId" placeholder="父栏目编号"></el-input> -->
      </el-form-item>
      <el-form-item label="栏目名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="栏目名称"></el-input>
      </el-form-item>
      <el-form-item label="模板路径" prop="modelPath">
        <el-input v-model="dataForm.modelPath" placeholder="模板路径"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
      </el-form-item>
      <el-form-item label="跳转类型" prop="jumpType">
        <el-radio-group v-model="dataForm.jumpType">
          <el-radio :label="1">普通目录</el-radio>
          <el-radio :label="2">a标签</el-radio>
          <el-radio :label="3">a标签_blank</el-radio>
          <el-radio :label="4">直接加载url信息</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio :label="1">栏目</el-radio>
          <el-radio :label="2">文章</el-radio>
          <el-radio :label="3">图片</el-radio>
          <el-radio :label="4">视频</el-radio>
          <el-radio :label="5">其它</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="跳转地址" prop="jumpUrl">
        <el-input v-model="dataForm.jumpUrl" placeholder="跳转地址"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" prop="url">
        <el-input v-model="dataForm.url" placeholder="菜单URL"></el-input>
      </el-form-item>
      <el-form-item label="所属网站" prop="siteId">
        <el-input v-model="dataForm.siteId" placeholder="网站编号"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="dataForm.description" placeholder="描述"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <!-- <el-input v-model="dataForm.status" placeholder="状态  0：禁用   1：正常"></el-input> -->
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
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
          parentName: '',
          name: '',
          alias: '',
          modelPath: '',
          description: '',
          sort: '',
          status: 1,
          jumpType: 1,
          jumpUrl: '',
          url: '',
          siteId: '',
          createTime: '',
          updateTime: '',
          createUserId: '',
          updateUserId: '',
          type: 1
        },
        menuListTreeProps: {
          label: 'name',
          children: 'children'
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
        this.$http({
          url: this.$http.adornUrl('/sys/menu/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.menuList = treeDataTranslate(data.menuList, 'menuId')
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (!this.dataForm.id) {
            // 新增
            this.menuListTreeSetCurrentNode()
          } else {
            if (this.dataForm.id) {
              this.$http({
                url: this.$http.adornUrl(`/cm/column/info/${this.dataForm.id}`),
                method: 'get',
                params: this.$http.adornParams()
              }).then(({data}) => {
                if (data && data.code === 200) {
                  this.dataForm.parentId = data.column.parentId
                  this.dataForm.name = data.column.name
                  this.dataForm.modelPath = data.column.modelPath
                  this.dataForm.description = data.column.description
                  this.dataForm.sort = data.column.sort
                  this.dataForm.status = data.column.status
                  this.dataForm.jumpType = data.column.jumpType
                  this.dataForm.jumpUrl = data.column.jumpUrl
                  this.dataForm.url = data.column.url
                  this.dataForm.siteId = data.column.siteId
                  this.dataForm.type = data.column.type
                  this.menuListTreeSetCurrentNode()
                }
              })
            }
          }
        })
      },
      // 菜单树选中
      menuListTreeCurrentChangeHandle (data, node) {
        this.dataForm.parentId = data.menuId
        this.dataForm.parentName = data.name
      },
      // 菜单树设置当前选中节点
      menuListTreeSetCurrentNode () {
        this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId)
        this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name']
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
                'modelPath': this.dataForm.modelPath,
                'description': this.dataForm.description,
                'sort': this.dataForm.sort,
                'status': this.dataForm.status,
                'jumpType': this.dataForm.jumpType,
                'jumpUrl': this.dataForm.jumpUrl,
                'url': this.dataForm.url,
                'siteId': this.dataForm.siteId,
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
