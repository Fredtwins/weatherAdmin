<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="发表时间" prop="publishtime">
        <!-- <el-input v-model="dataForm.publishtime" placeholder="发表时间"></el-input> -->
        <el-date-picker
          v-model="dataForm.publishtime"
          type="date"
          placeholder="选择日期"
          width="20"
          @change="datetimechange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所属栏目">
      <!-- <el-form-item label="所属栏目" prop="parentName"> -->
        <!-- <el-input v-model="dataForm.columnId" placeholder="栏目编号"></el-input> -->
        <el-popover
          ref="menuListPopover"
          placement="bottom-start"
          trigger="click">
          <el-tree
            :data="menuList"
            :props="menuListTreeProps"
            node-key="id"
            ref="menuListTree"
            @current-change="menuListTreeCurrentChangeHandle"
            :highlight-current="true"
            :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input>
      </el-form-item>
      <el-form-item label="发表者" prop="publisher">
        <el-input v-model="dataForm.publisher" placeholder="发表者"></el-input>
      </el-form-item>
      <el-form-item label="跳转地址">
        <el-input v-model="dataForm.jumpUrl" placeholder="跳转地址"></el-input>
      </el-form-item>
      <el-form-item label="图片地址">
        <el-input v-model="dataForm.imageUrl" placeholder="图片地址"></el-input>
      </el-form-item>
      <el-form-item label="文件地址">
        <el-input v-model="dataForm.fileUrl" placeholder="文件地址"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="dataForm.description" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="浏览次数">
        <el-input v-model="dataForm.browseNum" placeholder="浏览次数"></el-input>
      </el-form-item>
      <el-form-item label="评论次数">
        <el-input v-model="dataForm.commentNum" placeholder="评论次数"></el-input>
      </el-form-item>
      <el-form-item label="被赞次数">
        <el-input v-model="dataForm.praiseNum" placeholder="被赞次数"></el-input>
      </el-form-item>

    </el-form>
    <el-form :model="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="内容">
        <div class="textarea">
          <!-- <quill-editor v-model="dataForm.content" :options="{placeholder: '请输入'}"></quill-editor> -->
          <UE v-model="dataForm.content" :defaultMsg=defaultMsg :config=config ref="ue"></UE>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import UE from './ue.vue'
  import { timeFilter, treeDataTranslate } from '@/utils'

  export default {
    components: {
      UE
    },
    data () {
      return {
        defaultMsg: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        visible: false,
        dataForm: {
          id: 0,
          columnId: '',
          title: '',
          content: '',
          browseNum: '',
          parentName: '',
          commentNum: '',
          praiseNum: '',
          status: 1,
          sort: '',
          jumpUrl: '',
          imageUrl: '',
          fileUrl: '',
          description: '',
          publishtime: '',
          publisher: ''
        },
        dataRule: {
          parentName: [
            { required: true, message: '栏目编号不能为空', trigger: 'change' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          browseNum: [
            { required: true, message: '浏览次数不能为空', trigger: 'blur' }
          ],
          commentNum: [
            { required: true, message: '评论次数不能为空', trigger: 'blur' }
          ],
          praiseNum: [
            { required: true, message: '被赞次数不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态  0：禁用   1：正常不能为空', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          jumpUrl: [
            { required: true, message: '跳转地址不能为空', trigger: 'blur' }
          ],
          imageUrl: [
            { required: true, message: '图片地址不能为空', trigger: 'blur' }
          ],
          fileUrl: [
            { required: true, message: '文件地址不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          publishtime: [
            { required: true, message: '发表时间不能为空', trigger: 'blur' }
          ],
          publisher: [
            { required: true, message: '发表者不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '创建者编号不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          updateUserId: [
            { required: true, message: '修改者编号不能为空', trigger: 'blur' }
          ]
        },
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        }
      }
    },
    methods: {
      // 富文本编辑器
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        // console.log(content)
      },
      // 选择时间
      datetimechange (year) {
        this.dataForm.publishtime = timeFilter(year, 'yyyy-MM-dd')
      },
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/cm/column/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          // console.log(data)
          this.menuList = treeDataTranslate(data.columnList, 'id')
        }).then(() => {
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
                url: this.$http.adornUrl(`/cm/article/info/${this.dataForm.id}`),
                method: 'get',
                params: this.$http.adornParams()
              }).then(({data}) => {
                console.log(data)
                if (data && data.code === 200) {
                  this.dataForm.columnId = data.article.columnId
                  this.dataForm.title = data.article.title
                  this.dataForm.content = data.article.content
                  this.dataForm.browseNum = data.article.browseNum
                  this.dataForm.commentNum = data.article.commentNum
                  this.dataForm.praiseNum = data.article.praiseNum
                  this.dataForm.status = data.article.status
                  this.dataForm.jumpUrl = data.article.jumpUrl
                  this.dataForm.imageUrl = data.article.imageUrl
                  this.dataForm.fileUrl = data.article.fileUrl
                  this.dataForm.description = data.article.description
                  this.dataForm.publishtime = data.article.publishtime
                  this.dataForm.publisher = data.article.publisher
                  this.menuListTreeSetCurrentNode()
                }
              })
            }
          }
        })
      },
      // 菜单树选中
      menuListTreeCurrentChangeHandle (data, node) {
        this.dataForm.columnId = data.parentId
        this.dataForm.parentName = data.name
      },
      // 菜单树设置当前选中节点
      menuListTreeSetCurrentNode () {
        this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId)
        console.log(this.$refs.menuListTree.getCurrentNode())
        console.log('------------')
        this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name']
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          // console.log(valid)
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/cm/article/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'columnId': this.dataForm.columnId,
                'parentName': this.dataForm.parentName,
                'title': this.dataForm.title,
                'content': this.dataForm.content,
                'browseNum': this.dataForm.browseNum,
                'commentNum': this.dataForm.commentNum,
                'praiseNum': this.dataForm.praiseNum,
                'status': this.dataForm.status,
                'jumpUrl': this.dataForm.jumpUrl,
                'imageUrl': this.dataForm.imageUrl,
                'fileUrl': this.dataForm.fileUrl,
                'description': this.dataForm.description,
                'publishtime': this.dataForm.publishtime,
                'publisher': this.dataForm.publisher
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

<style lang="scss" scoped>
.el-dialog {
  width: 78% !important;
}
.textarea {
  height: 100%;
  background: #fff;
  .quill-editor {
    height: 90%;
  }
}
</style>

