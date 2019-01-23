<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="栏目编号" prop="columnId">
      <el-input v-model="dataForm.columnId" placeholder="栏目编号"></el-input>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="内容"></el-input>
    </el-form-item>
    <el-form-item label="浏览次数" prop="browseNum">
      <el-input v-model="dataForm.browseNum" placeholder="浏览次数"></el-input>
    </el-form-item>
    <el-form-item label="评论次数" prop="commentNum">
      <el-input v-model="dataForm.commentNum" placeholder="评论次数"></el-input>
    </el-form-item>
    <el-form-item label="被赞次数" prop="praiseNum">
      <el-input v-model="dataForm.praiseNum" placeholder="被赞次数"></el-input>
    </el-form-item>
    <el-form-item label="状态  0：禁用   1：正常" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态  0：禁用   1：正常"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="跳转地址" prop="jumpUrl">
      <el-input v-model="dataForm.jumpUrl" placeholder="跳转地址"></el-input>
    </el-form-item>
    <el-form-item label="图片地址" prop="imageUrl">
      <el-input v-model="dataForm.imageUrl" placeholder="图片地址"></el-input>
    </el-form-item>
    <el-form-item label="文件地址" prop="fileUrl">
      <el-input v-model="dataForm.fileUrl" placeholder="文件地址"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="dataForm.description" placeholder="描述"></el-input>
    </el-form-item>
    <el-form-item label="发表时间" prop="publishtime">
      <el-input v-model="dataForm.publishtime" placeholder="发表时间"></el-input>
    </el-form-item>
    <el-form-item label="发表者" prop="publisher">
      <el-input v-model="dataForm.publisher" placeholder="发表者"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="创建者编号" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建者编号"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="修改者编号" prop="updateUserId">
      <el-input v-model="dataForm.updateUserId" placeholder="修改者编号"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          columnId: '',
          title: '',
          content: '',
          browseNum: '',
          commentNum: '',
          praiseNum: '',
          status: '',
          sort: '',
          jumpUrl: '',
          imageUrl: '',
          fileUrl: '',
          description: '',
          publishtime: '',
          publisher: '',
          createTime: '',
          createUserId: '',
          updateTime: '',
          updateUserId: ''
        },
        dataRule: {
          columnId: [
            { required: true, message: '栏目编号不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/cm/article/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.columnId = data.article.columnId
                this.dataForm.title = data.article.title
                this.dataForm.content = data.article.content
                this.dataForm.browseNum = data.article.browseNum
                this.dataForm.commentNum = data.article.commentNum
                this.dataForm.praiseNum = data.article.praiseNum
                this.dataForm.status = data.article.status
                this.dataForm.sort = data.article.sort
                this.dataForm.jumpUrl = data.article.jumpUrl
                this.dataForm.imageUrl = data.article.imageUrl
                this.dataForm.fileUrl = data.article.fileUrl
                this.dataForm.description = data.article.description
                this.dataForm.publishtime = data.article.publishtime
                this.dataForm.publisher = data.article.publisher
                this.dataForm.createTime = data.article.createTime
                this.dataForm.createUserId = data.article.createUserId
                this.dataForm.updateTime = data.article.updateTime
                this.dataForm.updateUserId = data.article.updateUserId
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
              url: this.$http.adornUrl(`/cm/article/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'columnId': this.dataForm.columnId,
                'title': this.dataForm.title,
                'content': this.dataForm.content,
                'browseNum': this.dataForm.browseNum,
                'commentNum': this.dataForm.commentNum,
                'praiseNum': this.dataForm.praiseNum,
                'status': this.dataForm.status,
                'sort': this.dataForm.sort,
                'jumpUrl': this.dataForm.jumpUrl,
                'imageUrl': this.dataForm.imageUrl,
                'fileUrl': this.dataForm.fileUrl,
                'description': this.dataForm.description,
                'publishtime': this.dataForm.publishtime,
                'publisher': this.dataForm.publisher,
                'createTime': this.dataForm.createTime,
                'createUserId': this.dataForm.createUserId,
                'updateTime': this.dataForm.updateTime,
                'updateUserId': this.dataForm.updateUserId
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
